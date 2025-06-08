from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('responses.json') as f:
    responses = json.load(f)

@app.route('/get', methods=['POST'])
def get_bot_response():
    user_msg = request.json['message'].lower()
    for key in responses:
        if key in user_msg:
            return jsonify({'reply': responses[key]})
    return jsonify({'reply': responses['default']})

if __name__ == '__main__':
    app.run(debug=True)
