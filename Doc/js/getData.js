let isLogged = Boolean(localStorage.getItem('isLoggedIn'));
// console.log(`logged: ${isLogged}`);
function deleteElement(arr, value){ // return a new array without all elements with a specific value
    let newArray = []; 
    for(let i = 0; i<arr.length; i++){
        if(arr[i] != value){
            newArray.push(arr[i]);
        }
    }
    return newArray;
}
async function getUser(id) {
    try {
        const url = `http://localhost:3000/users/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const user = await response.json();
        // console.log(user);
        return user;
    } catch (error) {  
        console.error(error.message);
    }
}
async function getAllUsers() {
    try {
        const url = `http://localhost:3000/users`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const users = await response.json();
        // console.log(users);
        return users;
    } catch (error) {  
        console.error(error.message);
    }
}async function getAllEvents() {
    try {
        const url = `http://localhost:3000/events`;
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const events = await response.json();
        return events;
    } catch (error) {  
        console.error(error.message);
    }
}
async function getFilteredEvents(filterValue) {
    try {
        const url = `http://localhost:3000/events`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const events = await response.json();
        let filteredEvents = [];
        for(let i = 0; i < events.length; i++){ //filter the events by 
            if(events[i].category == filterValue){
                filteredEvents.push(events[i])
            }
        }
        return filteredEvents;
    } catch (error) {  
        console.error(error.message);
    }
}
function compareDates(biggerDate, smallerDate) {
    const date1 = new Date(biggerDate); // Declare with const/let
    const date2 = new Date(smallerDate);

    // Check if the first date is greater than or equal to the second one
    return date1 >= date2;
}
async function timeFilter(startDate, endDate) {
    try {
        const url = `http://localhost:3000/events`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const events = await response.json();
        let filteredEvents = [];

        const start = new Date(startDate); // Start date (passed as a parameter)
        const end = new Date(endDate); // End date (passed as a parameter)

        for (let i = 0; i < events.length; i++) {
            const eventTime = new Date(events[i].startTime); // Event start time as Date object

            // Check if eventTime is between startDate and endDate
            if (compareDates(eventTime, start) && compareDates(end, eventTime)) {
                filteredEvents.push(events[i]);
            }
        }

        return filteredEvents;
    } catch (error) {  
        console.error(error.message);
    }
}
async function getEvent(id) {
    try {
        const url = `http://localhost:3000/events`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const events = await response.json();
        // console.log(event);
        for(let i = 0; i < events.length; i++){
            if(events[i].id == id){
                return events[i];
            }
        }
    } catch (error) {  
        console.error(error.message);
    }
}
async function updateUser(id, updatedField) {
    try {
        const url = `http://localhost:3000/users/${id}`;
        const response = await fetch(url, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedField)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error(error.message);
    }
}
async function updateEvent(id, updatedField) {
    try {
        const url = `http://localhost:3000/events/${id}`;
        const response = await fetch(url, {
            method: "PATCH", // Use PATCH to update specific fields
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedField) // Send only the field(s) you want to update
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const updatedEvent = await response.json();
        return updatedEvent;
    } catch (error) {
        console.error(error.message);
    }
}
async function  bookedOrNot(userId, eventId) { //to check if user have booked the seat, if yes; return true, if no; return false. and if no user logged in will return 'notLogged'
    let isBooked;
    if(isLogged == true){
         //to check if the user is already book the event or nit
        let user = await getUser(userId);
        let event = await getEvent(eventId);
        if(user.registeredEvents.includes(eventId) == false || event.attendees.includes(userId) == false){
            isBooked = false;
        }else{
            isBooked = true;
        }
        return isBooked
    }else{
        console.log("please login first")
        return 'notLogged';
    }

}
async function checkAvailableSeats(eventId) {
    const event = await getEvent(eventId);
    let totalSeats = event.totalSeats;
    let bookedSeats = event.bookedSeats;
    let availableSeats = totalSeats - bookedSeats;
    return availableSeats;
}
async function bookSeat(userId, eventId) {
    let text = "Are you sure you want to book a seat at this event?";
    if (confirm(text) == true) {
        if(isLogged == true){
            //to check if the user is already book the event or nit
           let user = await getUser(userId);
           let userRegisteredEvents = user.registeredEvents;
           let event = await getEvent(eventId);
           let eventAttendees = event.attendees;
           let eventBookedSeats = event.bookedSeats;
           if(userRegisteredEvents.includes(eventId) == false && eventAttendees.includes(userId) == false){
               isBooked = false;
           }else{
               isBooked = true;
           }
           if(!isBooked){
               userRegisteredEvents.push(eventId);
               let updatedDataUser = {"registeredEvents": userRegisteredEvents};
               updateUser(userId, updatedDataUser);
               eventAttendees.push(userId);
               eventBookedSeats += 1;
               // console.log(eventAttendees);
               let updatedDataEvent = {
                   "attendees": eventAttendees,
                   "bookedSeats": eventBookedSeats
               };
               updateEvent(eventId, updatedDataEvent);
           }else{
              console.log("Already booked");
           }
       }else{
           console.log("please login first")
       }
    }    
}
async function UnBookSeat(userId, eventId){
    let text = "Are you sure you don't want to book a seat at this event?";
    if (confirm(text) == true) {
        if(isLogged == true){
            //to check if the user is already book the event or nit
        let user = await getUser(userId);
        let userRegisteredEvents = user.registeredEvents;
        let event = await getEvent(eventId);
        let eventAttendees = event.attendees;
        let eventBookedSeats = Number(event.bookedSeats);
        if(userRegisteredEvents.includes(eventId) == false && eventAttendees.includes(userId) == false){
            isBooked = false;
        }else{
            isBooked = true;
        }
        if(isBooked == true){
            let newUserRegisteredEvents = deleteElement(userRegisteredEvents, eventId )
            let updatedDataUser = {"registeredEvents": newUserRegisteredEvents};
            updateUser(userId, updatedDataUser);
            let newEventAttendees = deleteElement(eventAttendees, userId)
            console.log("eventBookedSeats before: " + eventBookedSeats);
            eventBookedSeats = eventBookedSeats - 1;
            console.log("eventBookedSeats after: " + eventBookedSeats);
            let updatedDataEvent = {
                "attendees": newEventAttendees,
                "bookedSeats": eventBookedSeats
            };
            updateEvent(eventId, updatedDataEvent);
        }else{
            console.log("Already Unbooked");
        }
    }else{
        console.log("please login first")
    }
    }
}
async function viewEvents(filter, filterDate) {
    let events;
    // check if there is a filter, then apply it
    if (filter) {
        events = await getFilteredEvents(filter);
    } else if (filterDate) {
        // Set the startDate to filterDate
        const startDate = new Date(filterDate);
        
        // Set the endDate to 3 days from the filterDate
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 3);
        
        // Call the timeFilter function with startDate and endDate
        events = await timeFilter(startDate, endDate);
        console.log("Filtered by time range");
    } else {
        events = await getAllEvents();
    }

    let box = document.getElementById("events-box");
    let newHTML = '';
    let bookBtn, isBooked;
    let timeArray, date, time;
    let userInfo, userId, availableSeats;

    if (localStorage.getItem('isLoggedIn') == 'true') {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userId = userInfo.id;
    }

    for (let i = 0; i < events.length; i++) { //events loop
        // Extract time and date from the date string
        timeArray = events[i].startTime.split('T');
        date = timeArray[0];
        time = timeArray[1];
        // Add action buttons according of different situations
        if (localStorage.getItem('isLoggedIn') == 'true') { // if logged in then:
            availableSeats = await checkAvailableSeats(events[i].id); // check the number of available seets
            if(availableSeats > 0){ // if there are available seets: 
                isBooked = await bookedOrNot(userId, events[i].id);
                if (isBooked == true) { // if there are available seets and the user have booked a seet
                    bookBtn = `<button class="booked-btn book-now-btn" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                } else {    // if there are available seets and the user DID NOT booke a seet
                    bookBtn = `<button class="book-now-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="return bookSeat('${userId}','${events[i].id}')">Book</button>`;
                }
            }else if(isBooked != true){ // if there are NO available seets and the user DID NOT book a seet
                bookBtn = `<button class="no-seats-btn book-now-btn disabled">Seats ran out</button>`;
            }else{ // if there are No available seets and the user have booked a seet
                bookBtn = `<button class="booked-btn book-now-btn" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                console.log(isBooked);

            }
            
        } else { // if not logged in then:
            bookBtn = `<a href="login.html" class="btn card-btn">Book Now!</a>`;
        }

        newHTML += `
        <div class="newspaper-box">
            <img src="./assets/img/events/${events[i].image}" alt="Event Image" class="newspaper-img" />
            <h2 class="newspaper-title">${events[i].title} <span class="tags">#${events[i].category}</span></h2>
            <p class="newspaper-description">${events[i].description}</p>
            <div class="event-icons">
                <p class="icon"><i class="fas fa-clock"></i> ${date} (${time})</p>
                <p class="icon"><i class="fas fa-map-marker-alt"></i> ${events[i].location}</p>
                <p class="icon click-counter"><i class="fa-solid fa-chair"></i> Seats: ${events[i].bookedSeats}/${events[i].totalSeats} (${availableSeats} available)</p>
            </div>
            ${bookBtn}
        </div>`;
    }

    box.innerHTML = newHTML;
}


///////// Add filtration to the page
document.getElementById("all-filter-btn").onclick = function() {viewEvents()};
document.getElementById("charity-filter-btn").onclick = function() {viewEvents('charity')}
document.getElementById("technology-filter-btn").onclick = function() { viewEvents('Technology')};
document.getElementById("business-filter-btn").onclick = function() { viewEvents('Business')};
document.getElementById("food-filter-btn").onclick = function() { viewEvents('food')};
document.getElementById("cultural-filter-btn").onclick = function() { viewEvents('cultural')};
document.getElementById("sport-filter-btn").onclick = function() { viewEvents('sport')};
document.getElementById("games-filter-btn").onclick = function() { viewEvents('games')};
// document.getElementById("body").onload = function() {viewEvents()};




//////////////
//////////// testing area
// getAllEvents()
(async () => {
    // console.log(await getFilteredEvents('Entertainment'))
    // console.log(await timeFilter('2024-11-04T03:39'));
    // console.log(await checkAvailableSeats(3));

  })()



///////////////////