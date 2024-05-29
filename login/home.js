window.onload = loadUsers
var firebaseConfig = {
  apiKey: "AIzaSyBgH8SEu6oOeJUSWUxkVbMKXN9rgaHOOUM",
    authDomain: "authentication-1bdc9.firebaseapp.com",
    projectId: "authentication-1bdc9",
    storageBucket: "authentication-1bdc9.appspot.com",
    messagingSenderId: "669877886162",
    appId: "1:669877886162:web:0a134618d61556b5a9210b",
    measurementId: "G-LQ9SHZ9C3X"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
let userData = [];
async function loadUsers (){
await firebase.database().ref('users').once('value',   function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      const email = childData.email;
      const name = childData.full_name;
      const phoneno = childData.phoneno;
      const data = {
        name:name,email:email,phoneno:phoneno
      }
      userData.push(data)
    });
  });
  let html ="<tr><th>First Name</th><th>Last Name</th><th>Points</th></tr>"
  userData.forEach((user, index) => {
    var count = index+1;
    html+="<tr><td>"+count+"</td><td>"+user.name+"</td><td>"+user.email+"</td><td>"+user.phoneno+"</td></tr>";
  });
  console.log(html);
  let element = document.querySelector('.user_table');
  element.innerHTML = html
}

function logOut(){
  window.location.href = 'index.html'
}