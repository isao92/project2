require("dotenv").config();

// displayJobInfo function re-renders the HTML to display the appropriate content
function displayJobInfo() {
    const token = process.env.CAREER_TOKEN;
    const id = process.env.CAREER_ID;
    var job = $(this).attr("data-name");
    var queryURL = (`https://api.careeronestop.org/v1/jobsearch/${id}/${job}/CA/25/0/0/0/10/30?source=NLx&showFilters=false`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });

    // Creating an AJAX call for the specific job button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
      var career = response.data;
      // Creating a div to hold the job
      var jobDiv = $("<div class='job'>");

      // Storing the Title data
      var title = career.JobTitle;

      // Creating an element to have the Title displayed
      var pOne = $("<p>").text("Title: " + title);

      // Displaying the Title
      jobDiv.append(pOne);

      // Storing the release year
      var Company = career.Company;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Company: " + Company);

      // Displaying the release year
      jobDiv.append(pTwo);

      // Storing the plot
      var URL = career.URL;

      // Creating an element to hold the URL
      var pThree = $("<img>").text("src" + URL);

      // Appending the URL
      jobDiv.append(pThree);

      // Retrieving the URL for the image
      var location = career.Location;

      // Creating an element to hold the image
      var jobAdd = $("<p>").attr("Location: ", location);

      // Appending the image
      jobDiv.append(jobAdd);

      // Putting the entire job above the previous jobs
      $("#jobs-view").prepend(jobDiv);
    });

  }

  // Function for displaying job data
  function renderButtons() {

    // Deleting the jobs prior to adding new jobs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of jobs
    for (var i = 0; i < jobs.length; i++) {

      // Then dynamicaly geneTitle buttons for each job in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of job-btn to our button
      a.addClass("job-btn");
      // Adding a data-attribute
      a.attr("data-name", jobs[i]);
      // Providing the initial button text
      a.text(jobs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a job button is clicked
  $("#add-job").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var job = $("#job-input").val().trim();

    // Adding job from the textbox to our array
    jobs.push(job);

    // Calling renderButtons which handles the processing of our job array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "job-btn"
  $(document).on("click", ".job-btn", displayJobInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();