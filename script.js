document.querySelector('.search').addEventListener('submit', async (event)=>{
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;
  
  if(input !== ''){
    clearInfo();
    caution('Loading..');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=30fe37185baa990dfca89ff8d14296ed&units=metric&lang=en`;
    
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod == 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temperature: json.main.temp,
        maxTemperature: json.main.temp_max,
        minTemperature: json.main.temp_min,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      })
    }else{
      clearInfo();
      caution('the location was not found!');
    }
  }else{
    clearInfo();
  }
});

function clearInfo(){
  caution('');
  document.querySelector('.result').style.display = 'none';
}

function showInfo(json){
  caution('');

  document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temperature}<sup>°C</sup>`;
  document.querySelector('.windInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.windDot').style.transform = `rotate(${json.windAngle-90}deg)`
  document.querySelector('.result').style.display = 'block';

}

function caution(msg){
  document.querySelector('.caution').innerHTML = msg;
}