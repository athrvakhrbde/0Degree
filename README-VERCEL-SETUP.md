# Vercel Setup for Email Collection

## Setup Instructions

### 1. Create a GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "0Degree Email Collection"
4. Select the `repo` scope (to create issues)
5. Generate and copy the token

### 2. Deploy to Vercel
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. In the project settings, go to "Environment Variables"
5. Add the following variables:
   - `GITHUB_TOKEN` - Your GitHub personal access token
   - `GITHUB_OWNER` - Your GitHub username (optional, defaults to 'your-username')
   - `GITHUB_REPO` - Your repository name (optional, defaults to '0Degree')

### 3. How It Works
- When someone submits an email, it creates a GitHub Issue in your repo
- Each email gets its own issue with the label `email-signup`
- You can view all signups in the Issues tab of your GitHub repo

### 4. Optional: Create the Label
To organize issues better, create a label called `email-signup` in your GitHub repo:
1. Go to your repo on GitHub
2. Click "Issues" → "Labels"
3. Create a new label: `email-signup` (choose a color)

### 5. Local Development
For local testing, create a `.env.local` file with:
```
GITHUB_TOKEN=your_token_here
GITHUB_OWNER=your-username
GITHUB_REPO=0Degree
```

Then run:
```bash
vercel dev
```

## Alternative: Save to a File Instead of Issues
If you prefer to save emails to a file instead of creating issues, I can modify the function to append to a file in your repo. Let me know!
