// Vercel serverless function to fetch emails from GitHub Issues
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get GitHub token from environment variables
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const GITHUB_OWNER = process.env.GITHUB_OWNER || 'athrvakhrbde';
        const GITHUB_REPO = process.env.GITHUB_REPO || '0Degree';
        
        if (!GITHUB_TOKEN) {
            console.error('GITHUB_TOKEN not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Fetch all issues from the repository
        // Try with label first, then fallback to all issues
        let issuesResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?labels=email-signup&state=all&per_page=100`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': '0Degree-Email-Collector',
                },
            }
        );

        let issues = [];
        if (issuesResponse.ok) {
            issues = await issuesResponse.json();
        }

        // If label doesn't exist or no issues with label, fetch all issues
        if (!issuesResponse.ok || issues.length === 0) {
            const allIssuesResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=all&per_page=100`,
                {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': '0Degree-Email-Collector',
                    },
                }
            );
            if (allIssuesResponse.ok) {
                issues = await allIssuesResponse.json();
            }
        }

        if (issues.length === 0) {
            return res.status(200).json({ 
                success: true,
                count: 0,
                emails: []
            });
        }
        
        // Filter and parse email signup issues
        const emails = issues
            .filter(issue => {
                // Filter issues that are email signups (title starts with "New email signup:" or has email-signup label)
                return issue.title.includes('New email signup:') || 
                       issue.labels.some(label => label.name === 'email-signup');
            })
            .map(issue => {
                // Extract email from title or body
                const emailMatch = issue.title.match(/New email signup: (.+)/) || 
                                 issue.body.match(/Email: (.+)/);
                const email = emailMatch ? emailMatch[1].trim() : 'Unknown';
                
                // Extract timestamp from body
                const timestampMatch = issue.body.match(/Timestamp: (.+)/);
                const timestamp = timestampMatch ? timestampMatch[1] : issue.created_at;
                
                return {
                    email: email,
                    timestamp: timestamp,
                    createdAt: issue.created_at,
                    issueNumber: issue.number,
                    issueUrl: issue.html_url
                };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

        return res.status(200).json({ 
            success: true,
            count: emails.length,
            emails: emails
        });

    } catch (error) {
        console.error('Error fetching emails:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
