from moviepy import ImageSequenceClip

def create_video_with_moviepy(frames, output_path="output.mp4", seconds=60, fps=None, bitrate="1500k"):
    """
    Create a video from frames using MoviePy (compressed, smaller file size).
    
    Args:
        frames (list): list of np.ndarray (BGR format from OpenCV)
        output_path (str): output file path
        seconds (int): total video duration
        fps (float): frames per second (auto-calculated if None)
        bitrate (str): compression bitrate (e.g. "800k", "1500k", "2500k")
    """
    if not frames:
        raise ValueError("No frames provided")

    total_frames = len(frames)
    if fps is None:
        fps = total_frames / seconds

    print(f"[INFO] Generating video with MoviePy at {fps:.2f} FPS ({seconds}s total)")
    
    # Convert BGR → RGB for MoviePy
    rgb_frames = [frame[:, :, ::-1] for frame in frames]

    # Create MoviePy clip
    clip = ImageSequenceClip(rgb_frames, fps=fps)
    clip.write_videofile(
        output_path,
        codec="libx264",
        audio=False,
        bitrate=bitrate,
        ffmpeg_params=["-movflags", "+faststart"],
        threads=4
    )
    clip.close()
    print(f"[INFO] Video saved to {output_path}")
