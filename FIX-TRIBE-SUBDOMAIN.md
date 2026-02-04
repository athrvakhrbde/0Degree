# Fix: tribe.0degreeinc.com showing homepage

## The Problem
Next.js apps cannot be served via rewrites in the same Vercel project. They need to be separate projects.

## The Solution

You need to create a **separate Vercel project** for the tribe subdomain:

### Step 1: Create New Vercel Project
1. Go to https://vercel.com/new
2. Import repository: `athrvakhrbde/0Degree`
3. **CRITICAL**: Set **Root Directory** to `tribe`
4. Framework: Next.js (auto-detected)
5. Click **Deploy**

### Step 2: Remove Domain from Main Project
1. Go to your main project settings (the one showing homepage)
2. Go to **Domains**
3. **Remove** `tribe.0degreeinc.com` if it's there

### Step 3: Add Domain to Tribe Project
1. In the **new tribe project** settings
2. Go to **Domains**
3. Add domain: `tribe.0degreeinc.com`
4. Verify DNS is pointing correctly

### Step 4: Add Environment Variables
In the tribe project → Settings → Environment Variables, add:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SET`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com`
- `NEXT_PUBLIC_CRYPTO_SECRET_PASS`

### Step 5: Redeploy
After adding environment variables, trigger a new deployment.

## Why This Happens
- Main project serves static HTML files
- Tribe is a Next.js app that needs to be built separately
- Vercel requires separate projects for different frameworks/apps
- Each project can have its own root directory

## Quick Check
After setup, you should have:
- **Main project**: `0degreeinc.com` (static HTML)
- **LP project**: `lp.0degreeinc.com` (static HTML)  
- **Tribe project**: `tribe.0degreeinc.com` (Next.js app) ← **Separate project**
