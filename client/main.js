var cityname = document.querySelector('.cityname')
var searchbtn = document.querySelector('.search')
var iconele = document.querySelector('.icon')
var mode = document.querySelector('.mode')
var checkbox = document.querySelector('.checkbox')
var checkmode = document.querySelector('.checkmode')
var weatherloc = document.querySelector('.weatherloc')
var latText = document.querySelector('.latit')
var longText = document.querySelector('.longi')
var countryname = document.querySelector('.countryname')
function capitalize(s){
    return s && s[0].toUpperCase() + s.slice(1);
}
//user location
navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);
})
//darkmode/lightmode switch
checkbox.addEventListener('click', (event) => {
    if (checkbox.classList.contains('on')){
        checkbox.setAttribute('aria-checked', 'false')
        checkmode.innerHTML = 'Light Mode'
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(img/cool-background.svg)"
        document.getElementsByTagName("BODY")[0].style.color = "#000"
        document.getElementsByTagName("BODY")[0].style.backgroundColor = "#fff"
        cityname.style.border = "#000 solid 2px"
        searchbtn.style.backgroundColor = "#000"
        searchbtn.style.color = "#fff"
        document.querySelector(".fullcont").style.color = "#000"
        document.querySelector('.icont').style.backgroundColor = "rgb(240, 240, 240)"
        iconele.style.color = '#000'
        weatherloc.style.color = '#000'
        weatherloc.style.border = '#000 solid 1px'
        for (let i = 0; i < (document.querySelectorAll('.box')).length; i++){
            document.querySelectorAll('.box')[i].style.backgroundColor = "rgb(240, 240, 240)"
        }
    } else {
        checkbox.setAttribute('aria-checked', 'true')
        checkmode.innerHTML = 'Dark Mode'
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(img/cool-backgroundb.svg)"
        document.getElementsByTagName("BODY")[0].style.color = "#fff"
        document.getElementsByTagName("BODY")[0].style.backgroundColor = "#000"
        cityname.style.border = "#fff solid 2px"
        searchbtn.style.backgroundColor = "#fff"
        searchbtn.style.color = "#000"
        document.querySelector(".fullcont").style.color = "#fff"
        document.querySelector('.icont').style.backgroundColor = "#121212"
        iconele.style.color = '#fff'
        weatherloc.style.color = '#fff'
        weatherloc.style.border = '#fff solid 1px'
        for (let i = 0; i < (document.querySelectorAll('.box')).length; i++){
            document.querySelectorAll('.box')[i].style.backgroundColor = "#121212"
        }
    }
    checkbox.classList.toggle('on')
})
//weather icon fucntion
function iconchange(weathericon, icode, html){
    if (weathericon === icode){
        iconele.innerHTML = html
    }
}
//I don't want this peice of code to repeat twice
function bruhmoment(weathericon){
    iconchange(weathericon, '01d', '<i class="fa-solid fa-sun"></i>')
    iconchange(weathericon, '01n', '<i class="fa-solid fa-moon"></i>')
    iconchange(weathericon, '02d', '<i class="fa-solid fa-cloud-sun"></i>')
    iconchange(weathericon, '02n', '<i class="fa-solid fa-cloud-moon"></i>')
    iconchange(weathericon, '03d', '<i class="fa-solid fa-cloud"></i>')
    iconchange(weathericon, '03n', '<i class="fa-solid fa-cloud"></i>')
    iconchange(weathericon, '04d', '<i class="fa-solid fa-cloud"></i>')
    iconchange(weathericon, '04n', '<i class="fa-solid fa-cloud"></i>')
    iconchange(weathericon, '09d', '<i class="fa-solid fa-cloud-showers-heavy"></i>')
    iconchange(weathericon, '09n', '<i class="fa-solid fa-cloud-showers-heavy"></i>')
    iconchange(weathericon, '10d', '<i class="fa-solid fa-cloud-sun-rain"></i>')
    iconchange(weathericon, '10d', '<i class="fa-solid fa-cloud-moon-rain"></i>')
    iconchange(weathericon, '11d', '<i class="fa-solid fa-cloud-bolt"></i>')
    iconchange(weathericon, '11n', '<i class="fa-solid fa-cloud-bolt"></i>')
    iconchange(weathericon, '13d', '<i class="fa-solid fa-snowflake"></i>')
    iconchange(weathericon, '13n', '<i class="fa-solid fa-snowflake"></i>')
    iconchange(weathericon, '50d', '<i class="fa-solid fa-smog"></i>')
    iconchange(weathericon, '50n', '<i class="fa-solid fa-smog"></i>')
}
//fetching current location weather report
weatherloc.addEventListener('click', () => {
    fetch('https://pythonflaskweather.herokuapp.com//loc/' + latText.innerText + '/' + longText.innerText)
        .then(response => response.json())
        .then(data => {
            var weathericon = data["weather"][0]["icon"]
            bruhmoment(weathericon)
            countryname.innerHTML = data["sys"]["country"] + ', ' + data["name"]
            document.querySelector('.temp').innerHTML = data["main"]["temp"] + '°'
            document.querySelector('.windspd').innerHTML = data["wind"]["speed"] + ' m/s'
            document.querySelector('.weatherdes').innerHTML = capitalize(data["weather"][0]["description"])
            document.querySelector('.humidity').innerHTML = data["main"]["humidity"] + '%'
            document.querySelector('.pressure').innerHTML = data["main"]["pressure"] + ' hPa'
            document.querySelector('.tempmin').innerHTML = data["main"]["temp_min"] + '°'
            document.querySelector('.tempmax').innerHTML = data["main"]["temp_max"] + '°'
            document.querySelector('.cloudper').innerHTML = data["clouds"]["all"] + '%'
            document.querySelector(".fullcont").style.display = "flex"
            document.querySelector(".input").style.padding = "7% 0 0 0"
        })
})
//fetching cityname weather report
searchbtn.addEventListener("click", function() {
    fetch('https://pythonflaskweather.herokuapp.com//name/' + cityname.value)
        .then(response => response.json())
        .then(data => {
            var weathericon = data["weather"][0]["icon"]
            bruhmoment(weathericon)
            countryname.innerHTML = data["sys"]["country"] + ', ' + data["name"]
            document.querySelector('.temp').innerHTML = data["main"]["temp"] + '°'
            document.querySelector('.windspd').innerHTML = data["wind"]["speed"] + ' m/s'
            document.querySelector('.weatherdes').innerHTML = capitalize(data["weather"][0]["description"])
            document.querySelector('.humidity').innerHTML = data["main"]["humidity"] + '%'
            document.querySelector('.pressure').innerHTML = data["main"]["pressure"] + ' hPa'
            document.querySelector('.tempmin').innerHTML = data["main"]["temp_min"] + '°'
            document.querySelector('.tempmax').innerHTML = data["main"]["temp_max"] + '°'
            document.querySelector('.cloudper').innerHTML = data["clouds"]["all"] + '%'
            document.querySelector(".fullcont").style.display = "flex"
            document.querySelector(".input").style.padding = "7% 0 0 0"
        })
})