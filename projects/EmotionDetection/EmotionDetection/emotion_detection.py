import json
import requests

def _none_payload():
    return {
        "anger": None,
        "disgust": None,
        "fear": None,
        "joy": None,
        "sadness": None,
        "dominant_emotion": None,
    }

def emotion_detector(text_to_analyze: str):
    # Local blank guard (don’t even call API)
    if text_to_analyze is None or not str(text_to_analyze).strip():
        return _none_payload()

    url = "https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict"
    payload = {"raw_document": {"text": text_to_analyze}}
    headers = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
    except Exception:
        # Network failure → return None payload
        return _none_payload()

    # Course requirement: for 400 return None for all fields
    if response.status_code == 400:
        return _none_payload()

    # For any non-200 (e.g., 500) also return None payload safely
    if response.status_code != 200:
        return _none_payload()

    # Parse JSON safely
    try:
        data = json.loads(response.text)
        # Expected structure:
        # data["emotionPredictions"][0]["emotion"] = {anger, disgust, fear, joy, sadness}
        emotions = data["emotionPredictions"][0]["emotion"]
        anger   = emotions.get("anger")
        disgust = emotions.get("disgust")
        fear    = emotions.get("fear")
        joy     = emotions.get("joy")
        sadness = emotions.get("sadness")

        # Dominant emotion by highest score
        # Guard against None values
        valid_items = {k: v for k, v in emotions.items() if isinstance(v, (int, float))}
        if not valid_items:
            return _none_payload()
        dominant = max(valid_items, key=valid_items.get)

        return {
            "anger": anger,
            "disgust": disgust,
            "fear": fear,
            "joy": joy,
            "sadness": sadness,
            "dominant_emotion": dominant,
        }
    except (KeyError, IndexError, TypeError, json.JSONDecodeError):
        # Any schema/parse problem → safe None payload
        return _none_payload()