# YouTube Integration Setup

## Prerequisites

1. **Google Cloud Console Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3

2. **OAuth 2.0 Credentials**
   - Go to "Credentials" in the Google Cloud Console
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URI: `http://127.0.0.1:5000/youtube_callback`
   - Copy the Client ID and Client Secret

## Environment Variables

Set these environment variables before running the server:

```bash
export YOUTUBE_CLIENT_ID="your-client-id-here"
export YOUTUBE_CLIENT_SECRET="your-client-secret-here"
```

Or create a `.env` file in the `server/API/` directory:

```
YOUTUBE_CLIENT_ID=your-client-id-here
YOUTUBE_CLIENT_SECRET=your-client-secret-here
```

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask server: `python main.py`
2. Generate a video using the frontend
3. Click "Upload to YouTube" button
4. Complete OAuth flow in the popup window
5. Video will be uploaded as a private draft to your YouTube channel

## Features

- **OAuth 2.0 Authentication**: Secure YouTube account access
- **Draft Upload**: Videos are uploaded as private drafts
- **Automatic Metadata**: Title and description are generated from stock data
- **Error Handling**: Comprehensive error messages and validation

## Security Notes

- Credentials are stored temporarily in memory (not persistent)
- In production, use proper session management and database storage
- Never commit API credentials to version control
