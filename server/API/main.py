from flask import Flask, request, jsonify

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

@app.route('/test', methods=['POST'])
def stock_req():
    data = request.get_json()  # Get the JSON body
    payload = normalize_input(data or {})
    return jsonify(payload)

if __name__ == "__main__":
    app.run(debug=True)

    
