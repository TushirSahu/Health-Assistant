import json
import requests

API_KEY = "AIzaSyCThmnZHNxGR_FrJ1w0heWE2bWQVNaMuWI"

# def docPR(prompt):
#     url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"
#     headers = {
#         "Content-Type": "application/json",
#     }
#     payload = {
#         "contents": [
#             {
#                 "parts": [
#                     {
#                         "text": f"\"Hey you are supposed to read the text and extract only the medicinename and provide it as medicine: the name you extracted and no other information apart from that Here is the text {prompt} and present the response as medicine:response\"",
#                     },
#                 ],
#             },
#         ],
#     }
#     response = requests.post(url, headers=headers, json=payload)
#     data = response.json()
#     print(data)
#     if not data['candidates'][0]['content']['parts'][0]['text']:
#         return "Error in generating documentation. Please try again."
#     return data['candidates'][0]['content']['parts'][0]['text']


