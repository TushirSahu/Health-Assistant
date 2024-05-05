# Just creating this temporarily for cron jobs and interaction with hosted BE and FE
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Define the endpoint for your frontend to send requests to
@app.route('/api/crontab', methods=['POST'])
def handle_request():
    # Get the data from the frontend request
    data = request.json
    
    # Forward the request to your backend
    backend_url = "https://edp-iobf.onrender.com/api/crontab"
    response = requests.post(backend_url, json=data)
    
    # Write the response to a file
    with open('cron.txt', 'w') as file:
        file.write(response)

    
    
    # Return the response from the backend to the frontend
    return jsonify(response.json()), response.status_code

# @app.route('/api/generate', methods=['POST'])
# def handle_request():
#     # Get the data from the frontend request
#     data = request.json
    
#     # Forward the request to your backend
#     backend_url = "https://edp-iobf.onrender.com/api/generate" 
#     response = requests.post(backend_url, json=data)
    
#     print(response) 
    
#     # Return the response from the backend to the frontend
#     return jsonify(response.json()), response.status_code
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
