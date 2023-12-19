const APIKey = "91d963d53697a7a28a646b274c52abda";

const today = $('#today')
const forecast = $('#forecast')
const historyDiv = $('#history')
const history =[]

// getHistory()

// cityName = $('#search-input')

searchBtn = $('#search-button')

const currentDay = dayjs();
const currentTime24 = parseInt(currentDay.format("HH"));

dayjs.extend(window.dayjs_plugin_advancedFormat);
const showDate = dayjs().format("D/MM/YYYY");

console.log(showDate)

searchBtn.on('click', function(event){

  $('#today').empty();
  $('#forecast').empty();
  $('#history').empty()


  event.preventDefault(); 
  const todayCard = $('<div>').addClass('card  rounded bg-warning')

  cityName = $('#search-input').val()

// function getHistory () {

//   if ("cities" in localStorage) {
//     return JSON.parse(localStorage.getItem("cities"));
//   }
//   else 
//   {
//     return [];
//   }
// }



if (!history.includes(cityName.toLowerCase())) {
  history.push(cityName)}
  historyDiv.empty();
  history.forEach(city => {
    const historyBtn = $('<button>').text(city.toUpperCase()).addClass('btn btn-secondary m-1').attr("data-name",city);
    historyDiv.append(historyBtn);


  });




  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
  console.log(queryURL)
  

  
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      const lat = Number(data.coord.lat.toFixed(2))
      const lon = Number(data.coord.lon.toFixed(2))

      console.log(lat,lon)
  
      const iconPng = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      const icon = $('<img>').attr('src', iconPng).attr ('alt',data.weather[0].main)
      // Display city name, date

      const cityAndDate = $('<h3>').text(` ${data.name}  (${showDate})`)
      cityAndDate.append(icon);
      todayCard.append(cityAndDate);

      const todayCardBody = $('<div>').addClass('card-body')

      const tempC = (data.main.temp - 273.15).toFixed(2);
      const temp = $("<p>").text("Temperature " + tempC);
      const wind = $("<p>").text("Wind Speed: " + data.wind.speed);
      const humidity = $("<p>").text("Humidity: " + data.main.humidity);
      todayCardBody.append(temp,wind,humidity)
      todayCard.append(todayCardBody);
      today.append(todayCard)



    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      console.log(forecastData)
      console.log(forecastURL)

    const forecastList = forecastData.list

  console.log(forecastList[0].dt) + 86400

  



    console.log(forecastList)

    for (let i = 1; i < 6; i++) {
      const currentDay = dayjs();
      const forecastDay = currentDay.add(i, 'day');
      const forecast5Days = forecastList.find(day => dayjs(day.dt_txt).isSame(forecastDay, 'day'));
    
      //Formatting the forecast date
      const forecastDayFormatted = forecastDay.format('DD/MM/YYYY');
    
      //Create a Bootstrap card
      const card = $('<div>').addClass('col-md-2 mb-3');
      const cardBody = $('<div>').addClass('card-body rounded card-body text-center bg-warning');
      const forecastDate = $('<h5>').addClass('card-title').text(forecastDayFormatted);
    
      //Getting the temperature,wind,humidity and the icon 
      const tempC = (forecast5Days.main.temp - 273.15).toFixed(2);
      const windSpeed = forecast5Days.wind.speed;
      const humidity = forecast5Days.main.humidity;
      const iconPng = `https://openweathermap.org/img/wn/${forecast5Days.weather[0].icon}@2x.png`
    
      // Create forecast details and icon elements
      const temp = $("<p>").addClass('card-text small').text(`Temperature: ${tempC}°C`)
      const wind = $("<p>").addClass('card-text small').text(`Wind Speed: ${windSpeed} m/s`)
      const humidityInfo = $("<p>").addClass('card-text small').text(`Humidity: ${humidity}%`)
      const forecastIcon = $('<img>').addClass('card-img-top').attr('src', iconPng).attr('alt', forecast5Days.weather[0].main)
    
      // Append elements to the card
      cardBody.append(forecastDate, forecastIcon, temp, wind, humidityInfo)
      card.append(cardBody);
    
      // Append the card to the forecast container
      $('#forecast').append(card);
    }
    })

      });

    })


  



