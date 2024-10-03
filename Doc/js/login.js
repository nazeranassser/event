const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


var userNameField = document.getElementById("floatingUserName");
var emailField = document.getElementById("floatingEmail");
var passwordField = document.getElementById("floatingPassword");
var confirmPasswordField = document.getElementById("floatingConfirmPassword");
var registerButton = document.getElementById("floatingRegister");
async function registerUser(event) {
    event.preventDefault();
   
    if (!userNameField.value || !emailField.value || !passwordField.value || !confirmPasswordField.value) {
        alert("All fields are required!");
        return;
    }

   
    if (passwordField.value !== confirmPasswordField.value) {
        alert("Passwords do not match!");
        return;
    }

    var passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(passwordField.value)) {
        alert("Password must be at least 8 characters long and contain at least one number and one uppercase letter.");
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    
    var users = JSON.parse(localStorage.getItem("users")) || [];


    var emailExists = users.some(function(user) {
        return user.email === emailField.value;
    });

    if (emailExists) {
        alert("This email is already registered!");
        return;
    }

  
    var newUser = {
        username: userNameField.value,
        email: emailField.value,
        password: passwordField.value,
        booking: [],
    };

    // users.push(newUser);
    // localStorage.setItem("users", JSON.stringify(users));
    // alert("Registration successful!");


    const apiUrl = "http://localhost:3000/users"
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "username": userNameField.value,
            "email":emailField.value ,
            "publishedEvents": [],
            "password": passwordField.value,
            "registeredEvents":[]
        })
    });


    userNameField.value = "";
    emailField.value = "";
    passwordField.value = "";
    confirmPasswordField.value = "";
}


registerButton.addEventListener("click", registerUser);



// =============================================================

var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginSubmit = document.getElementById("loginSubmit");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginSubmit = document.getElementById("loginSubmit");

async function loginUser(event) {
    event.preventDefault(); 

    if (loginEmail.value === "" || loginPassword.value === "") {
        alert("Both fields are required!");
        return;
    }

    const apiUrl = "http://localhost:3000/users";
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        let validUser = data.find(user => user.email === loginEmail.value && user.password === loginPassword.value);

        if (validUser) {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true"); 
            window.location.href = "index.html";  
        } else {
            alert("Invalid email or password!");
        }

    } catch (error) {
        console.error("Error fetching users:", error);
        alert("There was a problem with the login. Please try again.");
    }

 
    loginEmail.value = "";
    loginPassword.value = "";
}

loginSubmit.addEventListener("click", loginUser);



// function loginUser(event) {
//     event.preventDefault(); 

//     if (loginEmail.value === "" || loginPassword.value === "") {
//         alert("Both fields are required!");
//         return;
//     }

//     var users = JSON.parse(localStorage.getItem("users")) || [];

//     var validUser = users.find(function(user) {
//         return user.email === loginEmail.value && user.password === loginPassword.value;
//     });

//     if (validUser) {
//         alert("Login successful!");

       
//         localStorage.setItem("isLoggedIn", "true");
        
//         window.location.href = "home.html";  
//     } else {
//         alert("Invalid email or password!");
//     }

//     loginEmail.value = "";
//     loginPassword.value = "";
// }

// loginSubmit.addEventListener("click", loginUser);

// window.onload = function() {
//     var isLoggedIn = localStorage.getItem("isLoggedIn");

   
//     if (isLoggedIn === "true") {
//         window.location.href = "home.html";  
//     }
// };

// var registerButton = document.getElementById("register");

// registerButton.addEventListener("click", function(event) {
//     event.preventDefault();  

  
//     window.location.href = "register.html"; 
// });
// =========================
// const apiUrl = "http://localhost:3000/users"
// const response = await fetch(apiUrl);
// const data = JSON.parse(response)

// let result = data.find(function(user) {
//     return user.email === loginEmail.value && user.password === loginPassword.value;
// })

// console.log(result)