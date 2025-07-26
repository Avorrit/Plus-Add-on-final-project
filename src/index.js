
const defaultClockID = ["current", "los-angeles", "sydney"];
let clockElementsId = ["current", "los-angeles", "sydney"];


const timeZoneMap = {
    'sydney': 'Australia/Sydney',
    'los-angeles': 'America/Los_Angeles',
    'london': 'Europe/London',
    'paris': 'Europe/Paris',
    'prague': 'Europe/Prague'
};

function updateCurrentTime(){
    const currentElement = document.getElementById("current");
    const timezone = moment.tz.guess();

    let currentCityName = timezone.split("/")[1].replace("_", " ");
    console.log(currentCityName);

    let currentDate = moment().tz(timezone).format("MMMM Do YYYY");
    let currentTime = moment().tz(timezone).format(`h:mm:ss [<small>]A[</small>]`);

    let nameElement = currentElement.querySelector(".city-name");
    let timeElement = currentElement.querySelector(".city-time");
    let dateElement = currentElement.querySelector(".city-date");


    nameElement.innerHTML = currentCityName;
    timeElement.innerHTML = currentTime;
    dateElement.innerHTML = currentDate;
}

function updateTime(cityElement) {

    if (!cityElement) {
        console.warn(`Element not found.`);
        return;
    }

    const cityId = cityElement.id;
    let cityTimezone = timeZoneMap[cityId];


    if (cityId === "current") {
        updateCurrentTime();
        return;
    }


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

    if (!clockElementsId.includes(cityId) && cityId.length > 0){
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

function resetClockContainer(){
    clockElementsId.forEach(clockId => {
        if (!defaultClockID.includes(clockId)) {
            const element = document.getElementById(clockId);

            if (element) {
                const previousHr = element.previousElementSibling;
                if (previousHr && previousHr.tagName === "HR") {
                    previousHr.remove();
                }

                element.remove();
            }
        }
    });

    clockElementsId = defaultClockID.slice();
}

function toggleDarkMode(){
    document.body.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    updateAllClocks();
    document.getElementById('city-selector').addEventListener('change', updateCity);
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
});

let darkModeBtn = document.querySelector('#dark-mode-btn');
darkModeBtn.addEventListener("click", toggleDarkMode);

let resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener("click", resetClockContainer);
