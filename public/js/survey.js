// =========================
// Find button functionality
// =========================

$("#submitSurvey").on("click", function (e) {

	// Prevent form from submitting
	e.preventDefault();

	// Grab the user input from the main word search text box.
	userInput = $("#field").val().trim().toLowerCase();
	grabState = $("#searchState").val().trim();
	grabExp = $("#experience").val().trim();

	// 
	$.ajax({
		method: "GET",
		url: "/results/:keyword/:state",
		data: {
			userInput: $("#field")
				.val()
				.trim(),
			grabState: $("#searchState")
				.val()
				.trim(),
			grabExp: $("#experience")
				.val()
				.trim()
		}
	})
		.then(function (data) {
			console.log("go to Results");

			window.location.replace("/results/" + userInput + "/" + grabState + "/" + grabExp);
			
		
		})
		.catch(function (err) {
			console.log(err);
			alert(err.responseText);
		});

});