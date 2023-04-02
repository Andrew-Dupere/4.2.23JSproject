let form = document.getElementById('weatherForm') //ID in the form tag

form.addEventListener('submit',handler) //upon form submission, run handler function

async function handler(event){
    

    event.preventDefault() //prevent event from refreshing page
    let cityName = event.target.cityName.value //the user input
    console.log(cityName)

    let WeatherInfo = await getWeather(cityName) //pass city name from user into the getWeather function to be defined later
    console.log(WeatherInfo)
    buildWeatherCard(WeatherInfo) //pass in weather info from the api call that will be used to build the html

    console.log(cityName)




    //clear input box
    event.target.cityName.value = '';



}



//make the api call

//async func returns a promise, dont throw an error right away, wait for the response before you continue, but keep running other stuff
//async means I dont know how long this function takes to run
//if you dont await in an async then an empty promise will be returned

//api calls are made internally to connect data 
//return dictionary objects in python to be used in other languages 


async function getWeather(cityName){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${cityName}&aqi=no`) //build url
        let data = await response.json()
        
        return data //return what you want to grab from the json
    }catch(err){
        console.error(err)
    }
}

//build the card to hold the weather data

//need to return temp, feels like and condition in the card

function buildWeatherCard(weatherData){
    let card = document.createElement('div')
    card.className = 'card h-100'
    card.Id = 'cardid'//`${weatherData.location.name}-card`

    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    let title = document.createElement('h4')
    title.innerHTML = weatherData.location.name //find the city title in the weather dict
    title.className = 'city-card-title'

    //create an unordered list to display temp, feels like, humidity and wind

    let temp = document.createElement('p')
    temp.innerHTML = `Current temperature: ${weatherData.current.temp_f}`// find the current temp in the weather dict
    temp.className = 'temp-data'

    let wind = document.createElement('p')
    wind.innerHTML = `Wind: ${weatherData.current.wind_mph}`
    wind.className = 'temp-data'

    let midity = document.createElement('p')
    midity.innerHTML = `Humidity: ${weatherData.current.humidity}`
    midity.className = 'temp-data'
    



    cardBody.append(title);
    cardBody.append(temp)
    cardBody.append(wind)
    cardBody.append(midity)

    card.append(cardBody)

    let weatherDisplay = document.getElementById('display')
    weatherDisplay.append(card)    


}