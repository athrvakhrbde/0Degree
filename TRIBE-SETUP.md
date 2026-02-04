# Setting up tribe.0degreeinc.com with Reddit Clone

The Reddit Clone has been cloned into the `tribe/` directory. Now you need to configure Vercel to deploy it as a separate project on the subdomain.

## Step 1: Create New Vercel Project for Tribe

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import the same repository (`athrvakhrbde/0Degree`)
4. **Important Configuration:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `tribe` (set this to point to the tribe subdirectory)
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
   - **Install Command**: `npm install` (or leave default)

## Step 2: Set Environment Variables

In the Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SET=your_firebase_messaging_set
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com
NEXT_PUBLIC_CRYPTO_SECRET_PASS=your_crypto_secret_pass
```

**To get Firebase credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings → General
4. Scroll down to "Your apps" and click the web icon
5. Copy the Firebase configuration values

## Step 3: Configure Domain

1. In Vercel project settings → **Domains**
2. Add domain: `tribe.0degreeinc.com`
3. Vercel will provide DNS instructions:
   - Add a **CNAME record** in your DNS:
     - Name: `tribe`
     - Value: `cname.vercel-dns.com`
   - Or use Vercel's nameservers if managing DNS through Vercel

## Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

## Step 5: Verify

Once deployed, visit `https://tribe.0degreeinc.com` to verify it's working.

---

## Project Structure

```
0Degree/
├── tribe/              # Reddit Clone Next.js app (separate Vercel project)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── api/                # Main site API functions
├── *.html              # Main site pages
└── vercel.json         # Main site config
```

## Notes

- The main site (`0degreeinc.com`) and tribe subdomain (`tribe.0degreeinc.com`) are separate Vercel projects
- Both projects use the same GitHub repository
- The `tribe/` directory is configured as a Next.js app
- The main site remains as static HTML files

## Troubleshooting

If the build fails:
1. Check that `Root Directory` is set to `tribe` in Vercel project settings
2. Verify all environment variables are set correctly
3. Check build logs in Vercel dashboard for specific errors
4. Ensure Firebase project is properly configured
