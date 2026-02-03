// Vercel serverless function to save emails to GitHub
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
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

        // Option 1: Create a GitHub Issue for each email
        const issueTitle = `New email signup: ${email}`;
        const issueBody = `Email: ${email}\nTimestamp: ${new Date().toISOString()}`;

        const issueResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': '0Degree-Email-Collector',
                },
                body: JSON.stringify({
                    title: issueTitle,
                    body: issueBody,
                    labels: ['email-signup'],
                }),
            }
        );

        if (!issueResponse.ok) {
            const errorText = await issueResponse.text();
            console.error('GitHub API error:', errorText);
            // Try without label if label doesn't exist
            if (issueResponse.status === 422) {
                const retryResponse = await fetch(
                    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${GITHUB_TOKEN}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json',
                            'User-Agent': '0Degree-Email-Collector',
                        },
                        body: JSON.stringify({
                            title: issueTitle,
                            body: issueBody,
                        }),
                    }
                );
                if (retryResponse.ok) {
                    const retryData = await retryResponse.json();
                    return res.status(200).json({ 
                        success: true, 
                        message: 'Email saved successfully',
                        issueNumber: retryData.number 
                    });
                }
            }
            return res.status(500).json({ error: 'Failed to save email' });
        }

        const issueData = await issueResponse.json();
        
        return res.status(200).json({ 
            success: true, 
            message: 'Email saved successfully',
            issueNumber: issueData.number 
        });

    } catch (error) {
        console.error('Error saving email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
