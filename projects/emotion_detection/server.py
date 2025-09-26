from flask import Flask, request, jsonify
from flask_cors import CORS
from emotion_detection import emotion_detector  # adjust import to your function

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    emotion = emotion_detector(text)  # your existing Python function
    return jsonify(emotion)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)