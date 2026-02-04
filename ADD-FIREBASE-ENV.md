# Add Firebase Environment Variables

## The Error
```
Firebase: Error (auth/invalid-api-key)
Firebase configuration is missing. Please set environment variables in Vercel.
```

## Quick Fix

### Step 1: Get Firebase Credentials
1. Go to: https://console.firebase.google.com/
2. Select your project (or create one)
3. Click the **gear icon** → **Project Settings**
4. Scroll to **"Your apps"** section
5. Click the **web icon** (`</>`) to add a web app
6. Copy the config values (or if app exists, click on it)

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 2: Add to Vercel
1. Go to your **Tribe project** in Vercel dashboard
2. **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add each variable:

| Variable Name | Value (from Firebase) |
|--------------|----------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `apiKey` value |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `authDomain` value |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `projectId` value |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `storageBucket` value |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` value |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `appId` value |
| `NEXT_PUBLIC_BASE_URL` | `https://tribe.0degreeinc.com` |
| `NEXT_PUBLIC_CRYPTO_SECRET_PASS` | Any random string (e.g., `your-secret-key-123`) |

**Important:**
- Make sure to select **"Production"** environment for each variable
- Click **"Save"** after adding each one

### Step 3: Redeploy
After adding all environment variables:
1. Go to **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Wait for build to complete
4. Should now build successfully!

## Quick Copy-Paste Format

When adding in Vercel, use these exact names:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_CRYPTO_SECRET_PASS
```

## If You Don't Have Firebase Project Yet

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter project name
4. Continue through setup
5. Once created, go to **Project Settings** → **General**
6. Scroll to **"Your apps"** → Click web icon
7. Register app → Copy config

## After Adding Variables

The build should succeed and `tribe.0degreeinc.com` will work!
