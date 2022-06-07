from flask import Flask
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)

d = open('secrets.json')
jsondata = json.load(d)
apikey = jsondata["apikey"]

def getcitynamedata(cityname):
    f = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={apikey}')
    return f.text

def getlatlondata(lat, lon):
    lat = float(lat)
    lon = float(lon)
    f = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apikey}')
    return f.text

@app.route('/')
def hello():
    return "hello"

@app.route('/name/<cityname>')
def getdatacity(cityname):
    return getcitynamedata(cityname)

@app.route('/loc/<lat>/<lon>')
def getdataloc(lat, lon):
    return getlatlondata(lat, lon)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 33507))
    app.run(debug=True, port=33507)