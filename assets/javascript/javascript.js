$(document).ready(function() {

// VARIABLES
var rapperButtons = [
  "kanye west",
  "jay-z",
  "nas",
  "rick ross",
  "t.i.",
  "ludacris",
  "lil kim",
  "kendrick lamar",
  "outkast",
  "j. cole",
  "nicki minaj",
  "eminem",
  "drake",
  "lil wayne",
  "2pac",
  "notorious b.i.g.",
  "big pun",
  "childish gambino",
  "dmx",
  "mos def",
  "cardi b",
  "andre 3000",
];

// FUNCTIONS

// create buttons
function createButtons() {
  $("#all-buttons").empty();
  for (var i = 0; i < rapperButtons.length; i++) {
    var button = $("<button>");
    button.addClass("rapper-button btn btn-info btn-sm");
    button.attr("value", rapperButtons[i]);
    button.text(rapperButtons[i]);
    $("#all-buttons").append(button);
  }
}


// run function to create buttons
createButtons();


// show 10 gifs
function showGifs(apiGif, buttonClicked) {
  $("#all-gifs").empty();
  var gifsLimit = 10;
  for (var i = 0; i < gifsLimit; i++) {
    var stillGif = apiGif.data[i].images.fixed_height_still.url;
    var animatedGif = apiGif.data[i].images.fixed_height.url;

    var gif = $("<img src='" + stillGif + "'>");
    gif.attr("data-still", stillGif);
    gif.attr("data-animate", animatedGif);
    gif.attr("data-state", "still");
    gif.addClass("gif-image");
    $("#all-gifs").append(gif);
  }
};


// on click function to add new button
$("#submit-button").on("click", function(event) {
  event.preventDefault();
  $("#form-error").empty();
  var rapper = $("#add-rapper").val();
  if ($("#add-rapper").val() === "") {
    $("#form-error").text("you didn't enter anything!");
  }
  else {
  rapperButtons.push(rapper);
  createButtons();
}
});

// on keypress of "enter" add new buttons
$("#add-rapper").keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {

      $("#form-error").empty();
      var rapper = $("#add-rapper").val();
      if ($("#add-rapper").val() === "") {
        $("#form-error").text("you didn't enter anything!");
        event.preventDefault();
      }
      else {
        event.preventDefault();
      rapperButtons.push(rapper);
      createButtons();
    }
    }
});

// on click function to show 10 gifs when clicking buttons - create imgs via showGifs function
$(document).on("click", ".rapper-button", function(event) {
      $("#form-error").empty();

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Kh5CLQA3riDrwtrWd2cG0nstsXOjo1CA&q="
  var buttonClicked = $(this).attr("value");

  $.ajax({
    url: queryURL + buttonClicked + "&limit=10",
    method: "GET"
  })

  .done(function(response) {
    showGifs(response, buttonClicked);
    $("#gifs-message").text("CLICK THE GIF TO ANIMATE IT!");
  });

});

$(document).on("click", ".gif-image", function() {
  var state = $(this).attr("data-state");
  console.log(state);
  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  }
  else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
})

});
