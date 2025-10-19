import yfinance as yf
import pandas as pd

"""Compare growth of two stocks for a one-time investment. (WEEKLY, DAILY, MONTHLY)"""

def get_stock_data(ticker1: str, ticker2: str,
                   start_date: str, end_date: str,
                   investment: float,
                   freq: str = "daily"):  # "daily", "weekly", or "monthly"
    

    # download raw daily data
    s1_data = yf.download(ticker1, start=start_date, end=end_date,
                          auto_adjust=True, progress=False)
    s2_data = yf.download(ticker2, start=start_date, end=end_date,
                          auto_adjust=True, progress=False)

    if s1_data.empty or s2_data.empty:
        raise ValueError(f"Download failed for "
                         f"{ticker1 if s1_data.empty else ticker2}.")

    # pick only close prices
    stock1, stock2 = s1_data["Close"], s2_data["Close"]

    # combine on common dates
    df = pd.concat([stock1, stock2], axis=1, keys=[ticker1, ticker2]).dropna()

    # --- 📅 Frequency resampling ---
    freq_map = {
        "daily": None,      # already daily
        "weekly": "W",      # last trading day of week
        "monthly": "M"      # last trading day of month
    }
    if freq not in freq_map:
        raise ValueError("freq must be 'daily', 'weekly', or 'monthly'")

    if freq_map[freq]:
        df = df.resample(freq_map[freq]).last()

    # normalize investment
    df[f"{ticker1}_value"] = (df[ticker1] / df[ticker1].iloc[0]) * investment
    df[f"{ticker2}_value"] = (df[ticker2] / df[ticker2].iloc[0]) * investment

    final1 = float(df[f"{ticker1}_value"].iloc[-1])
    final2 = float(df[f"{ticker2}_value"].iloc[-1])
    gain1 = (final1 / investment - 1) * 100
    gain2 = (final2 / investment - 1) * 100

    print(f"\nPerformance Summary ({start_date} → {end_date}) [{freq.upper()}]:")
    print(f"{ticker1}: ${final1:.2f} ({gain1:+.2f}%)")
    print(f"{ticker2}: ${final2:.2f} ({gain2:+.2f}%)")

    return df


if __name__ == "__main__":
    df = get_stock_data("AAPL", "MSFT",
                        "2024-12-25", "2024-12-31",
                        1000, freq="daily")  # change to "weekly" or "daily"
    print(df.tail())
