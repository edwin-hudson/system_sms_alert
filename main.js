const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

const message = selectBtn.querySelector('span'),
date = Math.floor(Date.now());

// array of countries
let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan", "Brazil", "Canada", "China", "Colombia", "Cuba", "Denmark", "Egypt", "Ethiopia", "Finland", "France", "Ghana","Germany", "Greece", "Greenland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Kenya", "Korea", "Mexico", "Morocco", "Niger", "Netherlands", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "Vietnam"];


function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        
        // if selected country and country value is same then add selected class
        let isSelected = country == selectedCountry ? "selected" : "";
        
        // adding each country inside li and inserting all li inside drop-down
        let li = `<li onclick = "updateName(this)" class = "${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.toggle("active")
    selectBtn.firstElementChild.innerHTML = selectedLi.innerText;

    showNotification();
    sendSMS()
}

searchInp.addEventListener("keyup", () => {
    
    let arr = []; //creating empty array
    let searchedVal = searchInp.value.toLowerCase();
    
    // returning all countries from array which start with user searchd value 
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchedVal);

    }).map(data => `<li onclick = "updateName(this)">${data}</li>`).join(""); // mapping returned country with li and joining them
    options.innerHTML = arr ? arr : `<p>Oops! Country not found </p>`;
});


selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active")
    searchInp.focus();
});






// System Notification 
if (Notification.permission === "granted") {
    showNotification();
    
}else if(Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showNotification();
        }
    });
}

function showNotification() {
    
    if (message.innerText !== "Select Country") {

        const noTitle = "New Notification from THE EVENT";
        const noBody = message.innerText + " is set as your default country. ";
        const noIcon = "image/img.jpg";
        const noImage = "image/image2.png";

        const notification = new Notification(noTitle, {
            body: noBody,
            icon: noIcon,
            image: noImage,
            silent: false,
            requireInteraction: false

        });
    
        notification.onclick = (e) => {
            window.location.href = "https://infotechhims.com/#/login";
            };
    }

    
}



// Wigal SMS 

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("API-KEY", "$2y$10$U65MHBhiTKSj0ONmRMvokecwcCUachUYow6Gn4Z.7KXjO.dBBoGJG");
myHeaders.append("USERNAME", "edwin hudson");

const raw = JSON.stringify({
    "senderid": "THE EVENT",
    "destinations": [
        {
            "destination": "0241325284",
            "message": "This is a sample message for SMS sending via FrogAPI.",
            "msgid": "MGS1010101",
            "smstype": "text"
        }
    ]
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

function sendSMS() {
    fetch("https://frogapi.wigal.com.gh/api/v3/sms/send", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }


