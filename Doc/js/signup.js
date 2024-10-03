window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var logoutBtn = document.getElementById("logoutBtn");
    var bookNow = document.getElementById("BookNow");

  
    if (isLoggedIn === "true") {
        logoutBtn.style.display = "block"; 
        bookNow.style.display = "none"; 
    } else {
        logoutBtn.style.display = "none"; 
        bookNow.style.display = "block";
    }


    logoutBtn.onclick = function() {
        localStorage.setItem("isLoggedIn", "false");
        logoutBtn.style.display = "none";
        bookNow.style.display = "block"; 
    };
};
