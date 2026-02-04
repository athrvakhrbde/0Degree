# Next Steps: Setting Up Tribe Project

## What I See
You're on the Vercel "New Project" page, ready to import the repository.

## Step-by-Step Instructions

### Step 1: Import Repository
1. In the "Import Git Repository" section
2. Find **"0Degree"** in the list (shows "45s ago")
3. Click the **"Import"** button next to it

### Step 2: Configure Project (CRITICAL!)
**BEFORE clicking "Deploy":**

1. Look for **"Configure Project"** section
2. Find **"Root Directory"** setting
3. Click **"Edit"** or the pencil icon next to it
4. **Change from `.` to `tribe`**
5. Click **Save**

**This is the MOST IMPORTANT step!** Without this, it won't work.

### Step 3: Verify Settings
Before deploying, check:
- ✅ **Framework**: Should auto-detect as "Next.js"
- ✅ **Root Directory**: `tribe` (not `.`)
- ✅ **Build Command**: `npm run build` (default)
- ✅ **Output Directory**: `.next` (default)

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait for deployment to complete (2-3 minutes)
3. Watch the build logs for any errors

### Step 5: Add Domain
After deployment completes:
1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Type: `tribe.0degreeinc.com`
4. Click **"Add"**
5. Vercel will verify DNS (should work since CNAME is already set)

### Step 6: Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add these (get from Firebase Console):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com`
   - `NEXT_PUBLIC_CRYPTO_SECRET_PASS` (any random string)

3. After adding, trigger a **Redeploy**

### Step 7: Remove Domain from Main Project
1. Go back to your **main project** (Odegree)
2. **Settings** → **Domains**
3. If `tribe.0degreeinc.com` is still there → **Remove it**

### Step 8: Test
1. Wait 1-2 minutes
2. Visit: https://tribe.0degreeinc.com
3. Should see Reddit Clone interface!

## ⚠️ Critical Reminder

**Root Directory MUST be `tribe`** - this is what tells Vercel to build from the `tribe/` directory instead of the root.

## If You Already Clicked Deploy

If you already deployed without setting Root Directory:
1. Go to project → **Settings** → **General**
2. Find **Root Directory**
3. Change to `tribe`
4. **Save**
5. Go to **Deployments** → **Redeploy** latest

## Quick Checklist

- [ ] Imported 0Degree repository
- [ ] Set Root Directory = `tribe` (BEFORE deploying)
- [ ] Deployed successfully
- [ ] Added domain `tribe.0degreeinc.com`
- [ ] Added environment variables
- [ ] Removed domain from main project
- [ ] Tested in browser

Good luck! 🚀
