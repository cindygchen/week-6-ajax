// Initial array of food options
var foods = ["Tacos", "Ice Cream", "Burgers", "Salad", "Donut", "Sandwiches", "Fruit", "Pizza", "Pasta", "Beer", "Wine"];

// displayFoodInfo function re-renders the HTML to display the appropriate content
function displayFoodInfo() {

  $("#foods-view").html("");
  var food = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
  url: queryURL,
  method: "GET"
  })

  // after data comes back from the request
  .done(function(response) {
  console.log(queryURL);
  console.log(response);

  //Storing data from the AJAX request in the results variable
  var results = response.data;

    // Looping thorugh each result item
    for (var i=0; i < results.length; i++) {
      // Creating a div to hold the food
      var foodDiv = $("<div class='food'>");

      //Creating and storing an image tag
      var foodImage = $("<img>").addClass('gifs');
      //Setting the src attribute of the image to a property pulled off the result item
      foodImage.attr("src", results[i].images.fixed_height_still.url);
      foodImage.attr("data-still", results[i].images.fixed_height_still.url);
      foodImage.attr("data-animate", results[i].images.fixed_height.url);
      foodImage.attr("data-state", "still");

      // Storing the rating data
      var rating = results[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      //Appending the paragraph and image tag to the foodDiv
      foodDiv.append(pOne);
      foodDiv.append(foodImage);

      // Putting the entire food above the previous food
      $("#foods-view").prepend(foodDiv);
    }
  });
}


// Function for displaying food data
function renderButtons() {

  // Deleting the foods prior to adding new food
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of food
  for (var i = 0; i < foods.length; i++) {

  // Then dynamicaly generating buttons for each food in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var a = $("<button>");
  // Adding a class of food to our button
  a.addClass("foodie");
  // Adding a data-attribute
  a.attr("data-name", foods[i]);
  // Providing the initial button text
  a.text(foods[i]);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(a);
  }
}

// This function handles events where a food button is clicked
$("#add-food").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var food = $("#food-input").val().trim();

  // Adding food from the textbox to our array
  foods.push(food);

  // Calling renderButtons which handles the processing of our food array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "food"
$(document).on("click", ".foodie", displayFoodInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//stopping and starting a gif
$(document).on("click", ".gifs", function() {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } 
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});




















