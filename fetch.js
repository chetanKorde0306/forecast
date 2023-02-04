console.log("Hello world");
//setting date and time 

console.log("This is a me");
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('temprature');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='babc21ffc11d1fa0e574fb9a0a27ec54';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);





//getting weather data
function getData() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("weather_at");
    cityName.innerHTML = ' <div id="weather_at"><h1>Weather in ' +newName.value + '</h1></div>';
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ newName.value +"rain landscape')"
    console.log("Started getdata");
    // url = "https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=babc21ffc11d1fa0e574fb9a0a27ec54";
    url = "https://api.openweathermap.org/data/2.5/forecast?q="+newName.value+"&appid=babc21ffc11d1fa0e574fb9a0a27ec54";
 
    fetch(url).then((response) => {
        console.log("Inside first then");
        return response.json();
    }).then((data) => {
        console.log("Inside second then");
        console.log(data);
        document.getElementById("hum").innerHTML = "Humidity : " + Number(data.list[0].main.humidity) + "%";
        document.getElementById("speed").innerHTML = "Wind Speed : " + Number(data.list[0].wind.speed) + "km/hr";
        document.getElementById("tempra").innerHTML = Number(data.list[0].main.temp-273.15).toFixed(2)+ "°C " ;
        document.getElementById("img6").src = "http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+".png";
        //Getting the min and max values for each day
        for (i = 0; i < 5; i++) {
            document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(2) + "°C";
            //Number(1.3450001).toFixed(2); // 1.35
        }
        for (i = 0; i < 5; i++) {
            document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
        }
        //------------------------------------------------------------
         //Getting Weather Icons
        for(i = 0; i<5; i++){
        document.getElementById("img"+(i+1)).src = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
    }


    })
}
getData();


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();


//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("Day"+(i+1)).innerHTML = days[CheckDay(i)];
    }
    //------------------------------------------------------------
