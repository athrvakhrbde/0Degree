# URGENT: Fix tribe.0degreeinc.com Showing Homepage

## The Problem
`tribe.0degreeinc.com` is pointing to your **main project** instead of a **separate tribe project**.

## Step-by-Step Fix (5 minutes)

### Step 1: Check Your Vercel Projects
1. Go to https://vercel.com/dashboard
2. Look at your project list
3. **Do you see a project called "tribe" or similar?**
   - ✅ **YES** → Go to Step 2
   - ❌ **NO** → Go to "Create Tribe Project" below

### Step 2: Verify Domain Assignment
1. Click on your **MAIN project** (the one with `0degreeinc.com`)
2. Go to **Settings** → **Domains**
3. **Look for `tribe.0degreeinc.com` in the list**
4. If you see it → **Click the 3 dots** → **Remove** → Confirm
5. This is why you're seeing the homepage!

### Step 3: Add Domain to Tribe Project
1. Go back to dashboard
2. Click on your **TRIBE project**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Type: `tribe.0degreeinc.com`
6. Click **Add**
7. Vercel will verify DNS (should be automatic if DNS is already set)

### Step 4: Verify Root Directory
1. Still in **Tribe project** → **Settings** → **General**
2. Scroll to **Root Directory**
3. **MUST say**: `tribe` (not `.` or empty)
4. If it's wrong → Change it → Save → Redeploy

### Step 5: Redeploy
1. Go to **Tribe project** → **Deployments**
2. Click **Redeploy** on latest deployment
3. Wait for build to complete
4. Visit `tribe.0degreeinc.com`

---

## Create Tribe Project (If It Doesn't Exist)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select: `athrvakhrbde/0Degree`
4. Click **Import**
5. **CRITICAL SETTINGS:**
   - **Project Name**: `tribe` (or any name)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: Click "Edit" → Type `tribe` → Save
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click **Deploy**
7. Wait for deployment
8. Go to **Settings** → **Domains**
9. Add: `tribe.0degreeinc.com`

---

## Quick Verification Checklist

After fixing, verify:

- [ ] Main project domains: `0degreeinc.com`, `lp.0degreeinc.com` (NO `tribe.0degreeinc.com`)
- [ ] Tribe project domain: `tribe.0degreeinc.com` (ONLY this one)
- [ ] Tribe project Root Directory: `tribe`
- [ ] Tribe project Framework: Next.js
- [ ] Latest deployment succeeded

---

## Still Not Working?

1. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check DNS**: Run `dig tribe.0degreeinc.com` - should show Vercel CNAME
3. **Wait 5 minutes** - DNS propagation can take time
4. **Check deployment logs** in Tribe project for errors

---

## Visual Guide

```
Vercel Dashboard Structure:

📁 Main Project (0Degree)
   ├── Domain: 0degreeinc.com ✅
   ├── Domain: lp.0degreeinc.com ✅
   └── Domain: tribe.0degreeinc.com ❌ REMOVE THIS!

📁 Tribe Project (separate!)
   └── Domain: tribe.0degreeinc.com ✅ ADD HERE
   └── Root Directory: tribe ✅
```

The domain MUST be removed from Main and added to Tribe!
