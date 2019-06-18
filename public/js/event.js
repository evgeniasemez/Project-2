$("#addParty").on("click", function(event) {
  event.preventDefault();
  console.log("Add Dog button");
  var now = moment(Date()).format("YYYY-MM-DD HH:MM:SS");
  // make a newCharacter obj
  var newEvent = {
    // name from name input
    name: $("#party")
      .val()
      .trim(),
    // role from breed input
    location: $("#location")
      .val()
      .trim(),
    date: $("#date")
      .val()
      .trim(),
    createdAt: now,
    updatedAt: now,
    dogId: 3
  };
  // send an AJAX POST-request with jQuery
  $.post("/api/events", newEvent)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      //alert("Adding event...");
      window.location.replace("/");
      /*$.ajax("/sniffer", {}).then(function() {
        console.log("I went Home");
      });*/
    });
});
