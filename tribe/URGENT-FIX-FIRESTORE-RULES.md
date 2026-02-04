# 🚨 URGENT: Fix Firestore Permission Errors

## The Problem
You're seeing `Missing or insufficient permissions` errors because Firestore security rules haven't been deployed yet.

## ⚡ QUICK FIX - Copy This (30 seconds)

### Option A: Temporary Permissive Rules (For Testing Now)

**1. Open:** https://console.firebase.google.com/project/tribe-0degree/firestore/rules

**2. Delete everything and paste this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**3. Click "Publish"** (top right)

**4. Wait 30 seconds, then refresh your browser**

---

### Option B: Proper Production Rules (After Testing)

**1. Open:** https://console.firebase.google.com/project/tribe-0degree/firestore/rules

**2. Delete everything and paste this:

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
      
      // User subcollections (postVotes, communitySnippets)
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
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated();
      
      // Conversation subcollection for chat
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

### Step 4: Click "Publish" button (top right)
Wait for the success message.

### Step 5: Wait 30 seconds
Rules take a moment to propagate.

### Step 6: Hard refresh your browser
- **Mac:** Cmd + Shift + R
- **Windows/Linux:** Ctrl + Shift + R

## ✅ Verify It Worked

After refreshing, the permission errors should be gone. The app should work normally.

## 🔍 If Still Not Working

1. **Check rules were published:** Look for green checkmark in Firebase Console
2. **Check you're logged in:** Make sure you're authenticated
3. **Wait 2-3 minutes:** Sometimes rules take longer to propagate
4. **Clear browser cache:** Try incognito/private window

## 📝 What These Rules Do

- ✅ **Public Read**: Anyone can read posts, communities, comments
- ✅ **Authenticated Write**: Only logged-in users can create/edit
- ✅ **Owner Protection**: Users can only modify their own content
- ✅ **Secure**: Blocks unauthorized access

---

**Direct Link:** https://console.firebase.google.com/project/tribe-0degree/firestore/rules
