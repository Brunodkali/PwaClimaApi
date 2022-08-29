function getUserPosition() {
    let url;
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=95b11822eb429c84c1143a19251b1881`;
      fetchApi(url);
    });
  }

  function fetchApi(url) {
    let city = document.getElementById('city');
    let temp = document.querySelector('span');
    let humidity = document.getElementById('1');
    let clouds = document.getElementById('2');
    let temp_max = document.getElementById('3');
    let temp_min = document.getElementById('4');
    let wind = document.getElementById('5');
    let chuva = document.getElementById('chuva');
    let vento = document.getElementById('vento');
    let ceu = document.getElementById('ceu');
    fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
      let tempInCelsiusMax = ((5/9) * (data.main.temp_max-32)).toFixed(1);
      let tempInCelsiusMin = ((5/9) * (data.main.temp_min-32)).toFixed(1);
      let humidityPorce = (data.main.humidity);
      let cloudsPorce = (data.clouds.all);
      let WindDesc = (1.60934421012 * data.wind.speed).toFixed(1);
      city.innerText = `${data.name} - ${data.sys.country}`;
      temp.innerText = tempInCelsius;
      humidity.innerText = humidityPorce + ' %';
      wind.innerText = WindDesc + ' Km/h';
      clouds.innerText = cloudsPorce + ' %';
      temp_max.innerText = tempInCelsiusMax + 'ºC';
      temp_min.innerText = tempInCelsiusMin + 'ºC';
        if (humidityPorce == 0){
            chuva.innerText = "Baixas previsões de chuva";
        }
        if (humidityPorce < 50 ) {
            chuva.innerText = "Chuvas médias na região";
        }
        else{
            chuva.innerText = "Pancadinhas de chuva";
        }

        if (WindDesc < 20){
            vento.innerText = "Ventos fracos";
        }
        if (WindDesc < 60 ) {
            vento.innerText = "Ventos Médios";
        }
        else{
            vento.innerText = "Rajadas de vento";
        }

        if (cloudsPorce < 20){
            ceu.innerText = "Céu limpo";
        }
        if (cloudsPorce < 50 ) {
            ceu.innerText = "Céu nublado";
        }
        else{
            ceu.innerText = "Céu muito nublado";
        }
    })
    .catch((err) => {
      city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
      temp.innerText = `-`;
    })
  }
  
  getUserPosition();

  function Reload (){
    location.reload();
  }