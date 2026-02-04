# Quick Deploy Guide for tribe.0degreeinc.com

## Option 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import repository: `athrvakhrbde/0Degree`
3. **Configure Project:**
   - **Project Name**: `tribe` (or any name)
   - **Root Directory**: `tribe` ⚠️ IMPORTANT
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
4. Click **Deploy**
5. After deployment, go to **Settings → Domains**
6. Add domain: `tribe.0degreeinc.com`
7. Add DNS CNAME: `tribe` → `cname.vercel-dns.com`

## Option 2: Vercel CLI

```bash
cd tribe
vercel
# Follow prompts, set root directory to "tribe"
vercel --prod
```

## Environment Variables Needed

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SET=your_messaging_set
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com
NEXT_PUBLIC_CRYPTO_SECRET_PASS=your_secret_pass
```

## Get Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Create/select project
3. Project Settings → General → Your apps → Web app
4. Copy config values

## That's it! 🎉

Once deployed, visit: https://tribe.0degreeinc.com
