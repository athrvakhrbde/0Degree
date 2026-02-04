# Environment Variables Check for tribe.0degreeinc.com

## Required Environment Variables

Make sure these are set in **Vercel Project Settings → Environment Variables**:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com
NEXT_PUBLIC_CRYPTO_SECRET_PASS=your_secret_pass
```

## How to Get Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Select your project (or create one)
3. Click the gear icon → Project Settings
4. Scroll to "Your apps" section
5. Click the web icon (</>) to add a web app
6. Copy the config values

## Verify Setup

After adding environment variables:
1. Go to Vercel project → Deployments
2. Click "Redeploy" on the latest deployment
3. Wait for build to complete
4. Check the deployment logs for any errors

## Common Issues

- **"Only seeing index data"**: Usually means Firebase isn't configured or database is empty
- **Blank page**: Check browser console for errors
- **Build fails**: Verify all env vars are set correctly

## Test Firebase Connection

Once deployed, the app should:
1. Show the Reddit Clone interface
2. Allow you to sign in with Google
3. Create communities and posts

If you only see the layout but no data, Firebase is likely not connected properly.
