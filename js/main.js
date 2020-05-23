$(document).ready(function() {


  // load external files
  $("#site-navbar").load("navbar.html");

  // Write the site footer
  $("#site-footer").load("site-footer.html");

  // Get course
  // var currentCourse = prompt("Which course are you tracking?");
  var currentCourse = "data-storytelling";

  // Declare and clear the array on load
  var studentsArray = [];

  // read in the array of names
  $.getJSON("json/"+ currentCourse +".json", function(data) {

    // Push the data into an array
    for (let i = 0; i < data.length; i++) {
      studentsArray.push(data[i]);
    }

    // Sort the array
    studentsArray = studentsArray.sort();

    for (let i = 0; i < studentsArray.length; i++) {
      $("#student-list").append("<button data-studentname='" + studentsArray[i] + "' class='btn btn-aliceblue mx-2 my-2 pl-0 student'><span class='badge badge-pill'><i class='fad fa-fw fa-user mr-1'></i></span>" + studentsArray[i] + "</button>");
    }

  });


  function aliceblue() {
    // Remove from all li elements
    $("#randomStudent li").removeClass("btn-aliceblue");
    // Add effects only to first element
    $("#randomStudent li:first-of-type").addClass("btn-aliceblue");
    $("#randomStudent li:first-of-type").removeClass("text-muted");
  }


  // Toggle show and hide the office movie
  // $("#instructions").on("click", function(){
  //   $("#hidey").slideToggle();
  // });

  $(document).on("click", "#student-list button", function() {

    if ($("#sample-students").length) {
      $("#sample-students").remove();
    }


    if ($(this).hasClass("btn-aliceblue")) {

      // Remove student from the array
      var indexor = studentsArray.indexOf($(this).text());
      studentsArray.splice(indexor, 1);

      // change the color
      $(this).removeClass("btn-aliceblue");
      $(this).addClass("btn-light half-opacity");

      // // Change the current first element style
      // $("#randomStudent li:first-of-type").removeClass("btn-aliceblue");
      // $("#randomStudent li:first-of-type").addClass("text-muted");

      // Prepend it to the array
      $("#randomStudent").prepend("<li class='list-group-item text-left p-4 text-center btn-aliceblue'> <i class='mr-4 fad fa-fw fa-user'></i>" + $(this).text() + "</li>");

      aliceblue();

    } else {
      $(this).removeClass("btn-light half-opacity").addClass("btn-aliceblue");

      $("#randomStudent li:contains(" + $(this).text() + ")").remove();

      // Push student back onto the array
      studentsArray.push($(this).text());

      aliceblue();

    }

  });


  // Choose a name at random on click
  $(document).on("click", "#roller", function() {


    if ($("#sample-students").length) {
      $("#sample-students").remove();
    }

    // If array not empty
    if (studentsArray.length > 0) {

      // Randomly select a student
      var randomStudent = Math.floor(Math.random() * Math.floor(studentsArray.length));

      var rando = studentsArray[randomStudent];

      $("#student-list button[data-studentname='" + rando + "']").removeClass("btn-aliceblue").addClass("btn-light").addClass("half-opacity");

      // Write the student's name
      $("#randomStudent").prepend("<li class='list-group-item text-left p-4 text-center'> <i class='mr-4 fad fa-fw fa-user'></i>" + rando + "</li>");


      // Pop the chosen student off the array
      studentsArray.splice(randomStudent, 1);

      aliceblue();

    }

  });


});
// document.ready
