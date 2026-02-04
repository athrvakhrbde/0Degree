# Verify Environment Variables Are Set Correctly

## The Issue
Build is still failing with Firebase error, which means environment variables aren't being picked up.

## Critical Check: Environment Selection

When adding environment variables in Vercel, you **MUST** select the correct environment:

1. Go to **Tribe Project** → **Settings** → **Environment Variables**
2. For **EACH variable**, check:
   - ✅ **Production** is checked
   - ✅ **Preview** is checked (optional but recommended)
   - ✅ **Development** is checked (optional)

**If "Production" is NOT checked, the variables won't be available during build!**

## Verify Variables Are Added

Check that these 8 variables exist:

1. `NEXT_PUBLIC_FIREBASE_API_KEY` = `AIzaSyBa01QsQixp1sRNZi1z55yAlT5Wwb699vs`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = `tribe-0degree.firebaseapp.com`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = `tribe-0degree`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = `tribe-0degree.firebasestorage.app`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = `954272217995`
6. `NEXT_PUBLIC_FIREBASE_APP_ID` = `1:954272217995:web:8bd0c4e2319a3fa2b60d8e`
7. `NEXT_PUBLIC_BASE_URL` = `https://tribe.0degreeinc.com`
8. `NEXT_PUBLIC_CRYPTO_SECRET_PASS` = (any value)

## If Variables Are Missing

1. Click **"Add New"**
2. Enter variable name and value
3. **CRITICAL**: Check ✅ **Production** checkbox
4. Click **"Save"**
5. Repeat for all 8 variables

## After Adding/Verifying

1. **Redeploy**: Go to **Deployments** → **Redeploy** latest
2. The build should now succeed

## Common Mistakes

- ❌ Variables added but "Production" not checked
- ❌ Variables added to wrong project
- ❌ Typos in variable names (must be exact)
- ❌ Missing `NEXT_PUBLIC_` prefix (required for client-side vars)

## Quick Test

After redeploy, check build logs. Should see:
- ✅ "Compiled successfully"
- ✅ "Collecting page data" completes
- ✅ Build succeeds

If still failing, double-check that **Production** environment is selected for ALL variables!
