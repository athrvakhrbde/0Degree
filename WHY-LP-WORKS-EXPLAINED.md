# Why lp.0degreeinc.com Works But tribe.0degreeinc.com Doesn't

## The Fundamental Difference

### ✅ lp.0degreeinc.com (Works)

**What it is:**
- A **static HTML file** (`lp.html`)
- Just text, CSS, and JavaScript
- No build process needed
- No dependencies

**How it works:**
```json
// In vercel.json (main project)
{
  "source": "/(.*)",
  "destination": "/lp.html",
  "has": [{ "type": "host", "value": "lp.0degreeinc.com" }]
}
```

**What happens:**
1. Request comes to `lp.0degreeinc.com`
2. Vercel checks `vercel.json` rewrite rules
3. Finds match for `lp.0degreeinc.com` host
4. Serves `/lp.html` file directly
5. ✅ Done! No build needed.

**Why it works:**
- Same project (main project)
- Static file can be served via rewrite
- No compilation or build process
- Instant response

---

### ❌ tribe.0degreeinc.com (Doesn't Work)

**What it is:**
- A **Next.js application** (React framework)
- Needs to be **built** (`npm run build`)
- Has **dependencies** (`package.json`, `node_modules`)
- Requires **Node.js runtime**
- Has **server-side rendering**

**Why rewrites don't work:**
```json
// This WON'T work for Next.js:
{
  "source": "/(.*)",
  "destination": "/tribe/$1",  // ❌ Can't serve Next.js this way
  "has": [{ "type": "host", "value": "tribe.0degreeinc.com" }]
}
```

**What needs to happen:**
1. Request comes to `tribe.0degreeinc.com`
2. Vercel needs to:
   - Install dependencies (`npm install`)
   - Build the app (`npm run build`)
   - Run the Next.js server
   - Handle routing, SSR, API routes
3. ❌ Can't do this via simple rewrite!

**Why it needs separate project:**
- **Build process**: Must run `npm run build` in `tribe/` directory
- **Dependencies**: Must install from `tribe/package.json`
- **Framework detection**: Vercel needs to know it's Next.js
- **Root Directory**: Must be set to `tribe` so Vercel knows where to build

---

## Visual Comparison

```
lp.0degreeinc.com (Static File)
├── Request → vercel.json rewrite → /lp.html → ✅ Serve file
└── Same project, instant response

tribe.0degreeinc.com (Next.js App)
├── Request → Need to:
│   ├── Install dependencies (npm install)
│   ├── Build app (npm run build)
│   ├── Run Next.js server
│   └── Handle routing/SSR
└── Requires separate project with Root Directory = "tribe"
```

## The Solution

**lp.0degreeinc.com:**
- ✅ Works in same project (static file)
- ✅ Uses rewrite rule in `vercel.json`

**tribe.0degreeinc.com:**
- ❌ Cannot work in same project
- ✅ Needs **separate Vercel project**
- ✅ Root Directory must be `tribe`
- ✅ Framework must be detected as Next.js

## Why You're Seeing Homepage

If `tribe.0degreeinc.com` shows homepage, it means:
1. Domain is attached to **main project** (serves static HTML)
2. OR tribe project exists but **Root Directory** is wrong (not set to `tribe`)

## The Fix

**For tribe.0degreeinc.com to work:**
1. Create **separate Vercel project**
2. Set **Root Directory** = `tribe`
3. Attach domain to **that project** (not main project)
4. Vercel will:
   - Detect Next.js framework
   - Install dependencies
   - Build the app
   - Serve it properly

## Summary

| Feature | lp.0degreeinc.com | tribe.0degreeinc.com |
|---------|-------------------|----------------------|
| Type | Static HTML | Next.js App |
| Build needed? | No | Yes |
| Dependencies? | No | Yes |
| Same project? | Yes ✅ | No ❌ |
| Root Directory | N/A | Must be `tribe` |
| How it works | Rewrite rule | Separate project |

**Bottom line:** Static files can share a project, apps need their own!
