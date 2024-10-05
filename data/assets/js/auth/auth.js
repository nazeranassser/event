function isAuth(){
  const elements = document.querySelectorAll(".isAuth")

  if(localStorage.getItem("isLoggedIn") == "false"){
    for (let index = 0; index < elements.length; index++) {
      elements[index].style.display = "none"
    }
  }
}


isAuth()