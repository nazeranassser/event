var userNameField = document.getElementById("floatingUserName");
var emailField = document.getElementById("floatingEmail");
var passwordField = document.getElementById("floatingPassword");
var confirmPasswordField = document.getElementById("floatingConfirmPassword");
var registerButton = document.getElementById("floatingRegister");
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

async function registerUser(event) {
    event.preventDefault();

    // Disable the button to prevent multiple clicks
    registerButton.disabled = true;

    if (!userNameField.value || !emailField.value || !passwordField.value || !confirmPasswordField.value) {
        alert("All fields are required!");
        registerButton.disabled = false;
        return;
    }

    if (passwordField.value !== confirmPasswordField.value) {
        alert("Passwords do not match!");
        registerButton.disabled = false;
        return;
    }

    var passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(passwordField.value)) {
        alert("Password must be at least 8 characters long and contain at least one number and one uppercase letter.");
        registerButton.disabled = false;
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        alert("Please enter a valid email address.");
        registerButton.disabled = false;
        return;
    }

    try {
        // Fetch existing users to check if the email already exists
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        var emailExists = users.some(user => user.email === emailField.value);
        if (emailExists) {
            alert("This email is already registered!");
            registerButton.disabled = false;
            return;
        }

        // Register new user
        const apiUrl = "http://localhost:3000/users";
        const registerResponse = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": userNameField.value,
                "email": emailField.value,
                "password": passwordField.value,
                "publishedEvents": [],
                "registeredEvents": []
            })
        });

        if (!registerResponse.ok) {
            throw new Error("Error creating user");
        }

        alert("Registration successful!");
        userNameField.value = "";
        emailField.value = "";
        passwordField.value = "";
        confirmPasswordField.value = "";

      

    } catch (error) {
        console.error("Error registering user:", error);
        alert("There was an error registering. Please try again.");
    } finally {
        
        registerButton.disabled = false;
    }
}

registerButton.addEventListener("click", registerUser);

// =============================================================

var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginSubmit = document.getElementById("loginSubmit");

async function loginUser(event) {
    event.preventDefault(); 

    loginSubmit.disabled = true; 

    if (loginEmail.value === "" || loginPassword.value === "") {
        alert("Both fields are required!");
        loginSubmit.disabled = false;
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
    } finally {
        loginSubmit.disabled = false;
    }

    loginEmail.value = "";
    loginPassword.value = "";
}

loginSubmit.addEventListener("click", loginUser);
