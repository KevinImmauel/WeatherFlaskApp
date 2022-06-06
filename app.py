from flask import Flask
import requests
import json

app = Flask(__name__)
# lat = 13.08 lon = 77.56

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
    app.run(debug=True)