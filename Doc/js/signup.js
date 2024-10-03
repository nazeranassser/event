
window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";  
    }

    document.getElementById("logoutBtn").onclick = function() {
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "login.html";
    };

   
};