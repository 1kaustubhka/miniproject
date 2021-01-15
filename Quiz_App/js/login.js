var firebaseConfig = {
  apiKey: "AIzaSyAuKxm63mxhiDIW27ITZVYicQaLd5tkX-M",
  authDomain: "newsign-6fc38.firebaseapp.com",
  databaseURL: "https://newsign-6fc38-default-rtdb.firebaseio.com",
  projectId: "newsign-6fc38",
  storageBucket: "newsign-6fc38.appspot.com",
  messagingSenderId: "684095806892",
  appId: "1:684095806892:web:a8e8e62deab08461122e09",
  measurementId: "G-7LC2FFM16B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var database = firebase.database();
    function writeUserData(email) {
      firebase.database().ref('Email' + email).set({
        email: email,
      });
    }
  } else {
    // No user is signed in.
  }
});

function login() {

  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then((user) => {
      window.location.replace("logout.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Please Enter Correct Login Details")

    });
}

function logout() {

  firebase.auth().signOut().then(() => {
    window.location.href("signin.html");

  }).catch((error) => {
  });

}

function register() {
  var uname = document.getElementById("name").value;
  var uemail = document.getElementById("email").value;
  var ucontact = document.getElementById("contact").value;
  var upassword = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(uemail, upassword)
    .then(function () {
      window.alert("You Are Sucessfully Registered, Please Login")

      var id = firebase.auth().currentUser.uid;
      firebase.database().ref('Quiz_Users/' + id).set({
        name: uname,
        email: uemail,
        contact: ucontact,
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });

}


function forgetpassword() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    alert('Password Reset Email Sent!');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function update() {
Ready();
var uname = document.getElementById("name").value;
var uemail = document.getElementById("email").value;
var ucontact = document.getElementById("contact").value;
var id = firebase.auth().currentUser.uid;

firebase.database().red('Quiz_Users/' +id).update({
  name: uname,
  email: uemail,
  contact: ucontact,
});
}

