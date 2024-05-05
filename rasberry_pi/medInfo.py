import requests
import json

url = "https://edp-iobf.onrender.com"

def getMedInfo(medText):
    body = {
        "code": "MED_INFO",
        "text": medText
    }
    res = requests.post(url+"/api/generate", json=body)
    print(res.status_code)
    if res.status_code == 200:
        data = res.json()
        return data['message']
    else:
        print("Error:", res.text)
        return ""

def getMedName(medText):
    body = {
        "code": "MED_NAME",
        "text": medText
    }
    res = requests.post(url+"/api/generate", data=body)
    if res.status_code == 200:
        data = res.json()
        print("Med Info Response:", data)
    else:
        print("Error:", res.text)