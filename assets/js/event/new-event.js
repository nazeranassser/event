function getEventData(){

  const form = document.querySelector("#newEventForm")
  const startTime = document.querySelector("#start_time").value
  const endTime = document.querySelector("#end_time").value



  validation(form, startTime, endTime)
  
  return form
}



function validation(form, start, end){

  let formStatus = true

  if(form.title.value == ""){
    document.querySelector("#titleErrorMsg").innerHTML = "title field is required"
    formStatus = false
  }

  if(form.description.value == ""){
    document.querySelector("#descriptionErrorMsg").innerHTML = "description field is required"
    formStatus = false
  }

  if(form.image.value == ""){
    document.querySelector("#imageErrorMsg").innerHTML = "image field is required"
    formStatus = false
  }
  else if (isImg(form.image.value)){
    const image = changeImgName(form.image.value)
  }
  else {
    document.querySelector("#imageErrorMsg").innerHTML = "use valid img extension"
    formStatus = false
  }

  if(form.category.value == ""){
    document.querySelector("#categoryErrorMsg").innerHTML = "category field is required"
    formStatus = false
  }

  if(start == ""){
    document.querySelector("#startErrorMsg").innerHTML = "Starting date field is required"
    formStatus = false
  }

  if(end == ""){
    document.querySelector("#endErrorMsg").innerHTML = "Ending date field is required"
    formStatus = false
  }

  if(form.seats.value == ""){
    document.querySelector("#seatsErrorMsg").innerHTML = "Total seats field is required"
    formStatus = false
  }

  if(form.location.value == ""){
    document.querySelector("#locationErrorMsg").innerHTML = "Location field is required"
    formStatus = false
  }





  // if(formStatus){
  //   addEvent(form, start, end)
  //   console.log("The event added successfully.")


  //   form.title.value = ""
  //   form.description.value = ""
  //   form.category.value = ""
  //   start = ""
  //   end = ""
  //   form.seats.value = ""
  //   form.location.value = ""
  // }

  
}



async function addEvent(form, start, end, img) {


  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "title": form.title.value,
      "description": form.description.value,
      "image": img,
      "category": form.category.value,
      "startTime": start,
      "endTime": end,
      "location": form.location.value,
      "organizer": JSON.parse(localStorage.getItem("userInfo")).id,
      "totalSeats": parseInt(form.seats.value),
      "bookedSeats": 0,
      "attendees": []
    })
  });


  if (!response.ok){
    console.log("error when adding a new event.")
  }


}


// function successMSG(msg){
//   const success = document.querySelector("success")
//   // success.classList = "bg-success border border-1 rounded"
//   success.innerHTML = msg
// }



function isImg(image){
  const validImg = ["png", "jpg", "jpeg", "gif"]

  if (validImg.indexOf(image.split(".")[image.length -1])){
    return true
  }
  return false
}


function changeImgName(image){
  let img = image.split(".")
  img[img.length -2] = img[img.length -2]+(new Date()).getTime()
  
  return img.join(".")
}