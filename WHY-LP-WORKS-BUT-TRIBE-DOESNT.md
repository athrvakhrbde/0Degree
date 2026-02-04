# Why lp.0degreeinc.com Works But tribe.0degreeinc.com Doesn't

## The Difference

### ✅ lp.0degreeinc.com (Works)
- **Type**: Static HTML file (`lp.html`)
- **Configuration**: Rewrite rule in main `vercel.json`
- **Project**: Same project as main site
- **How it works**: Vercel rewrites `lp.0degreeinc.com` → `/lp.html`

```json
{
  "source": "/(.*)",
  "destination": "/lp.html",
  "has": [{ "type": "host", "value": "lp.0degreeinc.com" }]
}
```

### ❌ tribe.0degreeinc.com (Doesn't Work)
- **Type**: Next.js application (needs build process)
- **Configuration**: Cannot use rewrites - needs separate project
- **Project**: Must be a **separate Vercel project**
- **Why**: Next.js apps need to be built, have their own dependencies, and run server-side code

## The Solution

`tribe.0degreeinc.com` **MUST** be a separate Vercel project because:

1. **Next.js requires a build process** - Can't be served as static files
2. **Has its own dependencies** - `package.json` in `tribe/` directory
3. **Needs environment variables** - Firebase config, etc.
4. **Server-side rendering** - Can't be proxied via rewrites

## Quick Fix

### Check Your Vercel Dashboard

You should see **TWO separate projects**:

1. **Main Project** (0Degree)
   - Domains: `0degreeinc.com`, `lp.0degreeinc.com`
   - Root Directory: `.` (root)
   - Framework: Other (static)

2. **Tribe Project** (separate!)
   - Domain: `tribe.0degreeinc.com`
   - Root Directory: `tribe` ⚠️ **MUST BE SET**
   - Framework: Next.js

### If Tribe Project Doesn't Exist:

1. Go to https://vercel.com/new
2. Import: `athrvakhrbde/0Degree`
3. **Set Root Directory**: `tribe`
4. Add domain: `tribe.0degreeinc.com`
5. Deploy

### If Tribe Project Exists But Domain Points Wrong:

1. Go to **Main Project** → Settings → Domains
2. **Remove** `tribe.0degreeinc.com` if it's there
3. Go to **Tribe Project** → Settings → Domains  
4. **Add** `tribe.0degreeinc.com`

## Why This Architecture?

```
Main Project (Static HTML)
├── 0degreeinc.com → index.html
├── lp.0degreeinc.com → lp.html (rewrite)
└── /join → join.html

Tribe Project (Next.js) - SEPARATE!
└── tribe.0degreeinc.com → Next.js app (built from tribe/)
```

## Summary

- **lp.** = Static file, works with rewrite ✅
- **tribe.** = Next.js app, needs separate project ❌ → ✅

The domain `tribe.0degreeinc.com` is probably still attached to your main project. Move it to a separate tribe project!
