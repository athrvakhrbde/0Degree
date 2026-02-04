# Verify tribe.0degreeinc.com Setup

## ✅ What You've Done
- Deleted domain from main project
- Re-added domain to tribe project
- Added CNAME to Namecheap

## 🔍 Verification Checklist

### 1. Check Vercel Project Configuration
In your **Tribe project** → Settings → General:
- [ ] **Root Directory** = `tribe` (not `.` or empty)
- [ ] **Framework** = Next.js
- [ ] **Node Version** = 18.x (or compatible)

### 2. Check Domain Assignment
In your **Tribe project** → Settings → Domains:
- [ ] `tribe.0degreeinc.com` is listed
- [ ] Status shows "Valid Configuration"
- [ ] Points to "Production"

### 3. Check Main Project
In your **Main project** → Settings → Domains:
- [ ] `tribe.0degreeinc.com` is **NOT** listed
- [ ] Only has: `0degreeinc.com`, `lp.0degreeinc.com`

### 4. Check DNS (Namecheap)
CNAME record should be:
- **Host**: `tribe`
- **Value**: `cname.vercel-dns.com` (or what Vercel provided)
- **TTL**: 3600 (or Auto)

### 5. Check Latest Deployment
In **Tribe project** → Deployments:
- [ ] Latest deployment status = "Ready" ✅
- [ ] No build errors
- [ ] Build completed successfully

## ⏱️ DNS Propagation
After adding CNAME to Namecheap:
- **Wait 5-15 minutes** for DNS to propagate
- Can take up to 24 hours (usually much faster)
- Check with: `dig tribe.0degreeinc.com`

## 🧪 Test Steps
1. **Wait 5 minutes** after adding CNAME
2. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Open incognito/private window**
4. Visit: https://tribe.0degreeinc.com
5. Should see Reddit Clone interface (not homepage)

## 🐛 If Still Showing Homepage

### Issue 1: DNS Not Propagated
- Wait longer (up to 15 minutes)
- Check DNS: `dig tribe.0degreeinc.com`
- Should show Vercel CNAME

### Issue 2: Domain Still on Wrong Project
- Double-check: Main project should NOT have `tribe.0degreeinc.com`
- Tribe project SHOULD have `tribe.0degreeinc.com`

### Issue 3: Root Directory Wrong
- Tribe project → Settings → General
- Root Directory MUST be `tribe`
- If wrong → Change → Save → Redeploy

### Issue 4: Build Failed
- Check deployment logs in tribe project
- Look for errors
- Common: Missing environment variables

## 🎯 Expected Result
After setup, `tribe.0degreeinc.com` should show:
- Reddit Clone interface
- Navigation bar with search
- Community sidebar
- Post feed (empty if no data)

**NOT** the homepage with "Don't dropout" text.

## Quick Test
Run this command to check DNS:
```bash
dig tribe.0degreeinc.com +short
```

Should show Vercel CNAME or IP.
