const searchInp = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const weatherDiv = document.getElementById('weather');

const thunderImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/baba772faa46d8382deeeb9733f294fb.png";
const drizzleImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/a55fef55bbeb0762a8dd329b4b8ad342.png";
const rainImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/4417bf88c7bbcd8e24fb78ee6479b362.png";
const snowImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/00171e3b54b97dee8c1a2f6a62272640.png";
const mistImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/d35bb25d12281cd9ee5ce78a98cd2aa7.png";
const clearImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/575900edccbc7def167f7874c02aeb0b.png";
const cloudImg = "https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/66117fab0f288a2867b340fa2fcde31b.png";

const apiCodes ={
    Thunder: [200,201,202,210,211,212,221,230,231,232],
    Drizzle: [300,301,302,310,311,312,313,314,321],
    Rain: [500,501,502,503,504,511,520,521,522,531],
    Snow:[600,601,602,611,612,613,615,616,620,621,622],
    Mist: [701,711,721,731,741,751,761,771,781],
    Clear: 800,
    Cloud: [801,802,803,804]    

}



async function getTemp(){
    let cityName = searchInp.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1de312eefbe68f2e6d01aab3b718e659&units=metric`);
    const weatherData = await response.json();
    //error handle
    if(weatherData.cod == 400 || weatherData.cod == 404){
        alert(weatherData.message);
    }
    if(weatherDiv.childElementCount > 1){
        weatherDiv.innerHTML="";
    }
    creation(weatherData);
    }

function creation(weatherData){
    let responseID = weatherData.weather[0].id;
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
    }
    weatherDiv.appendChild(currentTempImg);
    let currentTemp = document.createElement('div');
    currentTemp.setAttribute('id', 'current-temp');
    currentTemp.textContent=`${weatherData.main.temp}°C`;
    weatherDiv.appendChild(currentTemp);
}

function remove(){
    weatherDiv.innerHTML="";
}
searchBtn.addEventListener('click', getTemp);