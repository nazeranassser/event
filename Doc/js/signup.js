window.onload = function() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    // Handle the logout button click
    document.getElementById("logoutBtn").onclick = function() {
        localStorage.setItem("isLoggedIn", "false"); // Set login status to false
     
    };

    // Optional: Redirect to index.html if already logged in
    if (isLoggedIn === "true") {
       
    }
};
