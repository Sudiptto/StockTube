# create_frames.py
import matplotlib.pyplot as plt
import numpy as np
import cv2

# generate ticker1, ticker2, title 
def generate_frames(df, ticker1, ticker2, title, video_size=(1280, 720)):
    """
    Generate video frames from stock dataframe.
    Returns list of frames (each a numpy array).
    """
    frames = []
    total_points = len(df)
    VIDEO_WIDTH, VIDEO_HEIGHT = video_size

    for i in range(1, total_points + 1):
        fig, ax = plt.subplots(figsize=(16, 9))  # wide aspect

        ax.plot(df.index[:i], df[f"{ticker1}_value"][:i], color="blue", label=ticker1)
        ax.plot(df.index[:i], df[f"{ticker2}_value"][:i], color="orange", label=ticker2)
        ax.legend(loc="upper left")
        ax.set_xlabel("Date")
        ax.set_ylabel("Value ($)")
        ax.set_title(title)
        ax.grid(True)

        fig.canvas.draw()

        # extract ARGB buffer
        buf = np.frombuffer(fig.canvas.tostring_argb(), dtype=np.uint8)
        w, h = fig.canvas.get_width_height()
        buf = buf.reshape(h, w, 4)

        # convert ARGB → RGB → BGR
        buf = buf[:, :, 1:4]
        frame = cv2.cvtColor(buf, cv2.COLOR_RGB2BGR)

        # resize to desired video resolution
        frame = cv2.resize(frame, (VIDEO_WIDTH, VIDEO_HEIGHT))

        frames.append(frame)
        plt.close(fig)

    return frames
