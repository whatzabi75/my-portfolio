import os
from flask import Flask, render_template, request
from EmotionDetection.emotion_detection import emotion_detector

BASE_DIR = os.path.dirname(__file__)
TEMPLATE_DIR = os.path.join(BASE_DIR, "oaqjp-final-project-emb-ai", "templates")
STATIC_DIR = os.path.join(BASE_DIR, "oaqjp-final-project-emb-ai", "static")

app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

@app.route("/emotionDetector")
def sent_detector():
    text_to_analyze = request.args.get("textToAnalyze")
    if text_to_analyze is None:
        text_to_analyze = request.args.get("textToAnalyse")
    text_to_analyze = (text_to_analyze or "").strip()

    response = emotion_detector(text_to_analyze)

    if response.get("dominant_emotion") is None:
        return "Invalid text! Please try again!"

    anger = response["anger"]
    disgust = response["disgust"]
    fear = response["fear"]
    joy = response["joy"]
    sadness = response["sadness"]
    dominant = response["dominant_emotion"]

    return (
        "For the given statement, the system response is "
        f"'anger': {anger}, 'disgust': {disgust}, 'fear': {fear}, "
        f"'joy': {joy} and 'sadness': {sadness}. "
        f"The dominant emotion is {dominant}."
    )

@app.route("/")
def render_index_page():
    """
    Endpoint to render the index page of the Emotion Detection app.
    """
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
