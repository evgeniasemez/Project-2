$(document).ready(function() {
var nameInput = $("#dog-name");
var nameBreed = $("#dog-breed");
var nameOwner = $("dog-owner");
var dogList = $("tbody"); 
var dogContainer =$(".dog-container");

$(document).on("sumbit", "#dog-form", handleDogFormSubmit);
$(document).on("click", ".delete-dog", handleDogDeleteButtonPress);

getDogs();

// A function to handle what happens when the form is submitted to create a new DOG 
function handleDogFormSubmit(event) {
    event.preventDefault();

    // Don't do anything if the name fields hasnt been filled out
if(!nameInput.val().trim().trim()) {
return;
}

if(!nameBreed.val().trim().trim()) {
    return;
}

if(!nameOwner.val().trim().trim()){
    return;
}
// Calling upsertDog function and passing in the value of the name Inut
upsertDog({
    name: nameInput
      .val()
      .trim()
  });
}

// function for creating a dog. Calls getDogs uopn OfflineAudioCompletionEvent
function upsertDog(dogData) {
    $.post("/api/dogs", dogData)
    .then(getDogs);
}

function createDogRow(dogData) {
    var newTr = $("<tr>");
    newTr.data("dog", dogData);
    newTr.append("<td>" + dogData.name + "<td>");
    if (dogData.Posts) {
        newTr.append("<td>" + dogData.Posts.length + "</td>");
    }else{
        newTr.append("<td>0</td>");
    }
};

    function getDogs() {
        $.get("/api/dogs", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createDogRow(data[i]));              
            }
            renderDogList(rowsToAdd);
            nameInput.val("");
            nameBreed.val("");
            nameOwner.val("");
        });
    };
// function for rending the list of dogs to the page
function renderDogList(rows) {
    dogList.children().not(":last").remove();
    dogContainer.children(".alert").remove();
    if(rows.length) {
        console.log(rows);
        dogList.preppend(rows);
    }
    else {
        renderEmpty(); 
    }
};

function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Please fill first before you can create a Post");
    dogContainer.append(alertDiv);
}

function handleDogDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("dog");
    var id =listItemData.id;
    $.ajax({
        method: "DELETE",
        url:"/api/dogs/" + id
    })
    .then(getDogs);
}
};
