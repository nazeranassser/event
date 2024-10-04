window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var logoutBtn = document.getElementById("logoutBtn");
    var bookNow = document.getElementById("BookNow");
    if (isLoggedIn === "true") {
        logoutBtn.style.display = "inline-block"; 
        bookNow.style.display = "none"; 
    } else {
        logoutBtn.style.display = "none"; 
        bookNow.style.display = "inline-block"; 
    }
    logoutBtn.onclick = function() {
        var confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.setItem("isLoggedIn", "false");  
            window.location.href = "index.html";
        } else {
            return false;
        }
    };
    
};

