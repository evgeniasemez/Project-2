$(".dogList").on("click", function(event) {
  event.preventDefault();
  console.log("dog clicked");
  $.ajax("/api/dogs/3", {}).then(function(res) {
    console.log("DogDataUpdate");
    console.log("res - " + res);
    /*resDog.render("doginfo", "");*/
  });
});
