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
    var image = changeImgName(form.image.value)
  }
  else{
    var image = changeImgName(form.image.value)
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

  if (!checkValidDate(start)){
    document.querySelector("#startErrorMsg").innerHTML = "The starting date must be equal to today at least."
    formStatus = false
  }
  else if (!checkCorrectDate(start, end)){
    document.querySelector("#startErrorMsg").innerHTML = "The starting date must be before the ending date."
    formStatus = false
  }

  if(form.seats.value == ""){
    document.querySelector("#seatsErrorMsg").innerHTML = "Total seats field is required"
    formStatus = false
  }

  if(parseInt(form.seats.value) < 1){
    document.querySelector("#seatsErrorMsg").innerHTML = "The event must have at least one seat."
    formStatus = false
  }

  if(form.location.value == ""){
    document.querySelector("#locationErrorMsg").innerHTML = "Location field is required"
    formStatus = false
  }

  if(formStatus){
    addEvent(form, start, end, image)
    console.log("The event added successfully.")


    form.title.value = ""
    form.description.value = ""
    form.category.value = ""
    start = ""
    end = ""
    form.image.value = ""
    form.seats.value = ""
    form.location.value = ""

    alert("The event was added successfully.")
  }

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


function isImg(image){
  const validImg = ["png", "jpg", "jpeg", "gif"]
  
  if (validImg.indexOf(image.split(".")[image.length -1]) != -1){
    return true
  }
  return false
}


function changeImgName(image){
  // const toRemove = "C:\\fakepath\\"
  let img = image.replace(/.*?C:\\fakepath\\/, "");

  console.log(image)
  console.log(img)

  return img
}



function checkValidDate(date){
  const selectedDate = new Date(date);
  const currentDate = new Date();

  if(selectedDate < currentDate)
    return false
  else
    return true
}


function checkCorrectDate(startDate, endDate){
  const start = new Date(startDate);
  const end = new Date(endDate);

  if(start > end)
    return false
  else
    return true
}