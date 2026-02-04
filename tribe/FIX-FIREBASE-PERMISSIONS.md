# Fix Firebase Permissions & OAuth Domain

## Issue 1: Add OAuth Domain

### Step 1: Add Authorized Domain
1. Go to: https://console.firebase.google.com/project/tribe-0degree/authentication/settings/authorized-domains
2. Click **"Add domain"**
3. Enter: `tribe.0degreeinc.com`
4. Click **"Add"**
5. Also make sure these are listed:
   - `localhost` (for local development)
   - `tribe.0degreeinc.com` (your production domain)

## Issue 2: Configure Firestore Security Rules

### Step 1: Go to Firestore Rules
1. Go to: https://console.firebase.google.com/project/tribe-0degree/firestore/rules

### Step 2: Update Rules (Temporary - for testing)
Replace the rules with this (allows read/write for authenticated users):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to communities
    match /communities/{communityId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow public read access to posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow users to read/write their own user document
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to read/write their own tribeUser document
    match /tribeUser/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **"Publish"** button
2. Wait a few seconds for rules to deploy

## Step 3: Test Again

After making these changes:
1. Wait 1-2 minutes for changes to propagate
2. Hard refresh browser (Cmd+Shift+R)
3. Try logging in again

## Important Notes

⚠️ **Security Warning**: The rules above are permissive for testing. For production, you should:
- Restrict write access more carefully
- Add validation for data structure
- Implement proper authorization checks

But for now, these rules will let you test login and basic functionality.
