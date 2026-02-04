# Exact Steps to Fix tribe.0degreeinc.com

## Current Problem
`tribe.0degreeinc.com` shows homepage because domain is attached to **MAIN project** instead of **TRIBE project**.

## Solution: Move Domain Between Projects

### Step 1: Open Vercel Dashboard
Go to: https://vercel.com/dashboard

### Step 2: Check Your Projects
Look at the project list. You should see:
- One project (main site) - might be named "0degree" or similar
- Possibly a second project for "tribe"

**If you only see ONE project:**
→ You need to create the tribe project first (see "Create Tribe Project" below)

**If you see TWO projects:**
→ Continue to Step 3

### Step 3: Remove Domain from Main Project
1. Click on your **MAIN project** (the one that has `0degreeinc.com`)
2. Click **Settings** (gear icon in top right)
3. Click **Domains** in left sidebar
4. Look for `tribe.0degreeinc.com` in the domain list
5. **If you see it:**
   - Click the **3 dots (⋯)** next to `tribe.0degreeinc.com`
   - Click **Remove**
   - Confirm removal
6. **If you DON'T see it:**
   - It might already be removed, or attached to a different project
   - Continue to Step 4

### Step 4: Create Tribe Project (If It Doesn't Exist)
1. Click **Add New Project** (top right)
2. Click **Import Git Repository**
3. Select: `athrvakhrbde/0Degree`
4. **IMPORTANT**: Before clicking "Deploy":
   - Find **"Root Directory"** setting
   - Click **"Edit"** button next to it
   - Type: `tribe`
   - Click **Save**
5. Click **Deploy**
6. Wait for deployment to complete (2-3 minutes)

### Step 5: Add Domain to Tribe Project
1. After deployment, click **Settings** (gear icon)
2. Click **Domains** in left sidebar
3. Click **Add Domain** button
4. Type: `tribe.0degreeinc.com`
5. Click **Add**
6. Vercel will verify DNS (should be automatic)

### Step 6: Verify Root Directory
1. Still in **Tribe project** → **Settings**
2. Click **General** in left sidebar
3. Scroll down to **Root Directory**
4. **Must say**: `tribe`
5. **If it says `.` or is empty:**
   - Click **Edit**
   - Type: `tribe`
   - Click **Save**
   - Go to **Deployments** → Click **Redeploy**

### Step 7: Test
1. Wait 30-60 seconds
2. Open new incognito/private window
3. Visit: https://tribe.0degreeinc.com
4. Should now show Reddit Clone interface (not homepage)

## Visual Guide

```
Vercel Dashboard Structure:

┌─────────────────────────────────────┐
│  📁 Main Project                    │
│  ├── Domain: 0degreeinc.com ✅      │
│  ├── Domain: lp.0degreeinc.com ✅  │
│  └── Domain: tribe.0degreeinc.com  │
│      ❌ REMOVE THIS!                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📁 Tribe Project (separate!)       │
│  ├── Domain: tribe.0degreeinc.com  │
│  │   ✅ ADD HERE                    │
│  └── Root Directory: tribe ✅       │
└─────────────────────────────────────┘
```

## Why This Happens

- **Main project** = Static HTML files (homepage, lp.html, etc.)
- **Tribe project** = Next.js app (needs separate build process)
- Vercel requires **separate projects** for different app types
- The domain was accidentally attached to the wrong project

## Still Not Working?

1. **Clear browser cache completely**
2. **Wait 2-3 minutes** for DNS propagation
3. **Check deployment logs** in tribe project for errors
4. **Verify**: Main project should NOT have `tribe.0degreeinc.com` domain

The fix is literally **moving the domain from one project to another** in Vercel dashboard!
