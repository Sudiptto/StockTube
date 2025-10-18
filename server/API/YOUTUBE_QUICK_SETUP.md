# 🚀 YouTube Integration Quick Setup

## Step 1: Create .env File

Create a file called `.env` in your `server/API/` directory with your credentials:

```
YOUTUBE_CLIENT_ID=your-actual-client-id-here
YOUTUBE_CLIENT_SECRET=your-actual-client-secret-here
```

**Replace the placeholder values with your actual credentials from Google Cloud Console.**

## Step 2: Test Your Configuration

Run the test script to verify everything is working:

```bash
cd server/API
python test_youtube_config.py
```

This will check if:
- ✅ .env file exists
- ✅ Credentials are properly set
- ✅ OAuth configuration is valid

## Step 3: Start the Server

```bash
cd server/API
python main.py
```

You should see:
```
⚠️  WARNING: YouTube credentials not found!
```
**OR** (if configured correctly):
```
✅ YouTube credentials loaded successfully
```

## Step 4: Test YouTube Upload

1. Go to your frontend: `http://localhost:3000/create`
2. Generate a video
3. Click "Upload to YouTube"
4. Complete OAuth flow in popup
5. Video uploads as private draft to your YouTube channel

## 🔧 Troubleshooting

### "YouTube credentials not configured"
- Make sure your `.env` file is in `server/API/` directory
- Check that you replaced the placeholder values
- Restart the Flask server after adding credentials

### "OAuth flow configuration failed"
- Verify your Client ID and Secret are correct
- Make sure you enabled YouTube Data API v3 in Google Cloud Console
- Check that redirect URI is set to: `http://127.0.0.1:5000/youtube_callback`

### "User not authenticated with YouTube"
- Complete the OAuth flow in the popup window
- Make sure you grant all requested permissions
- Try refreshing and starting the upload process again

## 📋 Google Cloud Console Checklist

- [ ] Project created/selected
- [ ] YouTube Data API v3 enabled
- [ ] OAuth 2.0 credentials created (Web application)
- [ ] Redirect URI added: `http://127.0.0.1:5000/youtube_callback`
- [ ] Client ID and Secret copied to .env file

## 🎯 What Happens When You Upload

1. **OAuth Popup** → User authorizes YouTube access
2. **Video Download** → Server downloads video from Cloudinary
3. **YouTube Upload** → Video uploaded as private draft
4. **Success Message** → YouTube URL provided to user

The video will appear in your YouTube Studio under "Content" as a private draft that you can edit and publish when ready!
