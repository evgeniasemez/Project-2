// import { isString } from "util";

// Get references to page elements
var $submitBtn = $("#submitSignIn");
var $exampleList = $("#example-list");
var $username = $("#username");
var $password = $("#password");
var $fullname = $("#fullname");
var $phonenumber = $("#phonenumber");
var $email = $("#email");
var $validationtext = $("#validationText");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  login: function(username, password) {
    return $.ajax({
      url: "/login",
      type: "POST",
      data: { username: username, password: password }
    });
  }
};

$("#submitFirstSignUp").on("click", function() {
  $("#submitFirstSignUp").hide();
  $("#signUpForm").show();
  $("#signUpForReal").show();
  $("#submitSignIn").hide();
});

function phonenumber(phonenumber) {
  var rightPhone = parseInt(phonenumber);
  if (isNaN(rightPhone)) {
    return "Please type digits";
  } else {
    return rightPhone;
  }
}
// sign up functionality
$("#signUpForReal").on("click", function(event) {
  event.preventDefault();
  var parsedPhoneNum = phonenumber($phonenumber.val().trim());
  if (typeof parsedPhoneNum === "string" || parsedPhoneNum instanceof String) {
    $validationtext.show();
    return "Please type digits";
  }

  var example = {
    username: $username.val().trim(),
    password: $password.val().trim(),
    fullname: $fullname.val().trim(),
    phonenumber: parsedPhoneNum,
    email: $email.val().trim()
  };

  if (!(example.username && example.password)) {
    alert("You must enter a username and password!");
    return;
  }
  API.login(example.username, example.password).then(function() {
    window.location.replace("/");
  });
  signupAPI
    .Signup(
      example.username,
      example.password,
      example.fullname,
      example.phonenumber,
      example.email
    )
    .then(function() {
      window.location.replace("/loginscreen");
    });
  $username.val("");
  $password.val("");
  $fullname.val("");
  $phonenumber.val("");
  $email.val("");
});

var signupAPI = {
  login: function(username, password) {
    return $.ajax({
      url: "/login",
      type: "POST",
      data: { username: username, password: password }
    });
  },
  Signup: function(username, password, fullname, phonenumber, email) {
    return $.ajax({
      url: "/signup",
      type: "POST",
      data: {
        username: username,
        password: password,
        fullname: fullname,
        phonenumber: phonenumber,
        email: email
      }
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  if (!(example.username && example.password)) {
    alert("You must enter a username and password!");
    return;
  }

  API.login(example.username, example.password).then(function() {
    window.location.replace("/");
  });
  $username.val("");
  $password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
