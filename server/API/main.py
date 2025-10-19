from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import sys
import os
import json
import urllib.request
import urllib.parse
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload
import tempfile
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add the Pipeline directory to the Python path
pipeline_path = os.path.join(os.path.dirname(__file__), '..', 'Pipeline')
sys.path.append(pipeline_path)

# Import the pipeline function
from run import run_pipeline

app = Flask(__name__)
CORS(app)

# YouTube API Configuration
YOUTUBE_CLIENT_ID = os.getenv('YOUTUBE_CLIENT_ID')
YOUTUBE_CLIENT_SECRET = os.getenv('YOUTUBE_CLIENT_SECRET')
YOUTUBE_REDIRECT_URI = 'http://127.0.0.1:5000/youtube_callback'

# Validate YouTube credentials
if not YOUTUBE_CLIENT_ID or not YOUTUBE_CLIENT_SECRET:
    print("⚠️  WARNING: YouTube credentials not found!")
    print("Please create a .env file in server/API/ with:")
    print("YOUTUBE_CLIENT_ID=your-client-id")
    print("YOUTUBE_CLIENT_SECRET=your-client-secret")
    print("YouTube upload functionality will not work without these credentials.")

# YouTube OAuth scopes
SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

# Store user credentials temporarily (in production, use a proper database)
user_credentials = {}

def normalize_input(data):
    return {
        "stock1": data.get("stock1") or data.get("stock 1"),
        "stock2": data.get("stock2") or data.get("stock 2"),
        "start_date": data.get("start_date") or data.get("start date"),
        "end_date": data.get("end_date") or data.get("end date"),
        "daily_freq": data.get("daily_freq") or data.get("data frequency"),
        "one-time-investment": data.get("one-time-investment") or data.get("one time investment"),
        "bg_template": data.get("bg_template") or data.get("Background Template"),
        "vid_duration": data.get("vid_duration") or data.get("video duration")
    }

@app.route('/stock_req', methods=['POST'])
def stock_req():
    try:
        data = request.get_json()  # Get the JSON body
        payload = normalize_input(data or {})
        
        # Extract parameters with defaults
        ticker1 = payload.get("stock1", "AAPL")
        ticker2 = payload.get("stock2", "MSFT")
        start_date = payload.get("start_date", "2020-01-01")
        end_date = payload.get("end_date", "2024-12-31")
        frequency = payload.get("daily_freq", "daily")
        investment = float(payload.get("one-time-investment", 100))
        seconds = int(payload.get("vid_duration", 10))
        
        # Create title from tickers (TITLE -> CAN CHANGE ... )
        title = f"{ticker1} vs {ticker2}"
        
        #  keep like this .. 
        output_path = "output.mp4"
        
        print(f"[API] Starting pipeline for {ticker1} vs {ticker2}")
        
        # Run the pipeline
        cloud_url = run_pipeline(
            ticker1=ticker1,
            ticker2=ticker2,
            start_date=start_date,
            end_date=end_date,
            frequency=frequency,
            investment=investment,
            seconds=seconds,
            output_path=output_path,
            title=title
        )
        
        if cloud_url:
            # Success response
            return jsonify({
                "status": "success",
                "message": "Video generated successfully",
                "video_url": cloud_url,
                "parameters": {
                    "ticker1": ticker1,
                    "ticker2": ticker2,
                    "start_date": start_date,
                    "end_date": end_date,
                    "frequency": frequency,
                    "investment": investment,
                    "duration": seconds
                }
            }), 200
        else:
            # Upload failed
            return jsonify({
                "status": "error",
                "message": "Video generated but upload failed",
                "error": "Upload to cloudinary failed"
            }), 500
            
    except Exception as e:
        # Pipeline failed
        return jsonify({
            "status": "error",
            "message": "Pipeline execution failed",
            "error": str(e)
        }), 500

@app.route('/youtube_auth', methods=['GET'])
def youtube_auth():
    """Generate YouTube OAuth URL"""
    try:
        # Check if credentials are configured
        if not YOUTUBE_CLIENT_ID or not YOUTUBE_CLIENT_SECRET:
            return jsonify({
                "status": "error",
                "message": "YouTube credentials not configured. Please add YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET to your .env file.",
                "error": "Missing credentials"
            }), 500
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": YOUTUBE_CLIENT_ID,
                    "client_secret": YOUTUBE_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [YOUTUBE_REDIRECT_URI]
                }
            },
            scopes=SCOPES
        )
        flow.redirect_uri = YOUTUBE_REDIRECT_URI
        
        auth_url, _ = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )
        
        return jsonify({
            "status": "success",
            "auth_url": auth_url
        }), 200
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Failed to generate YouTube auth URL",
            "error": str(e)
        }), 500

@app.route('/youtube_callback', methods=['GET'])
def youtube_callback():
    """Handle YouTube OAuth callback"""
    try:
        code = request.args.get('code')
        if not code:
            return jsonify({
                "status": "error",
                "message": "No authorization code received"
            }), 400
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": YOUTUBE_CLIENT_ID,
                    "client_secret": YOUTUBE_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [YOUTUBE_REDIRECT_URI]
                }
            },
            scopes=SCOPES
        )
        flow.redirect_uri = YOUTUBE_REDIRECT_URI
        
        flow.fetch_token(code=code)
        credentials = flow.credentials
        
        # Store credentials (in production, use proper session management)
        user_credentials['default_user'] = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes
        }
        
        # Return success page that closes the popup
        return """
        <html>
        <body>
            <h2>YouTube Authorization Successful!</h2>
            <p>You can now close this window and return to the app.</p>
            <script>
                window.close();
            </script>
        </body>
        </html>
        """
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Failed to process YouTube callback",
            "error": str(e)
        }), 500

@app.route('/youtube_upload', methods=['POST'])
def youtube_upload():
    """Upload video to YouTube"""
    try:
        data = request.get_json()
        video_url = data.get('video_url')
        title = data.get('title', 'Stock Comparison Video')
        description = data.get('description', 'A stock comparison video generated by StockTube')
        
        if not video_url:
            return jsonify({
                "status": "error",
                "message": "No video URL provided"
            }), 400
        
        # Check if user is authenticated
        if 'default_user' not in user_credentials:
            return jsonify({
                "status": "error",
                "message": "User not authenticated with YouTube"
            }), 401
        
        # Recreate credentials from stored data
        cred_data = user_credentials['default_user']
        credentials = Credentials(
            token=cred_data['token'],
            refresh_token=cred_data['refresh_token'],
            token_uri=cred_data['token_uri'],
            client_id=cred_data['client_id'],
            client_secret=cred_data['client_secret'],
            scopes=cred_data['scopes']
        )
        
        # Download video from Cloudinary URL
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            urllib.request.urlretrieve(video_url, temp_file.name)
            
            # Build YouTube service
            youtube = build('youtube', 'v3', credentials=credentials)
            
            # Video metadata
            body = {
                'snippet': {
                    'title': title,
                    'description': description,
                    'tags': ['stock', 'comparison', 'finance', 'trading'],
                    'categoryId': '26'  # Howto & Style category
                },
                'status': {
                    'privacyStatus': 'private'  # Upload as draft
                }
            }
            
            # Upload video
            media = MediaFileUpload(temp_file.name, chunksize=-1, resumable=True)
            insert_request = youtube.videos().insert(
                part=','.join(body.keys()),
                body=body,
                media_body=media
            )
            
            response = insert_request.execute()
            
            # Clean up temp file
            os.unlink(temp_file.name)
            
            return jsonify({
                "status": "success",
                "message": "Video uploaded to YouTube successfully",
                "video_id": response['id'],
                "youtube_url": f"https://www.youtube.com/watch?v={response['id']}"
            }), 200
            
    except HttpError as e:
        return jsonify({
            "status": "error",
            "message": "YouTube API error",
            "error": str(e)
        }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Failed to upload video to YouTube",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)

    
