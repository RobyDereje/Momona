// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase with the configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4fx4ULHpMc25sY0AShVnjzGZwWBDjkHg",
    authDomain: "momona-6407a.firebaseapp.com",
    databaseURL: "https://momona-6407a-default-rtdb.firebaseio.com",
    projectId: "momona-6407a",
    storageBucket: "momona-6407a.appspot.com",
    messagingSenderId: "1019868476435",
    appId: "1:1019868476435:web:1c44d6e8b529dfee707be6"
  };

const app = initializeApp(firebaseConfig);

// Function to handle user sign-in
async function signIn(username, password) {
    const db = getDatabase();
    const usernameRef = ref(db, `Username`);
    const passwordRef = ref(db, `Password`);

    console.log("Username Reference:", usernameRef.toString());
    console.log("Password Reference:", passwordRef.toString());

    try {
        const usernameSnapshot = await get(usernameRef);
        const passwordSnapshot = await get(passwordRef);
        const objUserSnap = Object.values(usernameSnapshot.val())
        const passUserSnap = Object.values(passwordSnapshot.val())
        console.log("Username Snapshot:", Object.values(usernameSnapshot.val()));
        console.log("Password Snapshot:", passUserSnap);

        if (usernameSnapshot.exists() && passwordSnapshot.exists()) {
            const userID = objUserSnap.findIndex(element => element.toLowerCase() === username.toLowerCase())
            if(userID >= 0){
                if(passUserSnap[userID] == password){
                    window.location.href = "https://www.google.com/";
                } else{
                    document.getElementById('error-message').innerText = "Incorrect password";
                    console.log(password)
                    console.log(passUserSnap[userID])
                }   
            } else{
                document.getElementById('error-message').innerText = "Username not found";
            }      
        } else {
            // Display error message for incorrect username
            document.getElementById('error-message').innerText = "Username not found";
        }
    } catch (error) {
        console.error("Error signing in:", error);
    }
}


// Event listener for the sign-in form submission
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    signIn(username, password);
});

document.getElementById('btnlogin').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    signIn(username, password);
});

// Function to toggle password visibility
document.getElementById('show-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const passwordFieldType = passwordInput.getAttribute('type');

    if (passwordFieldType === 'password') {
        passwordInput.setAttribute('type', 'text');
        document.getElementById('show-password-icon').classList.remove('fa-eye-slash');
        document.getElementById('show-password-icon').classList.add('fa-eye');
    } else {
        passwordInput.setAttribute('type', 'password');
        document.getElementById('show-password-icon').classList.remove('fa-eye');
        document.getElementById('show-password-icon').classList.add('fa-eye-slash');
    }
});