var userId = 0;

// eslint-disable-next-line no-unused-vars
function loadData() {
  //debugger;
  userId = parseInt($("#resu").text());
  var route = "/api/owners/" + userId;
  $.ajax(route, {}).then(function(resOwner) {
    console.log("load User");
    console.log(resOwner);
    var addButton = document.getElementById("loadDogPage");
    userId = resOwner.id;
    var userTitle = document.getElementById("ownerName");
    userTitle.textContent = resOwner.name;
    /*resDog.render("doginfo", "");*/
    var route = "/api/dogsByOwner/" + userId;
    $.ajax(route, {}).then(function(resDog) {
      var userDog = document.getElementById("listItemDog");
      if (resDog !== null) {
        console.log(resDog);
        //userDog.innerHTML = "<a href=\"/loadDogData/1\" class=\"btn btn-primary liButton\" id=\"loadDogPage\"><i class=\"fas fa-pencil-alt\"></a> <button type=\"button\" class=\"btn btn-primary liButton\" id=\"edit\" data-id = \"" + resDog.id + "\"><i class=\"fas fa-pencil-alt\"></i></button>" + "<button type=\"button\" class=\"btn btn-primary liButton\" id=\"delete\"data-id = \"" + resDog.id + "\"><i class=\"far fa-trash-alt\"></i></button>" + resDog.name + " - " + resDog.breed;
        userDog.innerHTML =
          // eslint-disable-next-line quotes
          /*'<button type="button" class="btn btn-primary liButton" id="edit" data-id = "' +
          resDog.id +
          // eslint-disable-next-line prettier/prettier
          "\"><i class=\"fas fa-pencil-alt\"></i></button>" +*/
          // eslint-disable-next-line prettier/prettier
          "<button type=\"button\" class=\"btn btn-primary liButton\" id=\"delete\"data-id = \"" +
          resDog.id +
          // eslint-disable-next-line prettier/prettier
          "\"><i class=\"far fa-trash-alt\"></i></button>" +
          resDog.name +
          " - " +
          resDog.breed;
        // replace this line that has an edit button 
        // with a line without the edit since we 
        // are not soing the edit

        /*userDog.innerHTML =
          // eslint-disable-next-line quotes
          '<button type="button" class="btn btn-primary liButton" id="edit" data-id = "' +
          resDog.id +
          // eslint-disable-next-line prettier/prettier
          "\"><i class=\"fas fa-pencil-alt\"></i></button>" +
          // eslint-disable-next-line prettier/prettier
          "<button type=\"button\" class=\"btn btn-primary liButton\" id=\"delete\"data-id = \"" +
          resDog.id +
          // eslint-disable-next-line prettier/prettier
          "\"><i class=\"far fa-trash-alt\"></i></button>" +
          resDog.name +
          " - " +
          resDog.breed;*/
        addButton.style.display = "none";
        userDog.style.display = "block";
      } else {
        userDog.style.display = "none";
        addButton.style.display = "block";
      }
    });
  });
  $.ajax("/api/events", {}).then(function(resEvents) {
    console.log("load Event");
    console.log(resEvents);
    var eventArr = [];
    for (var i = 0; i < resEvents.length; i++) {
      var eventObj = {
        title: resEvents[i].name,
        start: resEvents[i].date
      };
      eventArr.push(eventObj);
    }
    //document.addEventListener("DOMContentLoaded", function() {}
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ["interaction", "dayGrid"],
      defaultDate: "2019-06-12",
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: eventArr
    });
    calendar.render();
    //});
    mapInit();
  });
}
$(document.body).on("click", "#delete", function() {
  //$(".liButton").on("click", function(event) {
  var route = "/api/dogs/" + $(this).attr("data-id");
  $.ajax(route, {
    type: "DELETE"
  }).then(function() {
    console.log("deleted id ", $(this).attr("data-id"));
    // Reload the page to get the updated list
    window.location.replace("/");
  });
});
$(document.body).on("click", "#edit", function() {
  //$(".liButton").on("click", function(event) {
  //var route = "/api/dogs/" + $(this).attr("data-id");
  window.location.replace("/loadDogData/3");
});
