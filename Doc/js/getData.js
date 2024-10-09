// // Check if the user is logged in
// const isLogged = Boolean(localStorage.getItem('isLoggedIn'));

// // Utility function to remove all instances of a specific value from an array
// const removeElement = (arr, value) => arr.filter(item => item !== value);

// // Fetch a single user by ID
// const getUser = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`);
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Fetch all users
// const getAllUsers = async () => {
//     try {
//         const response = await fetch(`http://localhost:3000/users`);
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Fetch all events
// const getAllEvents = async () => {
//     try {
//         const response = await fetch(`http://localhost:3000/events`);
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Fetch filtered events based on category
// const getFilteredEvents = async (category) => {
//     try {
//         const response = await fetch(`http://localhost:3000/events`);
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         const events = await response.json();
//         return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Compare two dates
// const compareDates = (date1, date2) => new Date(date1) >= new Date(date2);

// // Filter events within a specific time range
// const timeFilter = async (startDate, endDate) => {
//     try {
//         const events = await getAllEvents();
//         return events.filter(event => {
//             const eventTime = new Date(event.startTime);
//             return eventTime >= startDate && eventTime <= endDate;
//         });
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Fetch a single event by ID
// const getEvent = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/events/${id}`);
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Update a user's information
// const updateUser = async (id, updatedFields) => {
//     try {
//         const response = await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedFields)
//         });
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Update an event's information
// const updateEvent = async (id, updatedFields) => {
//     try {
//         const response = await fetch(`http://localhost:3000/events/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedFields)
//         });
//         if (!response.ok) throw new Error(`Response status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Delete an event by ID
// const deleteEvent = async (id) => {
//     if (confirm("Are you sure you want to delete this event?")) {
//         try {
//             const response = await fetch(`http://localhost:3000/events/${id}`, {
//                 method: "DELETE",
//             });
//             if (!response.ok) throw new Error(`Response status: ${response.status}`);
//             // Optionally, refresh the events list after deletion
//             viewEvents();
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
// };

// // Check if a user has booked an event
// const isBooked = async (userId, eventId) => {
//     if (!isLogged) {
//         console.log("Please log in first.");
//         return 'notLogged';
//     }

//     try {
//         const [user, event] = await Promise.all([getUser(userId), getEvent(eventId)]);
//         const userHasBooked = user.registeredEvents.includes(eventId);
//         const eventHasAttendee = event.attendees.includes(userId);
//         return userHasBooked && eventHasAttendee;
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Check available seats for an event
// const checkAvailableSeats = async (eventId) => {
//     const event = await getEvent(eventId);
//     return event.totalSeats - event.bookedSeats;
// };

// // Book a seat for a user at an event
// const bookSeat = async (userId, eventId) => {
//     if (!isLogged) {
//         console.log("Please log in first.");
//         return;
//     }

//     if (confirm("Are you sure you want to book a seat at this event?")) {
//         try {
//             const [user, event] = await Promise.all([getUser(userId), getEvent(eventId)]);
//             const alreadyBooked = user.registeredEvents.includes(eventId) && event.attendees.includes(userId);

//             if (!alreadyBooked) {
//                 // Update user
//                 const updatedUser = {
//                     registeredEvents: [...user.registeredEvents, eventId]
//                 };
//                 await updateUser(userId, updatedUser);

//                 // Update event
//                 const updatedEvent = {
//                     attendees: [...event.attendees, userId],
//                     bookedSeats: event.bookedSeats + 1
//                 };
//                 await updateEvent(eventId, updatedEvent);

//                 console.log("Seat booked successfully.");
//             } else {
//                 console.log("Already booked.");
//             }
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
// };

// // Unbook a seat for a user at an event
// const unbookSeat = async (userId, eventId) => {
//     if (!isLogged) {
//         console.log("Please log in first.");
//         return;
//     }

//     if (confirm("Are you sure you want to unbook this event?")) {
//         try {
//             const [user, event] = await Promise.all([getUser(userId), getEvent(eventId)]);
//             const isBooked = user.registeredEvents.includes(eventId) && event.attendees.includes(userId);

//             if (isBooked) {
//                 // Update user
//                 const updatedUser = {
//                     registeredEvents: removeElement(user.registeredEvents, eventId)
//                 };
//                 await updateUser(userId, updatedUser);

//                 // Update event
//                 const updatedEvent = {
//                     attendees: removeElement(event.attendees, userId),
//                     bookedSeats: event.bookedSeats - 1
//                 };
//                 await updateEvent(eventId, updatedEvent);

//                 console.log("Seat unbooked successfully.");
//             } else {
//                 console.log("Not booked yet.");
//             }
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
// };

// // Display events on the page with optional filtering
// const viewEvents = async (filter = null, filterDate = null) => {
//     try {
//         let events;

//         if (filter) {
//             events = await getFilteredEvents(filter);
//         } else if (filterDate) {
//             const startDate = new Date(filterDate);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + 7);
//             events = await timeFilter(startDate, endDate);
//             console.log("Filtered by time range.");
//         } else {
//             events = await getAllEvents();
//         }

//         const eventsBox = document.getElementById("events-box");
//         let htmlContent = '';

//         const userInfo = isLogged ? JSON.parse(localStorage.getItem('userInfo')) : null;
//         const userId = userInfo?.id || null;

//         for (const [index, event] of events.entries()) {
//             const [date, time] = event.startTime.split('T');
//             const isOwner = isLogged && event.organizer === userId;
//             let bookBtn = '';

//             if (isLogged) {
//                 if (compareDates(event.startTime, Date.now())) {
//                     const availableSeats = await checkAvailableSeats(event.id);

//                     if (availableSeats > 0) {
//                         const booked = await isBooked(userId, event.id);

//                         if (booked === true) {
//                             bookBtn = `<button class="btn btn-danger" onclick="unbookSeat('${userId}', '${event.id}')">Unbook</button>`;
//                         } else if (booked === 'notLogged') {
//                             bookBtn = `<a href="login.html" class="btn btn-primary">Book Now!</a>`;
//                         } else {
//                             bookBtn = `<button class="btn btn-primary" onclick="bookSeat('${userId}', '${event.id}')">Book</button>`;
//                         }
//                     } else {
//                         bookBtn = `<button class="btn btn-secondary disabled">Seats ran out</button>`;
//                     }
//                 } else {
//                     bookBtn = `<button class="btn btn-secondary disabled">Date passed</button>`;
//                 }

//                 if (isOwner) {
//                     bookBtn = `<button class="btn btn-danger" onclick="deleteEvent('${event.id}')">Delete Event</button>`;
//                 }
//             } else {
//                 bookBtn = `<a href="login.html" class="btn btn-primary">Book Now!</a>`;
//             }

//             htmlContent += `
//                 <div class="newspaper-box">
//                     <img src="./assets/img/events/${event.image}" alt="Event Image" class="newspaper-img img-fluid" />
//                     <h2 class="newspaper-title">
//                         ${event.title} 
//                         <span class="tags">#${event.category}</span>
//                     </h2>
//                     <p class="newspaper-description" id="description-${index}" style="max-height: 3.6em; overflow: hidden;">
//                         ${event.description}
//                         <span id="more-${index}" style="display: none;"></span>
//                     </p>
//                     <i class="fas fa-chevron-down toggle-description" onclick="toggleDescription(${index})"></i>
//                     <div class="event-icons">
//                         <p class="icon"><i class="fas fa-clock"></i> ${date} (${time})</p>
//                         <p class="icon"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
//                         <p class="icon"><i class="fa-solid fa-chair"></i> Seats: ${event.bookedSeats}/${event.totalSeats}</p>
//                     </div>
//                     ${bookBtn}
//                 </div>`;
//         }

//         eventsBox.innerHTML = htmlContent;
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// // Toggle the full description of an event
// const toggleDescription = (index) => {
//     const description = document.getElementById(`description-${index}`);
//     const moreText = document.getElementById(`more-${index}`);
//     const toggleIcon = description.nextElementSibling;

//     if (description.style.maxHeight) {
//         description.style.maxHeight = null;
//         moreText.style.display = "none";
//         toggleIcon.classList.remove('expanded');
//     } else {
//         description.style.maxHeight = description.scrollHeight + "px";
//         moreText.style.display = "inline";
//         toggleIcon.classList.add('expanded');
//     }
// };

// // Event listeners for filter buttons
// document.getElementById("all-filter-btn").addEventListener("click", () => viewEvents());
// document.getElementById("charity-filter-btn").addEventListener("click", () => viewEvents('charity'));
// document.getElementById("technology-filter-btn").addEventListener("click", () => viewEvents('Technology'));
// document.getElementById("business-filter-btn").addEventListener("click", () => viewEvents('Business'));
// document.getElementById("food-filter-btn").addEventListener("click", () => viewEvents('food'));
// document.getElementById("cultural-filter-btn").addEventListener("click", () => viewEvents('cultural'));
// document.getElementById("sport-filter-btn").addEventListener("click", () => viewEvents('sport'));
// document.getElementById("games-filter-btn").addEventListener("click", () => viewEvents('games'));

// // Initialize the events view on page load
// window.addEventListener("DOMContentLoaded", () => viewEvents());

 




























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
async function deleteEvent(id) {
    let text = "Are you sure you want to delete this event?";
    if (confirm(text) == true) {
        try {
            const url = `http://localhost:3000/events/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
        }
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
/*
async function viewEvents(filter, filterDate) {
    let events;
    // check if there is a filter, then apply it
    if (filter) {
        events = await getFilteredEvents(filter);
    } else if (filterDate) {
        // Set the startDate to filterDate
        const startDate = new Date(filterDate);
        
        // Set the endDate to 7 days from the filterDate
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7);
        
        // Call the timeFilter function with startDate and endDate
        events = await timeFilter(startDate, endDate);
        console.log("Filtered by time range");
    } else {
        events = await getAllEvents();
    }

    const box = document.getElementById("events-box");
    let newHTML = '';
    let bookBtn, isBooked;
    let timeArray, date, time;
    let userInfo, userId, availableSeats;

    if (localStorage.getItem('isLoggedIn') === 'true') {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userId = userInfo.id;
    }

    // Loop through events
    for (let i = 0; i < events.length; i++) {
        timeArray = events[i].startTime.split('T');
        date = timeArray[0];
        time = timeArray[1];


        if (localStorage.getItem('isLoggedIn') === 'true') {  
            if (compareDates(events[i].startTime, Date.now())) { 
                availableSeats = await checkAvailableSeats(events[i].id);  

                if (availableSeats > 0) { 
                    isBooked = await bookedOrNot(userId, events[i].id);  

                    if (isBooked) {  
                        bookBtn = `<button class="booked-btn book-now-btn" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                    } else {
                        bookBtn = `<button class="book-now-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="return bookSeat('${userId}','${events[i].id}')">Book</button>`;
                    }
                } else if (!isBooked) {
                    bookBtn = `<button class="no-seats-btn book-now-btn disabled">Seats ran out</button>`;
                } else {
                    bookBtn = `<button class="booked-btn book-now-btn" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                }
            } else {
                bookBtn = `<button class="no-seats-btn book-now-btn disabled">Date passed</button>`;
            }
        } else {
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
                <p class="icon click-counter"><i class="fa-solid fa-chair"></i> Seats: ${events[i].bookedSeats}/${events[i].totalSeats}</p>
            </div>
            ${bookBtn}
        </div>`;
    }

    box.innerHTML = newHTML;
}
    */
async function viewEvents(filter, filterDate) {
    let events;

    // Check if there is a filter, then apply it
    if (filter) {
        events = await getFilteredEvents(filter);
    } else if (filterDate) {
        const startDate = new Date(filterDate);
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7);
        
        events = await timeFilter(startDate, endDate);
        console.log("Filtered by time range");
    } else {
        events = await getAllEvents();
    }

    const box = document.getElementById("events-box");
    let newHTML = '';
    let bookBtn, isBooked;
    let timeArray, date, time;
    let userInfo, userId, availableSeats, isOwner;

    // Parse user information only once
    if (localStorage.getItem('isLoggedIn') === 'true') {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userId = userInfo.id;
    }

    // Loop through events
    for (let i = 0; i < events.length; i++) {
        timeArray = events[i].startTime.split('T');
        date = timeArray[0];
        time = timeArray[1];

        isOwner = events[i].organizer === userId;

        if (localStorage.getItem('isLoggedIn') === 'true') {
            if (compareDates(events[i].startTime, Date.now())) {
                availableSeats = await checkAvailableSeats(events[i].id);

                if (availableSeats > 0) {
                    isBooked = await bookedOrNot(userId, events[i].id);

                    if (isBooked) {
                        bookBtn = `<button class="btn btn-danger" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                    } else {
                        bookBtn = `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="return bookSeat('${userId}','${events[i].id}')">Book</button>`;
                    }
                } else if (!isBooked) {
                    bookBtn = `<button class="btn btn-secondary disabled">Seats ran out</button>`;
                } else {
                    bookBtn = `<button class="btn btn-danger" onclick="UnBookSeat('${userId}','${events[i].id}')">UnBook</button>`;
                }
            } else {
                bookBtn = `<button class="btn btn-secondary disabled">Date passed</button>`;
            }

            if (isOwner) {
                bookBtn = `<button class="btn btn-danger" onclick="deleteEvent('${events[i].id}')">Delete Event</button>`;
            }
        } else {
            bookBtn = `<a href="login.html" class="btn btn-primary">Book Now!</a>`;
        }

        newHTML += `
        <div class="newspaper-box">
            <img src="./assets/img/events/${events[i].image}" alt="Event Image" class="newspaper-img img-fluid" />
            <h2 class="newspaper-title">${events[i].title} <span class="tags">#${events[i].category}</span></h2>
            <p class="newspaper-description" id="description-${i}" style="max-height: 3.6em; overflow: hidden;">
                ${events[i].description}
                <span id="more-${i}" style="display: none;"> </span>
            </p>
            <i class="fas fa-chevron-down toggle-description" onclick="toggleDescription(${i})"></i>
            <div class="event-icons">
                <p class="icon"><i class="fas fa-clock"></i> ${date} (${time})</p>
                <p class="icon"><i class="fas fa-map-marker-alt"></i> ${events[i].location}</p>
                <p class="icon click-counter"><i class="fa-solid fa-chair"></i> Seats: ${events[i].bookedSeats}/${events[i].totalSeats}</p>
            </div>
            ${bookBtn}
        </div>`;
    }

    // Assign HTML content to the box after generating all HTML in the loop
    box.innerHTML = newHTML;
}

// Function to toggle the description
function toggleDescription(index) {
    const descriptionElement = document.getElementById(`description-${index}`);
    const moreTextElement = document.getElementById(`more-${index}`);
    
    // Toggle the max-height to show/hide the description
    if (descriptionElement.style.maxHeight) {
        descriptionElement.style.maxHeight = null;
        moreTextElement.style.display = "none";
    } else {
        descriptionElement.style.maxHeight = descriptionElement.scrollHeight + "px";
        moreTextElement.style.display = "inline";
    }
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










