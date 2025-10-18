#!/usr/bin/env python3
"""
Test script to verify YouTube API configuration
Run this to check if your credentials are working
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_youtube_config():
    print("🔍 Testing YouTube API Configuration...")
    print("=" * 50)
    
    # Check if .env file exists
    env_file = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_file):
        print("✅ .env file found")
    else:
        print("❌ .env file not found")
        print("Please create a .env file in server/API/ with your credentials")
        return False
    
    # Check credentials
    client_id = os.getenv('YOUTUBE_CLIENT_ID')
    client_secret = os.getenv('YOUTUBE_CLIENT_SECRET')
    
    if client_id and client_id != 'your-actual-client-id-here':
        print("✅ YOUTUBE_CLIENT_ID is set")
    else:
        print("❌ YOUTUBE_CLIENT_ID is not set or still has placeholder value")
        return False
    
    if client_secret and client_secret != 'your-actual-client-secret-here':
        print("✅ YOUTUBE_CLIENT_SECRET is set")
    else:
        print("❌ YOUTUBE_CLIENT_SECRET is not set or still has placeholder value")
        return False
    
    # Test OAuth flow creation
    try:
        from google_auth_oauthlib.flow import Flow
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": ["http://127.0.0.1:5000/youtube_callback"]
                }
            },
            scopes=['https://www.googleapis.com/auth/youtube.upload']
        )
        print("✅ OAuth flow configuration is valid")
        return True
        
    except Exception as e:
        print(f"❌ OAuth flow configuration failed: {e}")
        return False

if __name__ == "__main__":
    success = test_youtube_config()
    print("=" * 50)
    if success:
        print("🎉 YouTube configuration is ready!")
        print("You can now start the Flask server and test YouTube uploads.")
    else:
        print("⚠️  Please fix the configuration issues above.")
        print("\nTo set up YouTube API:")
        print("1. Go to Google Cloud Console")
        print("2. Create/select a project")
        print("3. Enable YouTube Data API v3")
        print("4. Create OAuth 2.0 credentials")
        print("5. Add redirect URI: http://127.0.0.1:5000/youtube_callback")
        print("6. Copy Client ID and Secret to your .env file")
