// logout.js

window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var logoutBtn = document.getElementById("logoutBtn");
    var bookNow = document.getElementById("BookNow");
    
    // Function to update button visibility based on login state
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

    // Event listener for Logout button to show the modal
    logoutBtn.onclick = function(event) {
        event.preventDefault(); // Prevent default action
        var logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
        logoutModal.show();
    };

    // Event listener for Confirm Logout button in the modal
    var confirmLogoutBtn = document.getElementById("confirmLogout");
    confirmLogoutBtn.onclick = function() {
        // Perform logout actions
        localStorage.setItem("isLoggedIn", "false"); 
        localStorage.removeItem("userInfo");  
        
        // Optionally, hide the Logout button and show the Book Now button
        updateButtonVisibility();
        
        // Redirect to homepage after a short delay to allow UI update
        setTimeout(function() {
            window.location.href = "index.html";  
        }, 500);
    };
};
