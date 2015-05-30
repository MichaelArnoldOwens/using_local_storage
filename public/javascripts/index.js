//TODO: make sure email is unique on user creation by checking through localstorage
    //can make this cleaner
//TODO: figure out a way to add more access tokens - use array to store tokens
//TODO: add user list
//TODO: on click will display users tokens
//TODO: add update feature
//TODO: JSUNIT test

//password functions
//####################################################################################################################################

//validating password fields
var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password");

//validates password fits constraints and are entered in correctly
function validatePassword() {

  //regex to determine minimum 8 character at least one letter one number in string
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else if (!regex.test(password.value)) {
    confirm_password.setCustomValidity("Password be at least 8 characters long and contain at least one numeric character")
  }
  else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

//hashing function could go here but according to http://tonyarcieri.com/whats-wrong-with-webcrypto client side encryption is almost useless

//####################################################################################################################################

//arrays that will log ids and tokens
var ids_in_use = [];
var tokens_in_use = [];


//generates 36 character unique id
function guid() {
  
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  var id = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();

  if($.inArray(id, ids_in_use) != -1 || $.inArray(id, tokens_in_use) != -1) {
      guid();
  }
  return id;
}

//create an object out of given user
function objectizeData(arg){
    
    var data = arg.split("&");
    // console.log(data);
    var obj={};

    for(var key in data)
    {
        // console.log(data[key]);
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

    console.log(obj);
    return obj;
}

//checks if email is already in localStorage
function isEmailUnique() {

  var email = document.getElementById("password")

  var user_email_input = $("#email_input").val();
  var parsedLocalStorage = JSON.stringify(localStorage);

  if(parsedLocalStorage.indexOf(user_email_input) == -1){
    return true;
  }
  return false;
}

// event listener for focusout on email
$("#email_input").focusout(function () {
  var email = document.getElementById("email_input");
  if(!isEmailUnique()){
    $("#email_input").val("EMAIL IS IN USE Enter Different email")
    // console.log("Email in use")
  }
});

function getUserList() {
  for(guid_id in localStorage) {
    var user = localStorage[guid_id];
    // console.log("VVVVVVVVVVVVVVVV")
    // console.log(user)
    // console.log("^^^^^^^^^^^^^^^^^^")
    // $("#userList").append("<li data-uid='"+guid_id+"'>" +  "email: " + unescape(userObject["email"]) + "\n" +  "" + userObject["password"] + "</li>");
  }
}

getUserList()

//DOM Ready
$(function() {
  //generate token
  $("#token_button").on("click", function(event){
    
    //creating token
    var token = guid();
    //displaying token to be created
    $("#token_input").val(token)
  });

  //read in the input from the form
  $( "#registration_form" ).submit(function( event ) {
      event.preventDefault();

      console.log("############isEmailUnique")
      console.log(isEmailUnique())
    
      
      console.log("$$$$$$this");
        var user = $(this).serialize();
        var userObject = objectizeData(user);

    console.log("VVVVVVVVVVVVVVVV")
    console.log(userObject)
    console.log(unescape(JSON.stringify(userObject)));
    console.log("^^^^^^^^^^^^^^^^^^")

        //log id
        var guid_id = guid();
        ids_in_use.push(guid_id);

        //log token to tokens_in_use
        if($("#token_input").length > 0){
          console.log("token pushed")
          tokens_in_use.push($("#token_input").val());
        };

        localStorage.setItem(guid_id, unescape(JSON.stringify(userObject)));

        // console.log("$$$$$$$localstorage");
        // console.log(localStorage);

        // console.log("$$$$$$$tokens_in_use");
        // console.log(tokens_in_use);

        // console.log("$$$$$$ids_in_use");
        // console.log(ids_in_use);  

        $("#email_input").val('');
        $("#password").val('');
        $("#confirm_password").val('');
        $("#token_input").val('');
      
        //append created user to user list
        $("#userList").append("<li data-uid='"+guid_id+"'>" +  "email: " + unescape(userObject["email"]) + "\n" +  "" + userObject["password"] + "</li>");
      
  });



  $("#userList").on("click", "li", function(event){
    console.log(localStorage.getItem($(this).attr("data-uid")));
    var user = objectizeData(localStorage.getItem($(this).attr("data-uid")));
    console.log(user)
    $("#email_input").val(user.email)
  });
});


///////////////////////////////////////////////


// var db = getLocalStorage() || dispError('Local Storage not supported.');


var testObject = { 'id':'1', 'username': 'anpganpg@gmail.com', 'password': 'abcd1234', 'appTokens': ["token1","token2","token3"], 'timestamp': 0, 'lastupdated': 0};
// // var testObject2 = { 'username': 'abcdefghijklmnopqrstuv', 'password': 'abcd1234', 'appTokens': [], 'timestamp': 0, 'lastupdated': 0};
// // Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));
console.log(JSON.stringify(testObject))
console.log("&&&&&&&&&&&&&&&&&&")
console.log(testObject)

// // localStorage.setItem('testObject2', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');


// console.log('retrievedObject: ', JSON.parse(retrievedObject));

// console.log("$$$$$$Inside localstorage:$$$$$")
// console.log(db);

// // // checks if browser has local storage
// function getLocalStorage() {
//   try {
//       if( !! window.localStorage ) return window.localStorage;
//   } catch(e) {
//       return undefined;
//   }
// }

// console.log("$$$$$print local storage itemes");
// var contains_email = false;
// for(var i in localStorage) {
//   console.log(i)
//   console.log("&&&&&&&&&")
//   console.log(localStorage[i])
//   console.log("^^^^^^^^^^")
    
// }

    // console.log("$$$inside loop")
    // console.log(i)
    // console.log(localStorage[i]);

