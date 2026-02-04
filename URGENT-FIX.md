# ⚠️ URGENT: tribe.0degreeinc.com Showing Homepage

## What I See
The domain `tribe.0degreeinc.com` is displaying your main homepage ("Don't dropout") instead of the Reddit Clone app.

## Immediate Fix (2 minutes)

### Step 1: Remove Domain from Main Project
1. Go to: https://vercel.com/dashboard
2. Click on your **MAIN project** (the one with `0degreeinc.com`)
3. Go to: **Settings** → **Domains**
4. Find `tribe.0degreeinc.com` in the list
5. Click the **3 dots** (⋯) next to it
6. Click **Remove**
7. Confirm removal

### Step 2: Add Domain to Tribe Project
1. Still in Vercel dashboard
2. Click on your **TRIBE project** (or create it if it doesn't exist)
3. Go to: **Settings** → **Domains**
4. Click **Add Domain**
5. Type: `tribe.0degreeinc.com`
6. Click **Add**

### Step 3: Verify Root Directory
1. In **Tribe project** → **Settings** → **General**
2. Scroll to **Root Directory**
3. **MUST say**: `tribe`
4. If it says `.` or is empty → Change to `tribe` → Save → Redeploy

### Step 4: Test
1. Wait 30 seconds
2. Visit: https://tribe.0degreeinc.com
3. Should now show Reddit Clone interface (not homepage)

## If Tribe Project Doesn't Exist

1. Go to: https://vercel.com/new
2. Import: `athrvakhrbde/0Degree`
3. **Before deploying**: Click **"Edit"** next to **Root Directory**
4. Type: `tribe`
5. Click **Save**
6. Click **Deploy**
7. After deployment → **Settings** → **Domains** → Add `tribe.0degreeinc.com`

## Quick Visual Check

After fixing, your Vercel dashboard should show:

```
📁 Main Project
   ├── Domain: 0degreeinc.com ✅
   ├── Domain: lp.0degreeinc.com ✅
   └── Domain: tribe.0degreeinc.com ❌ REMOVED

📁 Tribe Project (separate!)
   ├── Domain: tribe.0degreeinc.com ✅ ADDED HERE
   └── Root Directory: tribe ✅
```

## Why This Happens

- Your main project serves static HTML (homepage)
- Tribe needs a separate Next.js project
- The domain was attached to the wrong project

**The fix is literally moving the domain from one project to another!**
