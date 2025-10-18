import cv2
import os


"""
    Create a video from a list of frames.
    Args:
        frames (list): list of np.ndarray frames.
        output_path (str): output video path.
        seconds (int): total duration of video (default 60s).
        fps (int): frames per second (optional, auto-calculated if None).
        
    """
def create_video_from_frames(frames, output_path="output.mp4", seconds=60, fps=None):
    
    if not frames:
        raise ValueError("No frames provided")

    height, width, _ = frames[0].shape

    # Auto calculate fps if not given
    if fps is None:
        fps = len(frames) / seconds

    print(f"[INFO] Generating video at {fps:.2f} FPS ({seconds}s total)")

    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    for frame in frames:
        out.write(frame)

    out.release()
    print(f"[INFO] Video saved to {output_path}")
