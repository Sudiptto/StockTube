import yfinance as yf
import pandas as pd

"""Compare growth of two stocks for a one-time investment."""
def compare_stocks(ticker1: str, ticker2: str,
                   start_date: str, end_date: str,
                   investment: float):

    # be explicit about adjustment to silence the warning
    s1_data = yf.download(ticker1, start=start_date, end=end_date,
                          auto_adjust=True, progress=False)
    s2_data = yf.download(ticker2, start=start_date, end=end_date,
                          auto_adjust=True, progress=False)

    # make sure we actually got data
    if s1_data.empty or s2_data.empty:
        raise ValueError(f"Download failed for "
                         f"{ticker1 if s1_data.empty else ticker2}. "
                         "Check ticker or date range.")

    stock1 = s1_data["Close"]
    stock2 = s2_data["Close"]

    # align on common dates
    df = pd.concat([stock1, stock2], axis=1, keys=[ticker1, ticker2]).dropna()
    if df.empty:
        raise ValueError("No overlapping trading days found.")

    # normalize to initial investment
    df[f"{ticker1}_value"] = (df[ticker1] / df[ticker1].iloc[0]) * investment
    df[f"{ticker2}_value"] = (df[ticker2] / df[ticker2].iloc[0]) * investment

    # summary -> TESTS 
    '''final1 = float(df.iloc[-1][f"{ticker1}_value"])
    final2 = float(df.iloc[-1][f"{ticker2}_value"])
    gain1 = (final1 / investment - 1) * 100
    gain2 = (final2 / investment - 1) * 100

    print(f"\nPerformance Summary ({start_date} → {end_date}):")
    print(f"{ticker1}: ${final1:.2f} ({gain1:+.2f}%)")
    print(f"{ticker2}: ${final2:.2f} ({gain2:+.2f}%)")'''

    return df


if __name__ == "__main__":
    df = compare_stocks("AAPL", "MSFT", "2020-01-01", "2024-12-31", 1000)
    print(df.tail())
