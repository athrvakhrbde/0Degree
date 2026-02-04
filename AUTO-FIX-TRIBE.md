# Auto-Fix Script for tribe.0degreeinc.com

## Quick Fix (Run This Script)

```bash
cd "/Users/athar/Documents/Vibe Code 2/0Degree"
chmod +x fix-tribe.sh
./fix-tribe.sh
```

This script will:
1. Check/install Vercel CLI
2. Link the tribe directory to a Vercel project
3. Deploy it to production
4. Guide you through domain setup

## Manual Fix (If Script Doesn't Work)

### Option 1: Via Vercel Dashboard (Easiest)

1. **Go to**: https://vercel.com/new
2. **Import**: `athrvakhrbde/0Degree`
3. **Before clicking Deploy:**
   - Click **"Edit"** next to **Root Directory**
   - Type: `tribe`
   - Click **Save**
4. **Click Deploy**
5. **After deployment:**
   - Go to **Settings** → **Domains**
   - Add: `tribe.0degreeinc.com`
6. **Remove from Main Project:**
   - Go to your **main project** → **Settings** → **Domains**
   - If you see `tribe.0degreeinc.com` → **Remove it**

### Option 2: Via Vercel CLI

```bash
cd "/Users/athar/Documents/Vibe Code 2/0Degree/tribe"
vercel
# Follow prompts:
# - Set up and deploy? → Yes
# - Link to existing? → No
# - Project name? → tribe
# - Directory? → ./
vercel --prod
```

Then in dashboard:
- Settings → Domains → Add `tribe.0degreeinc.com`
- Settings → General → Verify Root Directory = `tribe`

## Critical Check

After setup, verify in Vercel Dashboard:

**Main Project:**
- ✅ Has: `0degreeinc.com`
- ✅ Has: `lp.0degreeinc.com`
- ❌ Does NOT have: `tribe.0degreeinc.com`

**Tribe Project:**
- ✅ Has: `tribe.0degreeinc.com`
- ✅ Root Directory: `tribe`
- ✅ Framework: Next.js

## If Still Not Working

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Check DNS**: `dig tribe.0degreeinc.com` should show Vercel
3. **Wait 2-3 minutes** for DNS propagation
4. **Check deployment logs** in tribe project for errors
