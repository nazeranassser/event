async function fetchEvents(){
  try {

    const response = await fetch("http://localhost:3000/events")
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const events = await response.json();
    
    return events
  } catch (error) {
    console.log(error)
  }
}



async function getMyPublishedEvents(){

  try {

    const events = await fetchEvents()
    
    const published = events.filter(function(event){
      return event.organizer == JSON.parse(localStorage.getItem("userInfo")).id
    })
    
    
    showEvents(published, "#own-tab-pane .newspaper-section .newspaper-container", true)

  } catch (error) {
    console.log(error)
  }

}


async function getMyBookedEvents(){

  try {

    const events = await fetchEvents()
    
    const booked = events.filter(function(event){

      return event.attendees.find(function(userId){
        return userId == JSON.parse(localStorage.getItem("userInfo")).id
      }) == JSON.parse(localStorage.getItem("userInfo")).id
    })
    
    
    showEvents(booked, "#booked-tab-pane .newspaper-section .newspaper-container")

  } catch (error) {
    console.log(error)
  }

}


async function showEvents(events, container, own){

  const eventContainer = document.querySelector(container)
  eventContainer.innerHTML = ""
  let count = 1;
  for (const event of events) {
    let node = document.createElement("div")
    node.setAttribute("class", "newspaper-box")

    node.innerHTML = `
        <div>
          <img src="assets/img/events/${event.image}" alt="Event Image"
              class="newspaper-img" />
          <h2 class="newspaper-title">${event.title}</h2>
          <p class="newspaper-description">${event.description}</p>
          <div class="event-icons d-flex flex-wrap">
              <span class="icon p-1"><i class="fas fa-clock p-1"></i>${event.startTime}</span>
              <span class="icon p-1"><i class="fas fa-map-marker-alt p-1"></i>${event.location}</span>
              <span class="icon p-1 click-counter"><i class="fa-solid fa-chair p-1"></i> Seats: ${event.attendees.length} /${event.totalSeats}</span>
          </div>
        </div>
    `

    if(own){
      let btn = document.createElement("div")
      btn.innerHTML = `
          <div id="deleteBtn${count}" onclick="deleteEvent(${event.id})" class="p-2 mt-2 text-center"
          style="width:100%; background-color:red; border-radius: 4px; color: #fff; cursor: pointer;">Delete</div>
      `

      node.appendChild(btn)
      eventContainer.appendChild(node)
      document.querySelector("#deleteBtn"+count)
      .onclick = function(){
  
        try {
          if(confirm("Are you sure to delete this event ?")){
            fetch('http://localhost:3000/events/'+event.id, {
              method: 'DELETE',
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
  
    }
    else{
      
      let unBookBtn = document.createElement("div")
      unBookBtn.innerHTML = `
          <div id="unBookBtn${count}" onclick="UnBookSeat('${JSON.parse(localStorage.getItem("userInfo")).id}', '${event.id}')" class="p-2 mt-2 text-center"
          style="width:100%; background-color:red; border-radius: 4px; color: #fff; cursor: pointer;">UnBook</div>
      `

      node.appendChild(unBookBtn)
      eventContainer.appendChild(node)
    }
    

    count++
  }

}

