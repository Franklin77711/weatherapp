window.onload = function() {
    changeBgImg();
  };

const searchInp = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const weatherDiv = document.getElementById('weather');
const forcastDiv = document.getElementById('forcast');

const thunderImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/baba772faa46d8382deeeb9733f294fb.png";
const drizzleImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/a55fef55bbeb0762a8dd329b4b8ad342.png";
const rainImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/4417bf88c7bbcd8e24fb78ee6479b362.png";
const snowImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/00171e3b54b97dee8c1a2f6a62272640.png";
const mistImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/d35bb25d12281cd9ee5ce78a98cd2aa7.png";
const clearImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/575900edccbc7def167f7874c02aeb0b.png";
const cloudImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/66117fab0f288a2867b340fa2fcde31b.png";
const halfCloudImg = "https://help.apple.com/assets/634D939C5E97521C571D4A74/634D93BB5E97521C571D4AAB/en_US/67aaf9dbe30989c25cbde6c6ec099213.png"

const apiCodes ={
    Thunder: [200,201,202,210,211,212,221,230,231,232],
    Drizzle: [300,301,302,310,311,312,313,314,321],
    Rain: [500,501,502,503,504,511,520,521,522,531],
    Snow:[600,601,602,611,612,613,615,616,620,621,622],
    Mist: [701,711,721,731,741,751,761,771,781],
    Clear: 800,
    Cloud: [801,802,804],
    HalfCloud: 803

}

// current 
async function getTemp(){
    let cityName = searchInp.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1de312eefbe68f2e6d01aab3b718e659&units=metric`);
    const weatherData = await response.json();
    if(weatherDiv.childElementCount > 1){
        weatherDiv.innerHTML="";
        forcastDiv.innerHTML="";
    }
    //error handle
    if(weatherData.cod == 400 || weatherData.cod == 404){
        alert(weatherData.message);
    }else{
        creationMain(weatherData);
        searchInp.value = '';
    }
    }


function creationMain(weatherData){
    let cityName = document.createElement('div');
    cityName.setAttribute('id', 'city-name');

    let lowCityName = searchInp.value;
    cityName.textContent = `${weatherData.sys.country}, ${lowCityName.charAt(0).toUpperCase() + lowCityName.slice(1)}`;
    weatherDiv.appendChild(cityName);

    let weatherImg = choosePic(weatherData.weather[0].id)
    weatherDiv.appendChild(weatherImg);

    let currentTemp = document.createElement('div');
    currentTemp.setAttribute('id', 'current-temp');
    currentTemp.textContent = `${Math.round(weatherData.main.temp)} °C`;
    weatherDiv.appendChild(currentTemp);

    let feelTmp = document.createElement('div');
    feelTmp.setAttribute('id', 'feels-like');
    feelTmp.textContent = `Feels like: ${Math.round(weatherData.main.feels_like)} °C`;
    weatherDiv.appendChild(feelTmp);

    let systemBtn = document.createElement('button');
    systemBtn.setAttribute('id', 'system');
    systemBtn.textContent = "Use Fahrenheit";
    weatherDiv.appendChild(systemBtn);

    systemBtn.addEventListener('click', convertSystem.bind(null, Math.round(weatherData.main.temp), Math.round(weatherData.main.feels_like), currentTemp, feelTmp, systemBtn));
}

function choosePic(respID){
    let responseID = respID
    let currentTempImg = document.createElement('img');
    currentTempImg.setAttribute('id', 'current-img');
    if(apiCodes.Rain.includes(responseID)){
        currentTempImg.src = rainImg;
    }else if(apiCodes.Thunder.includes(responseID)){
        currentTempImg.src = thunderImg;
    }else if(apiCodes.Drizzle.includes(responseID)){
        currentTempImg.src = drizzleImg;
    }else if(apiCodes.Snow.includes(responseID)){
        currentTempImg.src = snowImg;
    }else if(apiCodes.Mist.includes(responseID)){
        currentTempImg.src = mistImg;
    }else if(apiCodes.Cloud.includes(responseID)){
        currentTempImg.src = cloudImg;
    }else if(apiCodes.Clear == responseID){
        currentTempImg.src = clearImg;
    }else if(apiCodes.HalfCloud == responseID){
        currentTempImg.src = halfCloudImg;
    }

    return currentTempImg
}


function convertSystem(tempNum,feelNum, curTmp, feel, btn){
    let feelInCel = feelNum;
    let feelInFar = Math.round((feelNum * 1.8) + 32);
    let tempInCel = tempNum;
    let tempInFar = Math.round((tempNum * 1.8) + 32);
    if(curTmp.textContent.includes("°C")){
        curTmp.textContent = `${tempInFar} °F`;
        feel.textContent = `Feels like: ${feelInFar} °F`;
        btn.textContent = "Use Celsius";
    }else if(curTmp.textContent.includes("°F")){ 
        curTmp.textContent = `${tempInCel} °C`;
        feel.textContent = `Feels like: ${feelInCel} °C`;
        btn.textContent = "Use Fahrenheit";
    }
    const temps = document.querySelectorAll('.forcast-temp');
    for(let temp of temps){
        let forTempNum = temp.textContent.split(" ");
    if(temp.textContent.includes("°C")){
        temp.textContent = `${Math.round((forTempNum[0] * 1.8) + 32)} °F`;
    }else if(temp.textContent.includes("°F")){ 
        temp.textContent = `${Math.round((forTempNum[0] - 32) * 5 / 9)} °C`;
    }
}
}

function remove(){
    weatherDiv.innerHTML="";
    forcastDiv.innerHTML="";
}
searchBtn.addEventListener('click', renderAll);
searchInp.addEventListener('keypress', ()=>{
    if(event.key == "Enter"){
        searchBtn.click();
    }
});


//forcast
async function getForcast(){
  //  let cityName = searchInp.value;
    const forResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInp.value}&appid=cacda985ba1188b608fba471944685ef&units=metric`);
    const forWeatherData = await forResponse.json();
    let creationResult = creationForcast(forWeatherData)
    return creationResult;
}

function creationForcast(forData){
    currDate = currentDate();
    jsonArray = forData.list;
    myForArray = []
    //loop the json data
    for (let element of jsonArray) {
        if(!element.dt_txt.includes(currDate[0])){
            myForArray.push(element);
        }
    }
    //loop myForArray to sort temperature by day
    let sortedTemper = [[], [], [], [], []];
    for(let temper of myForArray){
        if(temper.dt_txt.includes(currDate[1])){
            sortedTemper[0].push(temper.main.temp)
        }else if(temper.dt_txt.includes(currDate[2])){
            sortedTemper[1].push(temper.main.temp)
        }else if(temper.dt_txt.includes(currDate[3])){
            sortedTemper[2].push(temper.main.temp)
        }else if(temper.dt_txt.includes(currDate[4])){
            sortedTemper[3].push(temper.main.temp)
        }else if(temper.dt_txt.includes(currDate[5])){
            sortedTemper[4].push(temper.main.temp)
        }
    }
    //loop to sorted array to get the avarage temperature by day
    let avarageTmp = []
    for(let temperByDay of sortedTemper){
        let average = Math.round(temperByDay.reduce((a, b) => a + b, 0) / temperByDay.length);
        avarageTmp.push(average)
    }
    //loop to get the response codes
    let codeAndDate = []
    for(let code of jsonArray){
        if(!code.dt_txt.includes(currDate[0])){
            codeAndDate.push([code.dt_txt ,code.weather[0].id])
        }
    }
    //group the codes by day
    let codesGrouped = [[],[],[],[],[]];
    for(let group of codeAndDate){
        if(group[0].includes(currDate[1])){
            codesGrouped[0].push(group[1])
        }else if(group[0].includes(currDate[2])){
            codesGrouped[1].push(group[1])
        }else if(group[0].includes(currDate[3])){
            codesGrouped[2].push(group[1])
        }else if(group[0].includes(currDate[4])){
            codesGrouped[3].push(group[1])
        }else if(group[0].includes(currDate[5])){
            codesGrouped[4].push(group[1])
        }
    }
    //get the top code
    let codeForImg = [];
    for(let code of codesGrouped){
        codeForImg.push(code.splice(Math.floor((code.length-1) / 2), 1)[0])
    }
    return [avarageTmp, codeForImg]
}
function currentDate(){
    const date = new Date();

    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let day1 = date.getDate() +1;
    if (day1 < 10) {
        day1 = `0${day1}`;
    }
    let day2 = date.getDate() +2;
    if (day2 < 10) {
        day2 = `0${day2}`;
    }
    let day3 = date.getDate() +3;
    if (day3 < 10) {
        day3 = `0${day2}`;
    }
    let day4 = date.getDate() +4;
    if (day4 < 10) {
        day4 = `0${day2}`;
    }
    let day5 = date.getDate() +5;
    if (day5 < 10) {
        day5 = `0${day5}`;
    }
    let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
    let year = date.getFullYear();
    
    let currDate = `${year}-${month}-${day}`
    let currDate1 = `${year}-${month}-${day1}`
    let currDate2 = `${year}-${month}-${day2}`
    let currDate3 = `${year}-${month}-${day3}`
    let currDate4 = `${year}-${month}-${day4}`
    let currDate5 = `${year}-${month}-${day5}`
   return [currDate, currDate1, currDate2, currDate3, currDate4, currDate5] 
}
function getDays(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday","Monday","Tuesday","Wednesday"];

    const d = new Date();
    let day1 = weekday[d.getDay() + 1];
    let day2 = weekday[d.getDay() + 2];
    let day3 = weekday[d.getDay() + 3];
    let day4 = weekday[d.getDay() + 4];

    return [day1, day2, day3, day4]
}

async function renderForcast(){

    let days =  getDays();
    let forcast = await getForcast();

    
    days.forEach((day, codes) => {

        let temper = forcast[0][codes];
        let code = forcast[1][codes];

            let forcastDayDiv = document.createElement('div');
                forcastDayDiv.setAttribute('class', 'day-cast nextday');
                forcastDiv.appendChild(forcastDayDiv);
                

            let forcastDay = document.createElement('p');
                forcastDay.setAttribute('class', 'forcast-day')
                forcastDay.textContent = day; 
                forcastDayDiv.appendChild(forcastDay);
               
            let forcastDayTemp = document.createElement('p');
                forcastDayTemp.setAttribute('class', 'forcast-temp')
                forcastDayTemp.textContent = `${temper} °C`;
                forcastDayDiv.appendChild(forcastDayTemp);
           
                    let forcastDayImg = document.createElement('img');
                    
                    if(apiCodes.Rain.includes(code)){
                        forcastDayImg.src = rainImg;
                    }else if(apiCodes.Thunder.includes(code)){
                        forcastDayImg.src = thunderImg;
                    }else if(apiCodes.Drizzle.includes(code)){
                        forcastDayImg.src = drizzleImg;
                    }else if(apiCodes.Snow.includes(code)){
                        forcastDayImg.src = snowImg;
                    }else if(apiCodes.Mist.includes(code)){
                        forcastDayImg.src = mistImg;
                    }else if(apiCodes.Cloud.includes(code)){
                        forcastDayImg.src = cloudImg;
                    }else if(apiCodes.Clear == code){
                        forcastDayImg.src = clearImg;
                    }else if(apiCodes.HalfCloud == code){
                        forcastDayImg.src = halfCloudImg;
                    }
                    forcastDayDiv.appendChild(forcastDayImg);
                })          
    }

function changeBgImg(){
    let date = new Date();
    let hour = date.getHours();
    if(hour >= 0 && hour <=7){
        document.body.style.backgroundImage =  'url("https://wallpaperaccess.com/full/1213388.jpg")'
    }else if(hour > 7 && hour <= 21){
        document.body.style.backgroundImage =  'url("https://wallpaperaccess.com/full/1672044.jpg")'
    }else{
        document.body.style.backgroundImage =  'url("https://wallpaperaccess.com/full/1213388.jpg")'
    }
}

function renderAll(){
    getTemp();
    renderForcast();
}