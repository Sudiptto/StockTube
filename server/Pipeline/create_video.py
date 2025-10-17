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
    
    if len(frames) == 0:
        raise ValueError("No frames provided")

    # Safe unpack: works for grayscale or color frames
    height, width = frames[0].shape[:2]

    # Auto calculate fps if not given
    if fps is None:
        fps = len(frames) / seconds

    print(f"[INFO] Generating video at {fps:.2f} FPS ({seconds}s total)")

    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    for frame in frames:
        # Ensure each frame is 3-channel
        if len(frame.shape) == 2:
            frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)
        out.write(frame)

    out.release()
    print(f"[INFO] Video saved to {output_path}")

