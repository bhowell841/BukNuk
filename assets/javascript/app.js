$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCLQQaC2PjCbaoYwkeYea8mlJeNwX-G7Y4",
        authDomain: "project1test-346b5.firebaseapp.com",
        databaseURL: "https://project1test-346b5.firebaseio.com",
        projectId: "project1test-346b5",
        storageBucket: "project1test-346b5.appspot.com",
        messagingSenderId: "712815187401"
    };
    firebase.initializeApp(config);
    //set firebase ref//
    var database = firebase.database();
    //set variable to hold unique user ID of logged in user. This is used to save user data later on//
    var currentUser = "";



    //sign up action//
    $("#signupSubmit").on("click", function () {
        var email = $("#signupEmail").val().trim();
        var password = $("#signupPassword").val().trim();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                return firebase.auth().createUserWithEmailAndPassword(email, password)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("please try again, Sign Up unsuccesful")
            });
    });

    //sign in action//
    $("#signinSubmit").on("click", function () {
        var email = $("#signinEmail").val().trim();
        var password = $("#signinPassword").val().trim();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("please try again, Sign In unsuccesful")
            });
    });

    //sign user out//
    $("#sign-out-button").on("click", function () {
        firebase.auth().signOut();
        
    });

    ///user can chose profile pic from computer, need to add to firebase as will not be stored on page refresh//
    $("#chooseAProfilePic").change(function(){
        uploadPic(this);
    });

    function uploadPic(input){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#blank-profile-pic').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }

    }

    //if user is logged in do this//
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = user.uid;

            //not tested//
            document.location.href = "user.html";
        } else {

        }
    });














    //document on ready closing tab//
});
