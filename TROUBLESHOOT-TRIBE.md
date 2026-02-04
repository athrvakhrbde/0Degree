# Troubleshooting: tribe.0degreeinc.com Not Updating

## Quick Checklist

### ✅ Step 1: Verify Separate Vercel Project Exists
1. Go to https://vercel.com/dashboard
2. Check if you have a **separate project** for tribe (not the main 0Degree project)
3. If not, create one:
   - Click "Add New Project"
   - Import `athrvakhrbde/0Degree`
   - **Set Root Directory to: `tribe`** ⚠️ CRITICAL
   - Deploy

### ✅ Step 2: Check Root Directory Setting
1. Go to tribe project → Settings → General
2. Verify **Root Directory** is set to: `tribe`
3. If it's empty or set to `.`, change it to `tribe`
4. Save and redeploy

### ✅ Step 3: Verify Domain Configuration
1. Go to tribe project → Settings → Domains
2. Check if `tribe.0degreeinc.com` is listed
3. If not, add it
4. Verify DNS: `tribe` CNAME → `cname.vercel-dns.com`

### ✅ Step 4: Check Auto-Deploy Settings
1. Go to tribe project → Settings → Git
2. Verify it's connected to `athrvakhrbde/0Degree`
3. Check **Production Branch**: should be `main`
4. Ensure **Auto-deploy** is enabled

### ✅ Step 5: Trigger Manual Deployment
1. Go to tribe project → Deployments
2. Click "Redeploy" on latest deployment
3. Or push a new commit to trigger auto-deploy

### ✅ Step 6: Check Build Logs
1. Go to tribe project → Deployments
2. Click on latest deployment
3. Check build logs for errors
4. Common issues:
   - Missing environment variables
   - Build failures
   - Node version mismatch

## Common Issues

### Issue: "Still showing homepage"
**Solution**: You're viewing the wrong project. Make sure `tribe.0degreeinc.com` domain is attached to the **tribe project**, not the main project.

### Issue: "Build failing"
**Solution**: 
- Check environment variables are set
- Verify Node version (should be 18.x)
- Check build logs for specific errors

### Issue: "Changes not deploying"
**Solution**:
- Verify Root Directory is `tribe`
- Check Git connection is correct
- Ensure you're pushing to `main` branch
- Trigger manual redeploy

## Verify Setup

Your Vercel dashboard should show:
- **Project 1**: `0degree` (or similar) → `0degreeinc.com` (static HTML)
- **Project 2**: `tribe` (or similar) → `tribe.0degreeinc.com` (Next.js) ← **Root Directory: `tribe`**

## Still Not Working?

1. Check Vercel project settings match this:
   ```
   Root Directory: tribe
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

2. Verify the domain DNS:
   ```bash
   dig tribe.0degreeinc.com
   # Should show CNAME to vercel
   ```

3. Check deployment status in Vercel dashboard
