function updateTime(timeZoneName) {

    //the input should be lowercase
    let cityNameText = timeZoneName.replace(/\w+\//gm, "").replace(/_/g, "-").toLowerCase();

    let cityElement = document.getElementById(cityNameText);
    let dateElement = cityElement.querySelector('.city-date');
    let timeElement = cityElement.querySelector('.city-time');

    let currentTime = moment().tz(timeZoneName).format(`h:mm:ss [<small>]A[<small>]`);
    let currentDate = moment().tz(timeZoneName).format(`MMMM Do YYYY`);


    dateElement.innerHTML = currentDate;
    timeElement.innerHTML = currentTime;
}

function updateAllClocks(timeZoneArray) {
    timeZoneArray.forEach(tz => {
        updateTime(tz);
    })
}

let timeZoneArray = ["America/Los_Angeles", "Australia/Sydney"];

updateAllClocks(timeZoneArray);

setInterval(() => updateAllClocks(timeZoneArray), 1000);
