#!/bin/bash

echo "🔍 Diagnosing tribe.0degreeinc.com setup..."
echo ""

echo "✅ Code Structure Check:"
cd "$(dirname "$0")"

if [ -f "tribe/package.json" ]; then
    echo "  ✅ tribe/package.json exists"
else
    echo "  ❌ tribe/package.json MISSING"
fi

if [ -f "tribe/vercel.json" ]; then
    echo "  ✅ tribe/vercel.json exists"
else
    echo "  ❌ tribe/vercel.json MISSING"
fi

if [ -d "tribe/src/pages" ]; then
    echo "  ✅ tribe/src/pages exists"
else
    echo "  ❌ tribe/src/pages MISSING"
fi

echo ""
echo "🌐 DNS Check:"
DNS_RESULT=$(dig +short tribe.0degreeinc.com 2>/dev/null | head -1)
if [ -z "$DNS_RESULT" ]; then
    echo "  ⚠️  DNS not resolving (might be normal if DNS not set)"
else
    echo "  ✅ DNS resolves to: $DNS_RESULT"
fi

echo ""
echo "📋 Next Steps (MUST DO IN VERCEL DASHBOARD):"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Check if you have TWO projects:"
echo "   - Main project (0degree)"
echo "   - Tribe project (separate!)"
echo ""
echo "3. Main Project → Settings → Domains:"
echo "   - Should see: 0degreeinc.com"
echo "   - Should see: lp.0degreeinc.com"
echo "   - Should NOT see: tribe.0degreeinc.com"
echo "   - If you see tribe.0degreeinc.com → REMOVE IT!"
echo ""
echo "4. Tribe Project → Settings → Domains:"
echo "   - Should see: tribe.0degreeinc.com"
echo "   - If not → ADD IT"
echo ""
echo "5. Tribe Project → Settings → General:"
echo "   - Root Directory MUST be: 'tribe'"
echo "   - If empty or '.' → Change to 'tribe'"
echo ""
echo "6. Tribe Project → Deployments:"
echo "   - Check latest deployment status"
echo "   - If failed → Check build logs"
echo "   - If success → Click 'Redeploy'"
echo ""
echo "💡 Most Common Issue:"
echo "   Domain 'tribe.0degreeinc.com' is attached to MAIN project"
echo "   instead of TRIBE project. Remove it from main, add to tribe!"
echo ""
