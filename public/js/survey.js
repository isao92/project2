// =========================
// Find button functionality
// =========================
$("#submit").on("click", function (e) {

	// Prevent form from submitting
	e.preventDefault();

	//Grab the user input from the main word search text box.
	userInput = $("#user-input").val().trim().toLowerCase();

	// Integrate user input into our ajax request
	var searchURL = queryURLbase + userInput;
	testAjax(searchURL);

	// Clear previous search
	$("#user-input").empty();
	$("#user-input").val("");

	// Reset the display of the load more button to its initial state
	$("#load-more").css("display", "initial");
});