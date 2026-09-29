const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    try{
        const api_key = "5fbfc369dcec20a248efd41bc584d5cd";

        // ✅ FIX: added units=metric
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        const response = await fetch(url);
        const weather_data = await response.json();

        // ✅ FIX: handle both string and number
        if(weather_data.cod == 404){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // ✅ FIX: no need to convert temp now
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // ✅ FIX: removed "/" from path
        switch(weather_data.weather[0].main){
            case 'Clouds':
                weather_img.src = "assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.png";
                break;
            default:
                weather_img.src = "assets/cloud.png";
        }

    } catch(error){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log(error);
    }
}


// ✅ Button click
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value.trim());
});

// ✅ Enter key support
inputBox.addEventListener('keypress', (e)=>{
    if(e.key === "Enter"){
        checkWeather(inputBox.value.trim());
    }
});