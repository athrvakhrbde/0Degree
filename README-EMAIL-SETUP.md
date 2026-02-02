# Email Collection Setup for GitHub

## Current Setup
The form currently stores emails in localStorage and logs to console. To save emails to your GitHub repo, you have a few options:

## Option 1: GitHub Issues (Recommended for Simple Setup)
Create a GitHub Issue for each email submission. This requires:
- A GitHub Personal Access Token
- A backend service (serverless function) to call GitHub API

## Option 2: GitHub Gist
Save emails to a GitHub Gist that gets updated. Requires:
- GitHub Personal Access Token
- Backend service

## Option 3: Form Service + GitHub Integration
Use a service like:
- **Formspree** (free tier available)
- **Netlify Forms** (if hosting on Netlify)
- **GitHub Actions** with webhook

## Option 4: Simple Backend Service
Create a simple serverless function (Vercel, Netlify Functions, etc.) that:
1. Receives email from form
2. Uses GitHub API to create an issue or update a file
3. Returns success/error

## Quick Setup with Formspree (Easiest)
1. Sign up at https://formspree.io
2. Create a new form
3. Get your form endpoint
4. Update `join.html` form action to: `action="https://formspree.io/f/YOUR_FORM_ID"`

## Setup with GitHub API (More Control)
You'll need to:
1. Create a GitHub Personal Access Token with `repo` scope
2. Set up a serverless function to handle submissions
3. Use GitHub API to create issues or update files

Would you like me to set up one of these options?
