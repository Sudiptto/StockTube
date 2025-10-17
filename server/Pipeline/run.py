# Pipeline for running the stock videos
# run.py
import os
from compare_stock import get_stock_data
from create_frames import generate_frames
from create_video import create_video_from_frames


def run_pipeline(ticker1="AAPL", ticker2="MSFT", start_date="2020-01-01", end_date="2024-12-31",
                 frequency="daily", investment = 100, seconds=10, output_path="output.mp4", title="MSFT V APPLE"):
    """
    Full video generation pipeline.
    1. Fetch + compare stock data
    2. Generate frames
    3. Compile video
    """

    print("[PIPELINE] Starting pipeline...")
    print(f"Tickers: {ticker1}, {ticker2} | Range: {start_date} → {end_date} | Frequency: {frequency}")
    print(f"Duration: {seconds}s | Output: {output_path}")

    # STEP 1: Fetch and compare stock data
    df = get_stock_data(ticker1, ticker2, start_date, end_date, investment=investment, freq=frequency)
    print("[PIPELINE] Data comparison complete ✅")

    # STEP 2: Create frames from data
    frames = generate_frames(df, ticker1, ticker2, title=title)
    print(f"[PIPELINE] {len(frames)} frames generated ✅")

    # STEP 3: Compile frames into video
    create_video_from_frames(frames, output_path=output_path, seconds=seconds)
    print("[PIPELINE] Video successfully created 🎥")


if __name__ == "__main__":
    run_pipeline(
        ticker1="AAPL",
        ticker2="MSFT",
        start_date="2020-01-01",
        end_date="2024-12-31",
        frequency="weekly",   # or "daily", "monthly"
        seconds=10,
        output_path="demo_output.mp4"
    )
