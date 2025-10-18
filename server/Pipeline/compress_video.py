from moviepy import VideoFileClip

def compressed_video(input_path, output_path="compressed_output.mp4", target_bitrate="1500k"):
    """
    Compress video using MoviePy (FFMPEG backend).
    target_bitrate examples:
        "800k"  -> small file
        "1500k" -> medium quality
        "2500k" -> high quality
    """
    print(f"[INFO] Compressing {input_path} → {output_path} ...")
    clip = VideoFileClip(input_path)
    clip.write_videofile(
        output_path,
        codec="libx264",       # better compression
        audio=False,
        bitrate=target_bitrate,
        threads=4,
        ffmpeg_params=["-movflags", "+faststart"]
    )
    clip.close()
    print(f"[INFO] Compression complete ✅ {output_path}")
