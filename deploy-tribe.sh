#!/bin/bash

# Deploy Tribe (Reddit Clone) to Vercel
# This script helps set up the tribe.0degreeinc.com subdomain

echo "🚀 Setting up Tribe deployment on Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Installing dependencies..."
cd tribe
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Run: cd tribe && vercel"
echo "2. Follow the prompts:"
echo "   - Link to existing project or create new"
echo "   - Set Root Directory to: tribe"
echo "   - Framework: Next.js"
echo ""
echo "3. Add environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
echo "   - NEXT_PUBLIC_FIREBASE_MESSAGING_SET"
echo "   - NEXT_PUBLIC_FIREBASE_APP_ID"
echo "   - NEXT_PUBLIC_BASE_URL=https://tribe.0degreeinc.com"
echo "   - NEXT_PUBLIC_CRYPTO_SECRET_PASS"
echo ""
echo "4. Add domain tribe.0degreeinc.com in Vercel project settings"
echo ""
echo "5. Add DNS CNAME record: tribe -> cname.vercel-dns.com"
echo ""
