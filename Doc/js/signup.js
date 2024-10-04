
window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var logoutBtn = document.getElementById("logoutBtn");
    var bookNow = document.getElementById("BookNow");

    function updateButtonVisibility() {
        if (isLoggedIn === "true") {
            logoutBtn.style.display = "inline-block"; 
            bookNow.style.display = "none"; 
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
