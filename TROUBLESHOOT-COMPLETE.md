# Complete Troubleshooting Guide for tribe.0degreeinc.com

## Current Status Check

### ✅ Step 1: Verify Project Structure
Run this in your terminal:
```bash
cd "/Users/athar/Documents/Vibe Code 2/0Degree"
ls -la tribe/
```

You should see:
- `package.json` ✅
- `next.config.js` ✅
- `src/` directory ✅
- `vercel.json` ✅

### ✅ Step 2: Check Vercel Projects

**Go to**: https://vercel.com/dashboard

**Check 1: Do you have TWO projects?**
- [ ] Project 1: Main site (0degree or similar name)
- [ ] Project 2: Tribe project (tribe or similar name)

**If you only see ONE project:**
→ You need to create the tribe project (see "Create Tribe Project" below)

**If you see TWO projects:**
→ Continue to Check 2

**Check 2: Main Project Domains**
1. Click on **Main Project**
2. Go to **Settings** → **Domains**
3. **List all domains you see:**
   - Should see: `0degreeinc.com`
   - Should see: `lp.0degreeinc.com`
   - **Should NOT see**: `tribe.0degreeinc.com` ❌

**If you see `tribe.0degreeinc.com` here:**
→ **THIS IS THE PROBLEM!** Remove it immediately:
   - Click the 3 dots next to `tribe.0degreeinc.com`
   - Click "Remove"
   - Confirm

**Check 3: Tribe Project Configuration**
1. Click on **Tribe Project**
2. Go to **Settings** → **General**
3. Check **Root Directory**:
   - ✅ Should say: `tribe`
   - ❌ If empty or `.` → Change to `tribe` → Save
4. Check **Framework**:
   - ✅ Should say: `Next.js`
5. Go to **Settings** → **Domains**
6. **Check if `tribe.0degreeinc.com` is listed:**
   - ✅ Should see: `tribe.0degreeinc.com`
   - ❌ If not → Add it

**Check 4: Latest Deployment**
1. In **Tribe Project** → **Deployments**
2. Check the **latest deployment**:
   - Status: Should be "Ready" ✅
   - If "Error" → Click to see error logs
   - If "Building" → Wait for it to finish
3. Click on the deployment → **View Build Logs**
   - Look for errors
   - Common errors:
     - Missing environment variables
     - Build failures
     - Node version issues

### ✅ Step 3: DNS Verification

Run this command:
```bash
dig tribe.0degreeinc.com +short
```

**Expected output:**
- Should show a CNAME pointing to Vercel (something like `cname.vercel-dns.com` or `*.vercel.app`)

**If it shows nothing or wrong IP:**
→ DNS is not configured correctly

**If DNS is wrong:**
1. Go to your DNS provider (wherever you manage `0degreeinc.com`)
2. Add/Update CNAME record:
   - Name: `tribe`
   - Value: `cname.vercel-dns.com`
   - TTL: 3600 (or default)

### ✅ Step 4: Browser Cache

**Clear cache and test:**
1. Open `tribe.0degreeinc.com` in **Incognito/Private window**
2. Or clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## Create Tribe Project (If Missing)

### Option A: Via Dashboard
1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select: `athrvakhrbde/0Degree`
4. **Before clicking Deploy:**
   - Click **"Edit"** next to Root Directory
   - Type: `tribe`
   - Click **Save**
5. Click **Deploy**
6. Wait for deployment
7. Go to **Settings** → **Domains**
8. Add: `tribe.0degreeinc.com`

### Option B: Via CLI
```bash
cd "/Users/athar/Documents/Vibe Code 2/0Degree/tribe"
vercel
# When asked:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? tribe
# - Directory? ./
# - Override settings? No
vercel --prod
```

---

## Common Issues & Solutions

### Issue 1: "Still seeing homepage"
**Cause**: Domain attached to wrong project
**Fix**: Remove from main project, add to tribe project

### Issue 2: "Build failing"
**Cause**: Missing dependencies or env vars
**Fix**: 
- Check build logs
- Verify `package.json` exists in `tribe/`
- Add environment variables

### Issue 3: "Blank page or error"
**Cause**: Firebase not configured
**Fix**: Add Firebase environment variables in tribe project settings

### Issue 4: "Domain not found"
**Cause**: DNS not configured
**Fix**: Add CNAME record: `tribe` → `cname.vercel-dns.com`

### Issue 5: "Root Directory wrong"
**Cause**: Root Directory not set to `tribe`
**Fix**: 
- Tribe project → Settings → General
- Change Root Directory to `tribe`
- Save and redeploy

---

## Diagnostic Checklist

Print this and check each item:

```
Vercel Dashboard:
[ ] Two separate projects exist (main + tribe)
[ ] Main project does NOT have tribe.0degreeinc.com domain
[ ] Tribe project HAS tribe.0degreeinc.com domain
[ ] Tribe project Root Directory = "tribe"
[ ] Tribe project Framework = "Next.js"
[ ] Latest tribe deployment status = "Ready"
[ ] No build errors in tribe deployment logs

DNS:
[ ] CNAME record exists: tribe → cname.vercel-dns.com
[ ] DNS propagated (check with dig command)

Browser:
[ ] Tested in incognito/private window
[ ] Cleared browser cache
[ ] Hard refreshed page

Code:
[ ] tribe/package.json exists
[ ] tribe/src/pages/index.tsx exists
[ ] tribe/vercel.json exists
```

---

## Still Not Working?

**Share these details:**
1. How many projects do you see in Vercel dashboard?
2. What domains are attached to each project?
3. What does the latest tribe deployment status show?
4. Any errors in the build logs?
5. What do you see when visiting `tribe.0degreeinc.com`?

This will help identify the exact issue!
