# Setting up tribe.0degreeinc.com with Reddit Clone

## Option 1: Deploy as Separate Vercel Project (Recommended)

### Step 1: Fork/Clone the Reddit Clone Repository
```bash
git clone https://github.com/SashenJayathilaka/Reddit-Clone.git
cd Reddit-Clone
```

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import the Reddit Clone repository (or connect your fork)
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (or leave default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Set Environment Variables
In Vercel project settings → Environment Variables, add:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SET=your_firebase_messaging_set
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com
NEXT_PUBLIC_CRYPTO_SECRET_PASS=your_crypto_secret_pass
```

### Step 4: Configure Domain
1. In Vercel project settings → Domains
2. Add domain: `tribe.0degreeinc.com`
3. Vercel will provide DNS records to add:
   - Add a CNAME record: `tribe` → `cname.vercel-dns.com`
   - Or use Vercel's nameservers if managing DNS through Vercel

### Step 5: Deploy
Click "Deploy" and wait for the build to complete.

---

## Option 2: Add to Current Repository (Monorepo)

If you want to keep everything in one repository, we can set up a monorepo structure:

```
0Degree/
├── tribe/          # Reddit Clone Next.js app
│   ├── pages/
│   ├── src/
│   └── package.json
├── api/            # Current API functions
├── *.html          # Current HTML files
└── vercel.json     # Updated config
```

Would you like me to set up Option 2, or do you prefer Option 1 (separate project)?

---

## Quick Setup Commands

If you want to clone and set up locally first:

```bash
# Clone the Reddit Clone
git clone https://github.com/SashenJayathilaka/Reddit-Clone.git tribe
cd tribe

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run locally
npm run dev
```

Then deploy to Vercel and configure the domain.
