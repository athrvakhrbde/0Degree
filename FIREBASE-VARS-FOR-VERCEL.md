# Firebase Environment Variables for Vercel

## Add These to Your Tribe Project

Go to: **Tribe Project** → **Settings** → **Environment Variables** → **Add New**

### Copy-Paste These Exactly:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBa01QsQixp1sRNZi1z55yAlT5Wwb699vs` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `tribe-0degree.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `tribe-0degree` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `tribe-0degree.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `954272217995` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:954272217995:web:8bd0c4e2319a3fa2b60d8e` |
| `NEXT_PUBLIC_BASE_URL` | `https://tribe.0degreeinc.com` |
| `NEXT_PUBLIC_CRYPTO_SECRET_PASS` | `tribe-secret-key-2024` (or any random string) |

## Steps:

1. **Tribe Project** → **Settings** → **Environment Variables**
2. Click **"Add New"** for each variable above
3. **Important**: Select **"Production"** environment for each
4. Click **"Save"** after each one
5. After adding all 8 variables → **Deployments** → **Redeploy**

## After Adding:

The build should succeed and `tribe.0degreeinc.com` will work! 🎉
