var userId = 0;

function loadData() {
  //debugger;
  $.ajax("/api/owners/3", {}).then(function (resOwner) {
    console.log("load User");
    console.log(resOwner);
    var addButton = document.getElementById("loadDogPage");
    userId = resOwner.id;
    var userTitle = document.getElementById("ownerName");
    userTitle.textContent = resOwner.name;
    /*resDog.render("doginfo", "");*/
    var route = "/api/dogsByOwner/" + userId;
    $.ajax(route, {}).then(function (resDog) {
      if (resDog !== null) {
        console.log(resDog);
        var userDog = document.getElementById("listItemDog");
        userDog.textContent = resDog.name + " - " + resDog.breed;
        addButton.style.display = "none";
      } else {
        addButton.style.display = "block";
      }
    });
  });
  $.ajax("/api/events", {}).then(function (resEvents) {
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
