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
    const span = document.querySelector("#titleErrorMsg")
    span.innerHTML = "title field is required"
    formStatus = false
  }

  if(form.description.value == ""){
    const span = document.querySelector("#descriptionErrorMsg")
    span.innerHTML = "description field is required"
    formStatus = false
  }

  if(form.image.value == ""){

    const span = document.querySelector("#imageErrorMsg")
    span.innerHTML = "image field is required"
    formStatus = false
  }
  else if (isImg(form.image.value)){
    form.image.value = changeImgName(form.image.value)
  }
  else {
    const span = document.querySelector("#imageErrorMsg")
    span.innerHTML = "use valid img extension"
    formStatus = false
  }

  if(form.category.value == ""){
    const span = document.querySelector("#categoryErrorMsg")
    span.innerHTML = "category field is required"
    formStatus = false
  }

  if(start == ""){
    const span = document.querySelector("#startErrorMsg")
    span.innerHTML = "Starting date field is required"
    formStatus = false
  }

  if(end == ""){
    const span = document.querySelector("#endErrorMsg")
    span.innerHTML = "Ending date field is required"
    formStatus = false
  }

  if(form.location.value == ""){
    const span = document.querySelector("#locationErrorMsg")
    span.innerHTML = "Location field is required"
    formStatus = false
  }





  if(formStatus){
    addEvent(form, start, end)
    console.log("The event added successfully.")


    form.title.value = ""
    form.description.value = ""
    form.category.value = ""
    form.startTime.value = ""
    form.endTime.value = ""
    form.location.value = ""
  }


}



async function addEvent(form, start, end) {


  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "title": form.title.value,
      "description": form.description.value,
      "image": img.join("."),
      "category": form.category.value,
      "startTime": start,
      "endTime": end,
      "location": form.location.value,
      "organizer": JSON.parse(localStorage.getItem("userInfo")).id,
      "totalSeats": 100,
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

  console.log((typeof img.join(".") == "string"))
  
  return "  "
}