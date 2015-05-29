
//password functions
//##############################

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

//#################################

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

console.log("$$$$$$id");
console.log(id);

    if($.inArray(id, ids_in_use) != -1 || $.inArray(id, tokens_in_use) != -1) {
      guid();
    }

console.log("$$$$$$after recurse")
console.log(id)

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

$(function() {
  //DOM is ready
  
  //generate token
  $("#token_button").on("click", function(event){
    
    //creating token
    var token = guid();
    //displaying token to be created
    $("#token_input").val(token)
  })

  //display userList

  //read in the input from the form
  $( "#registration_form" ).submit(function( event ) {
    event.preventDefault();
    console.log("$$$$$$this");

    var user = $(this).serialize();
    var userObject = objectizeData(user);

    var guid_id = guid();
    ids_in_use.push(guid_id);

    //push token to tokens_in_use
    if($("token_input").length > 0){
      console.log("token pushed")
      tokens_in_use.push($("#token_input").val());
    };

    localStorage.setItem(guid_id, user);

    console.log("$$$$$$$tokens_in_use");
    console.log(tokens_in_use);

    console.log("$$$$$$ids_in_use");
    console.log(ids_in_use);  

    $("#email_input").val('');
    $("#password").val('');
    $("#confirm_password").val('');
    $("#token_input").val('');

    //display user created
    $("#userList").append("<li data-uid='"+guid_id+"'>" +  "email: " + unescape(userObject["email"]) + "\n" +  "" + userObject["password"] + "</li>");
  });


  $("#userList").on("click", "li", function(event){
    console.log(localStorage.getItem($(this).attr("data-uid")));
    var user = objectizeData(localStorage.getItem($(this).attr("data-uid")));
    console.log(user)
    $("#email_input").val(user.email)
  });
});

// var db = getLocalStorage() || dispError('Local Storage not supported.');


// var testObject = { 'id':'1', 'username': 'anpganpg@gmail.com', 'password': 'abcd1234', 'appTokens': [], 'timestamp': 0, 'lastupdated': 0};
// var testObject2 = { 'username': 'abcdefghijklmnopqrstuv', 'password': 'abcd1234', 'appTokens': [], 'timestamp': 0, 'lastupdated': 0};

// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));
// localStorage.setItem('testObject2', JSON.stringify(testObject));


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