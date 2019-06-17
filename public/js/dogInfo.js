$("#addDog").on("click", function (event) {
  event.preventDefault();
  console.log("Add Dog button");
  var now = moment(Date()).format("YYYY-MM-DD HH:MM:SS");
  // make a newCharacter obj
  var newDog = {
    // name from name input
    name: $("#name").val().trim(),
    // role from breed input
    breed: $("#breed").val().trim(),
    createdAt: now,
    updatedAt: now,
    ownerId: 3
  };
  // send an AJAX POST-request with jQuery
  $.post("/api/dogs/", newDog)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding dog...");
      window.location.replace("/");
      /*$.ajax("/sniffer", {}).then(function() {
        console.log("I went Home");
      });*/
    });
});
