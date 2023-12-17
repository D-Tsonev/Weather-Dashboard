const APIKey = "91d963d53697a7a28a646b274c52abda";

const today = $('#today')

// cityName = $('#search-input')

searchBtn = $('#search-button')


const currentTime = dayjs();
const currentTime24 = parseInt(currentTime.format("HH"));

dayjs.extend(window.dayjs_plugin_advancedFormat);
const showDate = dayjs().format("D/MM/YYYY");

console.log(showDate)

searchBtn.on('click', function(event){
  event.preventDefault(); 
  cityName = $('#search-input').val();
  console.log(cityName);

  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`

  
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

  
      const iconPng = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    
      const icon = $('<img>').attr('src', iconPng).attr ('alt',data.weather[0].main)
      // Display city name, date
      const cityAndDate = $('<h3>').text(` ${data.name}  (${showDate})`);
      cityAndDate.append(icon);
      today.append(cityAndDate);


      const tempC = (data.main.temp - 273.15).toFixed(2);
      const temp = $("<h4>").text("Temperature " + tempC);
      const wind = $("<h4>").text("Wind Speed: " + data.wind.speed);
      const humidity = $("<h4>").text("Humidity: " + data.main.humidity);
      today.append(temp,wind,humidity)


    })
  })


  






