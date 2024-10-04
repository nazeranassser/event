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
}
async function getAllEvents() {
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
async function getEvent(id) {
    try {
        const url = `http://localhost:3000/events/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const event = await response.json();
        // console.log(event);
        return event;
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
async function bookSeat(userId, eventId) {
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
        if(!isBooked){
            userRegisteredEvents.push(Number(eventId));
            let updatedDataUser = {"registeredEvents": userRegisteredEvents};
            updateUser(userId, updatedDataUser);
            eventAttendees.push(Number(userId));
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
async function UnBookSeat(userId, eventId){
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
           let newUserRegisteredEvents = deleteElement(userRegisteredEvents, Number(eventId) )
           let updatedDataUser = {"registeredEvents": newUserRegisteredEvents};
           updateUser(userId, updatedDataUser);
           let newEventAttendees = deleteElement(eventAttendees, Number(userId))
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
async function viewEvents(filter){
    let events;
    if(filter){
        events = await getFilteredEvents(filter);
    }else{
        events = await getAllEvents();
    }
    let box = document.getElementById("events-box");
    let newHTML = '';
    let bookBtn, isBooked;
    let timeArray, date,  time;
    let userInfo, userId;
    if(localStorage.getItem('isLoggedIn') == 'true'){
        userInfo = JSON.parse(localStorage.getItem('userInfo'));//
        userId = userInfo.id; //
    }

    
    for(let i = 0; i < events.length; i++){
        //extract time and date from date string
        timeArray = events[i].startTime.split('T');
        date = timeArray[0];
        time = timeArray[1];
        
        // console.log(userId +' '+ events[i].id);
        // console.log(isBooked);
        if(localStorage.getItem('isLoggedIn') == 'true'){
            isBooked = await bookedOrNot(Number(userId), Number(events[i].id));//
            if(isBooked == true){ //
                bookBtn = `<button class="booked-btn book-now-btn" onclick="UnBookSeat('${userId}',${events[i].id})">UnBook</button>`; //
            }else{////
                bookBtn = `<button class="book-now-btn" onclick="bookSeat('${userId}',${events[i].id})">Book</button>`;//
            } //
        }else{
            bookBtn = `<a href="login.html" class="btn card-btn">Book Now!</a>`;//
        }
        
        newHTML +=
        `<div class="newspaper-box">
                <img src="https://www.meydanfz.ae/wp-content/uploads/2021/10/Events.png" alt="Event Image" class="newspaper-img" />
                <h2 class="newspaper-title">${events[i].title} <span class="tags">#${events[i].category}</span></h2>
                <p class="newspaper-description">${events[i].description}</p>
                <div class="event-icons">
                    <p class="icon"><i class="fas fa-clock"></i> ${date} (${time})</p>
                    <p class="icon"><i class="fas fa-map-marker-alt"></i> ${events[i].location}</p> 
                    <p class="icon click-counter"><i class="fa-solid fa-chair"></i> Seats: ${events[i].bookedSeats}/${events[i].totalSeats}</p>
                </div>
                ${bookBtn}
            </div>`;

    }
    // console.log(events);
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
// (async () => {
//     console.log(await getFilteredEvents('Entertainment'))
//   })()


///////////////////