  var firebaseConfig = {
      apiKey: "AIzaSyBgH8SEu6oOeJUSWUxkVbMKXN9rgaHOOUM",
        authDomain: "authentication-1bdc9.firebaseapp.com",
        projectId: "authentication-1bdc9",
        storageBucket: "authentication-1bdc9.appspot.com",
        messagingSenderId: "669877886162",
        appId: "1:669877886162:web:0a134618d61556b5a9210b",
        measurementId: "G-LQ9SHZ9C3X"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
    const userIcon = document.getElementById('user-icon');

// Set up our register function
function register() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var full_name = document.getElementById('full_name').value;
  var phoneno = document.getElementById('phoneno').value;

  // Validate input fields
  if (validateEmail(email) && validatePassword(password) && validateField(full_name) && validateField(phoneno)) {
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser;
        // Add this user to Firebase Database
        var database_ref = database.ref();
        // Create User data
        var user_data = {
          email: email,
          full_name: full_name,
          phoneno: phoneno,
          last_login: Date.now()
        };
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data);
        // Done
        alert('User Created!');
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert('Please fill in all fields correctly.');
  }
}

// Set up our login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (validateEmail(email) && validatePassword(password)) {
    auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser;
        // Add this user to Firebase Database
        var database_ref = database.ref();
        // Create User data
        var user_data = {
          last_login: Date.now()
        };
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data);
        window.location.href = '../index.html';
        // Done
        alert('Login Successful!');
        userIcon.style.display = 'block'; // Show the user icon after successful login
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert('Please enter a valid email and password.');
  }
}

// Validate Functions
function validateEmail(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field.trim() !== '';
}