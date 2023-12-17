const APIKey = "91d963d53697a7a28a646b274c52abda";


// cityName = $('#search-input')

searchBtn = $('#search-button')


const currentTime = dayjs();
const currentTime24 = parseInt(currentTime.format("HH"));

dayjs.extend(window.dayjs_plugin_advancedFormat);
const showDate = dayjs().format("D/MM/YYYY");

// Showing day, month and year in format  1/12/2023
// currentDayEl.text(showDate);

console.log(showDate)

searchBtn.on('click', function(event){
  event.preventDefault(); 
  cityName = $('#search-input').val();
  console.log(cityName);


  // Here we are building the URL we need to query the database
  // const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=${APIKey}`
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
  
  
  // Here we run our Fetch call to the OpenWeatherMap API
  fetch(queryURL)
    .then(function (response) {
      // Calling .json() to access the json data stored inside the returned promise
      return response.json();
    })
    // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {
  
      // Log the queryURL
      console.log(queryURL);
  
      // Log the resulting object
      console.log(data);
      const iconPng = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      const icon = $('<img>').attr('src', iconPng)
      const div = $('<div>')
      div.append(icon)

      

      console.log(icon);
      
      $('body').append(icon);
      console.log(city)

      $('body').append(city)
  
      // Transfer content to HTML
      $(".city").html("<h1>" + data.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + data.wind.speed);
      $(".humidity").text("Humidity: " + data.main.humidity);
  
      // Convert the temp to Celsius
      var tempC = data.main.temp - 273.15;
  
      // add temp content to html
      $(".temp").text("Temperature (K) " + data.main.temp);
      $(".tempC").text("Temperature (C) " + tempC.toFixed(2));
  
      // Log the data in the console as well
      console.log("Wind Speed: " + data.wind.speed);
      console.log("Humidity: " + data.main.humidity);
      console.log("Temperature (C): " + tempC);
    });



})


