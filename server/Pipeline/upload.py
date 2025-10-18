import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# Load .env from parent of /server (the project root)
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
load_dotenv(env_path)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_API_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


def upload_video_to_cloudinary(video_path: str):
    """
    Uploads a video to Cloudinary and returns the secure URL.
    """
    try:
        print("📤 Uploading to Cloudinary...")
        result = cloudinary.uploader.upload(
            video_path,
            resource_type="video",   # Required for video
            folder="stocktube_videos",  # Optional folder
            overwrite=True
        )
        url = result.get("secure_url")
        print(f"✅ Uploaded successfully:\n{url}")
        return url
    except Exception as e:
        print(f"❌ Upload failed: {e}")
        return None


# Optional: direct run test
if __name__ == "__main__":
    video_path = os.path.join(os.path.dirname(__file__), "output.mp4")
    upload_video_to_cloudinary(video_path)
