# 🚨 URGENT: Deploy Firestore Rules to Fix Permission Errors

## The Problem
You're seeing `permission-denied` errors when trying to create communities because Firestore security rules haven't been deployed to Firebase Console.

## ⚡ QUICK FIX (2 minutes)

### Step 1: Go to Firebase Console
Open: https://console.firebase.google.com/project/tribe-0degree/firestore/rules

### Step 2: Copy Rules from Local File
Open: `tribe/firestore.rules` in your editor and copy ALL the content

### Step 3: Paste in Firebase Console
1. Delete everything in the Firebase Console rules editor
2. Paste the rules from `firestore.rules`
3. Click **"Publish"** button (top right)
4. Wait for success message

### Step 4: Verify
1. Wait 30-60 seconds for rules to propagate
2. Hard refresh browser (Cmd+Shift+R)
3. Try creating a community again

## ✅ Rules Should Look Like This:

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
      allow read: if true;
      allow write: if isOwner(userId);
      
      // User subcollections
      match /{subcollection=**} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // TribeUser collection - users can read/write their own data
    match /tribeUser/{userId} {
      allow read: if true;
      allow write: if isOwner(userId);
    }
    
    // Communities collection - public read, authenticated write
    match /communities/{communityId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated();
      
      // Conversation subcollection - for chat/messaging
      match /conversation/{conversationId} {
        allow read: if isAuthenticated();
        allow write: if isAuthenticated();
      }
      
      // Other community subcollections
      match /{subcollection=**} {
        allow read: if true;
        allow write: if isAuthenticated();
      }
    }
    
    // Posts collection - public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
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
      allow read: if true;
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

## 🔍 Why This Fixes It

The transaction needs to:
1. **Read** the community document to check if it exists (`transaction.get()`)
2. **Create** the community document if it doesn't exist (`transaction.set()`)
3. **Create** the user's community snippet (`transaction.set()`)

The rules allow:
- ✅ `allow read: if true` - Anyone can read communities (needed for transaction check)
- ✅ `allow create: if isAuthenticated()` - Authenticated users can create communities
- ✅ `allow write: if isOwner(userId)` - Users can write their own snippets

## 📝 Direct Link
https://console.firebase.google.com/project/tribe-0degree/firestore/rules
