#!/bin/bash

echo "🔧 Fixing tribe.0degreeinc.com setup..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

cd "$(dirname "$0")/tribe"

echo "📋 Current directory: $(pwd)"
echo ""

# Check if we're in a Vercel project
if [ -f ".vercel/project.json" ]; then
    echo "✅ Vercel project already linked"
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
    echo "   Project ID: $PROJECT_ID"
else
    echo "⚠️  Not linked to Vercel project yet"
    echo ""
    echo "🔗 Linking to Vercel project..."
    echo "   When prompted:"
    echo "   - Set up and deploy? → Yes"
    echo "   - Which scope? → Select your account"
    echo "   - Link to existing project? → No (create new)"
    echo "   - Project name? → tribe"
    echo "   - Directory? → ./ (current directory)"
    echo ""
    read -p "Press Enter to continue with Vercel linking..."
    vercel link
fi

echo ""
echo "⚙️  Verifying configuration..."
echo ""

# Check vercel.json
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    cat vercel.json
else
    echo "❌ vercel.json missing"
fi

echo ""
echo "🚀 Deploying to production..."
echo "   This will deploy tribe.0degreeinc.com"
echo ""
read -p "Press Enter to deploy (or Ctrl+C to cancel)..."

vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps in Vercel Dashboard:"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Find your 'tribe' project"
echo "3. Settings → General → Verify Root Directory = 'tribe'"
echo "4. Settings → Domains → Add 'tribe.0degreeinc.com'"
echo "5. Remove 'tribe.0degreeinc.com' from MAIN project if it's there"
echo ""
echo "🌐 After domain is configured, visit: https://tribe.0degreeinc.com"
echo ""
