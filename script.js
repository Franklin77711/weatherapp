const searchInp = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const weatherDiv = document.getElementById('weather');

const apiCodes ={
    Thunder: ['200','201','202','210','211','212','221','230','231','232'],
    Drizzle: ['300','301','302','310','311','312','313','314','321'],
    Rain: ['500','501','502','503','504','511','520','521','522','531'],
    Snow:['600','601','602','611','612','613','615','616','620','621','622'],
    Mist: ['701','711','721','731','741','751','761','771','781'],
    Clear: '800',
    Cloud: ['801','802','803','804']    

}



async function getTemp(){
    let cityName = searchInp.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1de312eefbe68f2e6d01aab3b718e659&units=metric`);
    const weatherData = await response.json();
    //error handle
    if(weatherData.cod == 400 || weatherData.cod == 404){
        alert(weatherData.message);
    }
    creation(weatherData);
}

function creation(weatherData){
    let currentTempImg = document.createElement('img');
    currentTempImg.setAttribute('id', 'current-img');
    currentTempImg.src="https://help.apple.com/assets/630670789D0ECE568E327B6C/6306707F9D0ECE568E327BA0/en_US/575900edccbc7def167f7874c02aeb0b.png";
    weatherDiv.appendChild(currentTempImg);
    let currentTemp = document.createElement('div');
    currentTemp.setAttribute('id', 'current-temp');
    currentTemp.textContent=`${weatherData.main.temp}°C`;
    weatherDiv.appendChild(currentTemp);
    
    
}

searchBtn.addEventListener('click', getTemp);