# Fix Firebase API Key Error

## The Error
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

This means Firebase environment variables are missing or incorrect in Vercel.

## Quick Fix Steps

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Find your **Tribe** project
3. Click **Settings** → **Environment Variables**

### Step 2: Add/Verify These Variables

**CRITICAL**: Make sure **"Production"** is checked for each variable!

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBa01QsQixp1sRNZi1z55yAlT5Wwb699vs` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `tribe-0degree.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `tribe-0degree` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `tribe-0degree.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `954272217995` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:954272217995:web:8bd0c4e2319a3fa2b60d8e` |

### Step 3: For Each Variable
1. Click **"Add New"** (or edit if exists)
2. Paste the **Variable Name** exactly as shown
3. Paste the **Value** exactly as shown
4. ✅ **CHECK "Production"** checkbox (this is critical!)
5. Click **"Save"**

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for build to complete

## Common Mistakes

❌ **Variable added but "Production" not checked** → Variables won't be available  
❌ **Typo in variable name** → Must be exact: `NEXT_PUBLIC_FIREBASE_API_KEY`  
❌ **Missing `NEXT_PUBLIC_` prefix** → Required for client-side variables  
❌ **Wrong project** → Make sure you're editing the Tribe project, not main site  

## Verify It Worked

After redeploy:
1. Try logging in again
2. Check browser console (F12) - should NOT see Firebase errors
3. Login should work!

## If Still Not Working

1. Double-check all 6 variables are added
2. Verify "Production" is checked for ALL variables
3. Check Vercel build logs for any errors
4. Make sure you're using the correct Firebase project credentials
