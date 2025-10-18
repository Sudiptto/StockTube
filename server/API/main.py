from flask import Flask, request, jsonify
import sys
import os

# Add the Pipeline directory to the Python path
pipeline_path = os.path.join(os.path.dirname(__file__), '..', 'Pipeline')
sys.path.append(pipeline_path)

# Import the pipeline function
from run import run_pipeline

app = Flask(__name__)

def normalize_input(data):
    return {
        "stock1": data.get("stock1") or data.get("stock 1"),
        "stock2": data.get("stock2") or data.get("stock 2"),
        "start_date": data.get("start_date") or data.get("start date"),
        "end_date": data.get("end_date") or data.get("end date"),
        "daily_freq": data.get("daily_freq") or data.get("data frequency"),
        "one-time-investment": data.get("one-time-investment") or data.get("one time investment"),
        "bg_template": data.get("bg_template") or data.get("Background Template"),
        "vid_duration": data.get("vid_duration") or data.get("video duration")
    }

@app.route('/stock_req', methods=['POST'])
def stock_req():
    try:
        data = request.get_json()  # Get the JSON body
        payload = normalize_input(data or {})
        
        # Extract parameters with defaults
        ticker1 = payload.get("stock1", "AAPL")
        ticker2 = payload.get("stock2", "MSFT")
        start_date = payload.get("start_date", "2020-01-01")
        end_date = payload.get("end_date", "2024-12-31")
        frequency = payload.get("daily_freq", "daily")
        investment = float(payload.get("one-time-investment", 100))
        seconds = int(payload.get("vid_duration", 10))
        
        # Create title from tickers (TITLE -> CAN CHANGE ... )
        title = f"{ticker1} vs {ticker2}"
        
        #  keep like this .. 
        output_path = "output.mp4"
        
        print(f"[API] Starting pipeline for {ticker1} vs {ticker2}")
        
        # Run the pipeline
        cloud_url = run_pipeline(
            ticker1=ticker1,
            ticker2=ticker2,
            start_date=start_date,
            end_date=end_date,
            frequency=frequency,
            investment=investment,
            seconds=seconds,
            output_path=output_path,
            title=title
        )
        
        if cloud_url:
            # Success response
            return jsonify({
                "status": "success",
                "message": "Video generated successfully",
                "video_url": cloud_url,
                "parameters": {
                    "ticker1": ticker1,
                    "ticker2": ticker2,
                    "start_date": start_date,
                    "end_date": end_date,
                    "frequency": frequency,
                    "investment": investment,
                    "duration": seconds
                }
            }), 200
        else:
            # Upload failed
            return jsonify({
                "status": "error",
                "message": "Video generated but upload failed",
                "error": "Upload to cloudinary failed"
            }), 500
            
    except Exception as e:
        # Pipeline failed
        return jsonify({
            "status": "error",
            "message": "Pipeline execution failed",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)

    
