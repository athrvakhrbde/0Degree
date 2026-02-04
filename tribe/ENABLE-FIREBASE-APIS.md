# Enable Firebase APIs

## The Issue
Environment variables are working! But Firebase APIs need to be enabled.

## Step 1: Enable Firestore API

1. Go to: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=tribe-0degree
2. Click **"Enable"** button
3. Wait 1-2 minutes for it to activate

## Step 2: Enable Firebase Authentication API

1. Go to: https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=tribe-0degree
2. Click **"Enable"** button
3. Wait 1-2 minutes for it to activate

## Step 3: Configure Firebase Authentication

1. Go to: https://console.firebase.google.com/project/tribe-0degree/authentication
2. Click **"Get Started"** or **"Sign-in method"** tab
3. Enable **"Email/Password"**:
   - Click on "Email/Password"
   - Toggle **"Enable"** to ON
   - Click **"Save"**
4. Enable **"Google"** (optional but recommended):
   - Click on "Google"
   - Toggle **"Enable"** to ON
   - Enter your support email
   - Click **"Save"**

## Step 4: Create Firestore Database

1. Go to: https://console.firebase.google.com/project/tribe-0degree/firestore
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for now)
4. Select a location (choose closest to your users)
5. Click **"Enable"**

## Step 5: Test

After enabling APIs and configuring:
1. Wait 2-3 minutes for changes to propagate
2. Refresh your browser (hard refresh: Cmd+Shift+R)
3. Try logging in - should work now!

## Quick Links

- **Firestore API**: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=tribe-0degree
- **Auth API**: https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=tribe-0degree
- **Firebase Console**: https://console.firebase.google.com/project/tribe-0degree
- **Authentication Setup**: https://console.firebase.google.com/project/tribe-0degree/authentication
- **Firestore Setup**: https://console.firebase.google.com/project/tribe-0degree/firestore
