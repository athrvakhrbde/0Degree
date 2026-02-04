# Troubleshooting: Environment Variables Not Saving in Vercel

## Common Issues & Fixes

### Issue 1: Warning Popup Blocking Save
**Symptom:** Warning about "NEXT_PUBLIC_" appears, save button doesn't work

**Fix:**
1. **Ignore the warning** - It's safe for Firebase API keys
2. Click **outside the warning popup** to dismiss it
3. Then click **"Save"** button

### Issue 2: Form Validation Error
**Symptom:** Save button is grayed out or form won't submit

**Fix:**
1. Make sure **Key** field has a value (no spaces before/after)
2. Make sure **Value** field has a value
3. Check that you're not using quotes around the value (Vercel adds them automatically)
4. Try refreshing the page and adding again

### Issue 3: Browser Issues
**Symptom:** Page freezes or nothing happens on click

**Fix:**
1. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Try a **different browser** (Chrome, Firefox, Safari)
3. **Clear browser cache** and try again
4. **Disable browser extensions** temporarily (ad blockers, etc.)

### Issue 4: Network/Connection Issues
**Symptom:** Save button clicks but nothing happens

**Fix:**
1. Check your internet connection
2. Wait a few seconds - sometimes Vercel takes time to save
3. Check browser console (F12) for errors
4. Try again after a minute

### Issue 5: Wrong Project
**Symptom:** Variables save but don't appear in list

**Fix:**
1. Make sure you're in the **correct Vercel project** (Tribe project, not main site)
2. Check the project name in the top left
3. Verify you're in **Settings → Environment Variables**

## Step-by-Step Save Process

1. **Click "Add New"** button
2. **Paste Key**: `NEXT_PUBLIC_FIREBASE_API_KEY`
3. **Paste Value**: `AIzaSyBa01QsQixp1sRNZi1z55yAlT5Wwb699vs`
4. **Dismiss warning popup** (click outside it)
5. **Check "Production"** checkbox (and Preview/Development if needed)
6. **Click "Save"** button
7. **Wait 2-3 seconds** - should see variable appear in list
8. **Repeat** for other 5 variables

## Alternative: Import .env File

If manual entry isn't working:

1. Create a file named `.env.local` with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBa01QsQixp1sRNZi1z55yAlT5Wwb699vs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tribe-0degree.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tribe-0degree
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tribe-0degree.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=954272217995
NEXT_PUBLIC_FIREBASE_APP_ID=1:954272217995:web:8bd0c4e2319a3fa2b60d8e
```

2. In Vercel modal, click **"Import .env"** button
3. Paste the contents above
4. Click **"Save"**

## Still Not Working?

1. **Check Vercel Status**: https://vercel-status.com
2. **Try Incognito/Private Mode**
3. **Contact Vercel Support** if issue persists
