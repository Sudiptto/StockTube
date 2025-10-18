# create_frames.py
import matplotlib.pyplot as plt
import numpy as np
import cv2

def generate_frames(df, ticker1, ticker2, title, video_size=(1080, 1920)):
    """
    Generate vertical (TikTok/Shorts-style) video frames from stock dataframe.
    Returns list of frames (each a numpy array).
    """
    frames = []
    total_points = len(df)
    VIDEO_WIDTH, VIDEO_HEIGHT = video_size  # width first!
    #print(df.tail())

    # ⚙️ Visual style tweaks for shortform
    plt.rcParams.update({
        "font.size": 24,
        "axes.titlesize": 40,
        "axes.labelsize": 28,
        "legend.fontsize": 26,
        "axes.linewidth": 2,
        "xtick.labelsize": 20,
        "ytick.labelsize": 20,
    })

    for i in range(1, total_points + 1):
        # 9:16 aspect ratio figure (width:height)
        fig, ax = plt.subplots(figsize=(9, 16))

        # Bold lines
        ax.plot(df.index[:i], df[f"{ticker1}_value"][:i],
                color="#0077ff", linewidth=4.5, label=ticker1)
        ax.plot(df.index[:i], df[f"{ticker2}_value"][:i],
                color="#ffaa00", linewidth=4.5, label=ticker2)

        # Aesthetics
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['left'].set_linewidth(2.5)
        ax.spines['bottom'].set_linewidth(2.5)

        ax.legend(loc="upper left", frameon=False)
        ax.set_xlabel("Date", labelpad=10)
        ax.set_ylabel("Value ($)", labelpad=10)
        ax.set_title(title, pad=30, weight="bold")

        # Grid
        ax.grid(True, linewidth=1.2, alpha=0.3)

        plt.tight_layout(pad=2.0)

        # Convert figure → frame (ARGB → RGB → BGR)
        fig.canvas.draw()
        buf = np.frombuffer(fig.canvas.tostring_argb(), dtype=np.uint8)
        w, h = fig.canvas.get_width_height()
        buf = buf.reshape(h, w, 4)
        buf = buf[:, :, 1:4]
        frame = cv2.cvtColor(buf, cv2.COLOR_RGB2BGR)

        # ✅ Correct resizing to Shorts resolution (1080x1920)
        frame = cv2.resize(frame, (VIDEO_WIDTH, VIDEO_HEIGHT))
        frames.append(frame)
        plt.close(fig)

    return frames
