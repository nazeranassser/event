let isLogged = localStorage.getItem('isLoggedIn');
console.log(`logged: ${isLogged}`);

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
        // console.log(events);
        return events;
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
async function bookSeat(userId, eventId) {
    // Update user data
    let user = await getUser(userId);
    let userRegisteredEvents = user.registeredEvents;
    if(userRegisteredEvents.includes(eventId) == false){
        userRegisteredEvents.push(Number(eventId));
        let updatedDataUser = {"registeredEvents": userRegisteredEvents};
        updateUser(userId, updatedDataUser);
    }
    

    //Update event data
    let event = await getEvent(eventId);
    let eventAttendees = event.attendees;
    let eventBookedSeats = Number(event.bookedSeats);
    // console.log(`book seats: ${eventBookedSeats}`);
    if(eventAttendees.includes(userId) == false ){
        eventAttendees.push(Number(userId));
        eventBookedSeats += 1;
        // console.log(eventAttendees);
        let updatedDataEvent = {
            "attendees": eventAttendees,
            "bookedSeats": eventBookedSeats
        };
        updateEvent(eventId, updatedDataEvent);
    }
    
    
}
//////////// test area



// bookSeat(1,1)






///////////////////
async function viewEvents(){
    console.log('viewEvents Function');
    let events = await getAllEvents();
    // console.log(events);
    let box = document.getElementById("events-box");
    let newHTML = '';
    let timeArray, date,  time;
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let userId = userInfo.id;
    // console.log(userId);
    for(let i = 0; i < events.length; i++){
        //extract time and date from date string
        timeArray = events[i].startTime.split('T');
        date = timeArray[0];
        time = timeArray[1];
        newHTML +=
        `<div class="newspaper-box">
                <img src="https://www.meydanfz.ae/wp-content/uploads/2021/10/Events.png" alt="Event Image" class="newspaper-img" />
                <h2 class="newspaper-title">${events[i].title}</h2>
                <p class="newspaper-description">${events[i].description}</p>
                <div class="event-icons">
                    <p class="icon"><i class="fas fa-clock"></i> ${date} (${time})</p>
                    <p class="icon"><i class="fas fa-map-marker-alt"></i> ${events[i].location}</p> 
                    <p class="icon click-counter"><i class="fa-solid fa-chair"></i> Seats: ${events[i].bookedSeats}/${events[i].totalSeats}</p>
                </div>
                <button class="book-now-btn" id="btn-book" onclick="bookSeat(${userId},${events[i].id})">Book</button>
            </div>`;
    }
    // console.log(events);
    box.innerHTML = newHTML;
}