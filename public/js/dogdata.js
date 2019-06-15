$(".addDog").on("click", function(event) {
  event.preventDefault();
  console.log("Add Dog button");
  $.ajax("/loadDogData/1", {}).then(function(req, resDog) {
    console.log("DogDataUpdate");
    console.log("req - " + req);
    console.log("resDog - " + resDog);
    resDog.render("doginfo", req);
    /*resDog.render("doginfo", "");*/
  });
});
