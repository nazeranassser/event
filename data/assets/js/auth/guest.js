function isGuest(){
  if (localStorage.getItem("isLoggedIn") == "true") {
    location.href = "index.html"
  }
}

isGuest()