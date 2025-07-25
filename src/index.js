let clockElementsId = ["los-angeles", "sydney"];


const timeZoneMap = {
    'sydney': 'Australia/Sydney',
    'los-angeles': 'America/Los_Angeles',
    'london': 'Europe/London',
    'paris': 'Europe/Paris',
    'prague': 'Europe/Prague'
};

function updateTime(cityElement) {

    if (!cityElement) {
        console.warn(`Element not found.`);
        return;
    }

    const cityId = cityElement.id;

    const cityTimezone = timeZoneMap[cityId];

    let dateElement = cityElement.querySelector('.city-details .city-date');
    let timeElement = cityElement.querySelector('.city-time');

    if (!dateElement) {
        console.warn(`Missing .city-date or .city-time inside ${cityId}`);
        return;
    }

    let currentTime = moment().tz(cityTimezone).format(`h:mm:ss [<small>]A[</small>]`);
    let currentDate = moment().tz(cityTimezone).format(`MMMM Do YYYY`);


    dateElement.innerHTML = currentDate;
    timeElement.innerHTML = currentTime;
}

function updateAllClocks() {
    clockElementsId.forEach(clockId => {
        let cityElement = document.getElementById(clockId);
        updateTime(cityElement);
    });
}


function updateCity(event){
    let selectElement = event.target;
    const cityId = selectElement.value;

    if (clockElementsId.includes(cityId) && cityId.length > 0){
        const existingCity = document.getElementById(cityId);


        if(existingCity) {
            const prevHr = existingCity.previousElementSibling;
            if(prevHr && prevHr.tagName === "HR") {
                prevHr.remove();
            }
            existingCity.remove();
            clockElementsId = clockElementsId.filter(id => id !== cityId);
            console.log(clockElementsId);
        }
    }

    else {
        optionText = selectElement.options[selectElement.selectedIndex].text;
        console.log(optionText);
        addCity(cityId, optionText);
    }
}

function addCity(cityId, cityFullName) {
    const clockContainer = document.getElementById("city-container-wrapper");
    const template = document.getElementById('clock-template');
    const clonedCityNode = template.content.cloneNode(true);

    const cityContainer = clonedCityNode.querySelector('.city-container');


    cityContainer.id = cityId;
    cityContainer.dataset.timezone = timeZoneMap[cityId];
    cityContainer.querySelector('.city-name').innerHTML = cityFullName;

    const hr = document.createElement("hr");
    clockContainer.appendChild(hr);
    clockContainer.appendChild(cityContainer);

    console.log(cityId);
    clockElementsId.push(cityId);

    updateTime(cityContainer);
}


document.addEventListener('DOMContentLoaded', () => {
    updateAllClocks();
    document.getElementById('city-selector').addEventListener('change', updateCity);
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
});