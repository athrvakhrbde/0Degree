# Deploy Firestore Security Rules

## Quick Fix: Update Rules in Firebase Console

### Option 1: Via Firebase Console (Recommended)

1. **Go to Firestore Rules:**
   - https://console.firebase.google.com/project/tribe-0degree/firestore/rules

2. **Copy and paste these rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if true; // Public read for user profiles
      allow write: if isOwner(userId);
      
      // User subcollections
      match /{subcollection=**} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // TribeUser collection - users can read/write their own data
    match /tribeUser/{userId} {
      allow read: if true; // Public read for user profiles
      allow write: if isOwner(userId);
    }
    
    // Communities collection - public read, authenticated write
    match /communities/{communityId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated();
      
      // Community subcollections
      match /{subcollection=**} {
        allow read: if true;
        allow write: if isAuthenticated();
      }
    }
    
    // Posts collection - public read, authenticated write
    match /posts/{postId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated() && 
                       request.resource.data.creatorId == request.auth.uid;
      allow update: if isAuthenticated() && 
                       (resource.data.creatorId == request.auth.uid ||
                        request.resource.data.creatorId == request.auth.uid);
      allow delete: if isAuthenticated() && 
                       resource.data.creatorId == request.auth.uid;
    }
    
    // Comments collection - public read, authenticated write
    match /comments/{commentId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated() && 
                       request.resource.data.creatorId == request.auth.uid;
      allow update: if isAuthenticated() && 
                       (resource.data.creatorId == request.auth.uid ||
                        request.resource.data.creatorId == request.auth.uid);
      allow delete: if isAuthenticated() && 
                       resource.data.creatorId == request.auth.uid;
    }
    
    // User post votes - users can only read/write their own votes
    match /users/{userId}/postVotes/{voteId} {
      allow read, write: if isOwner(userId);
    }
    
    // User community snippets - users can only read/write their own snippets
    match /users/{userId}/communitySnippets/{snippetId} {
      allow read, write: if isOwner(userId);
    }
    
    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. **Click "Publish"**
4. **Wait 10-30 seconds for rules to deploy**

### Option 2: Via Firebase CLI

If you have Firebase CLI installed:

```bash
cd tribe
firebase deploy --only firestore:rules
```

## Verify Rules Are Active

1. Wait 1-2 minutes after publishing
2. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
3. Try using the app again

## What These Rules Do

- **Public Read**: Anyone can read communities, posts, comments, and user profiles
- **Authenticated Write**: Only logged-in users can create/update/delete
- **Owner Protection**: Users can only modify their own posts, comments, and user data
- **Secure**: Default deny for any other collections

## Troubleshooting

If you still get permission errors:
1. Check that rules were published successfully
2. Verify you're logged in (check auth state)
3. Check browser console for specific error messages
4. Wait 2-3 minutes for rules to fully propagate
