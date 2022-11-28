const time = document.getElementById('time');
const date = new Date().toLocaleString();

(function getUserPosition() {
  var url;

  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=95b11822eb429c84c1143a19251b1881`;
    time.innerText = date;
    fetchApi(url);
  });
})();

function fetchApi(url) {
  var city = document.getElementById('city');
  var temp = document.querySelector('span');
  var humidity = document.getElementById('1');
  var clouds = document.getElementById('2');
  var temp_max = document.getElementById('3');
  var temp_min = document.getElementById('4');
  var wind = document.getElementById('5');
  var chuva = document.getElementById('chuva');
  var vento = document.getElementById('vento');
  var ceu = document.getElementById('ceu');
  
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

      city.innerText = ` ${data.name} - ${data.sys.country}`;
      temp.innerText = tempInCelsius;
      humidity.innerText = humidityPorce + ' %';
      wind.innerText = WindDesc + ' Km/h';
      clouds.innerText = cloudsPorce + ' %';
      temp_max.innerText = tempInCelsiusMax + 'º';
      temp_min.innerText = tempInCelsiusMin + 'º';

      if (humidityPorce < 30){
        chuva.innerText = "Umidade baixa";
        document.getElementById('chuva').style.color = 'red';
        document.getElementById('avisoChuva').onclick = alertaClima;
      }

      else if (humidityPorce < 70) {
        chuva.innerText = "Previsões baixas de chuva";
      }
      
      else {
        chuva.innerText = "Pancadinhas de chuva";
      }

      if (WindDesc < 20){
        vento.innerText = "Ventos fracos";
      }
        
      else if (WindDesc < 60 ) {
        vento.innerText = "Ventos Médios";
      }

      else {
        document.getElementById('vento').style.color = 'red';
        document.getElementById('avisoVento').onclick = alertaClima;
        vento.innerText = "Rajadas de vento";
      }

      if (cloudsPorce < 20){
        let img = document.createElement("IMG");

        ceu.innerText = "Céu limpo";
        document.getElementById('wrapper').style.backgroundColor = '#82b9dc';
        img.src = "/img/sunny.png";
        img.style.width = "140px";
        img.style.height = "140px";
        document.getElementById('img').appendChild(img);
      }

      else if (cloudsPorce < 50 ) {
        let img = document.createElement("IMG");

        ceu.innerText = "Céu parcialmente nublado";
        document.getElementById('wrapper').style.backgroundColor = '#009abc';
        img.src = "/img/cloud.png";
        img.style.width = "140px";
        img.style.height = "140px";
        document.getElementById('img').appendChild(img);
      }
      
      else {
        let img = document.createElement("IMG");

        ceu.innerText = "Céu muito nublado";
        document.getElementById('wrapper').style.backgroundColor = '#027b96';
        img.src = "/img/rain.png";
        img.style.width = "140px";
        img.style.height = "140px";
        document.getElementById('img').appendChild(img);
        document.getElementById('ceu').style.color = 'red';
        document.getElementById('avisoCeu').onclick = alertaClima;
      }
    })

    .catch((err) => {
      city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
      temp.innerText = `-`;
      return err;
    });
  }

function notificacao() {
  if (!("Notification" in window)) {
    alert("Seu navegador ou dispositivo não é compatível com essa funcionalidade");
  } else if (Notification.permission === "granted") {
    const notification = new Notification("Agora você receberá nossas notificações! ;)");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("Agora você receberá nossas notificações! ;)");
      }
    });
  }
}

function alertaClima(){
  window.location.assign("https://portal.inmet.gov.br/");
}
  
function recarregaPagina() {
  location.reload();
}