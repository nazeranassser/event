
window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var logoutBtn = document.getElementById("logoutBtn");
    var bookNow = document.getElementById("BookNow");

    function updateButtonVisibility() {
        if (isLoggedIn === "true") {
            logoutBtn.style.display = "inline-block"; 
            try {
                bookNow.style.display = "none"; 
            } catch (error) {}
        } else {
            logoutBtn.style.display = "none"; 
            bookNow.style.display = "inline-block"; 
        }
    }

    updateButtonVisibility();

  
    logoutBtn.onclick = function(event) {
        event.preventDefault(); 
        var logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
        logoutModal.show();
    };

    var confirmLogoutBtn = document.getElementById("confirmLogout");
    confirmLogoutBtn.onclick = function() {
       
        localStorage.setItem("isLoggedIn", "false"); 
        localStorage.removeItem("userInfo");  
    
        updateButtonVisibility();
        
        
        setTimeout(function() {
            window.location.href = "index.html";  
        }, 500);
    };
};
document.addEventListener("DOMContentLoaded", function() {
    const usernameDisplay = document.getElementById("usernameDisplay");
    
   
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    

    console.log(userInfo);

    if (userInfo && userInfo.username) {
      
        usernameDisplay.textContent = userInfo.username;
    } else {
     
        usernameDisplay.textContent = "Guest";
    }
});
