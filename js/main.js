$(document).ready(function() {

  // load external files
  $("#site-navbar").load("navbar.html");

  // Write the site footer
  $("#site-footer").load("site-footer.html");

  // Declare and clear the array on load
  var studentsArray = [];

  // read in the array of names
  $.getJSON("json/students.json", function(data) {

    // Push the data into an array
    for (let i = 0; i < data.length; i++) {
      studentsArray.push(data[i]);
    }

    // Sort the array
    studentsArray = studentsArray.sort();

    for (let i = 0; i < studentsArray.length; i++) {
      $("#student-list").append("<button class='btn btn-aliceblue mx-2 my-2 pl-0 student'><span class='badge badge-seconday badge-pill'><i class='fad fa-fw fa-user mr-1'></i></span>" + studentsArray[i] + "</button>");
    }

  });


// Toggle show and hide the office movie
// $("#instructions").on("click", function(){
//   $("#hidey").slideToggle();
// });

// Choose a name at random on click
$("#roller").on("click", function() {

  if ( $("#sample-students").length ) {
    $("#sample-students").remove();
  }

  // If array not empty
  if (studentsArray.length > 0) {

    // Randomly select a student
    var randomStudent = Math.floor(Math.random() * Math.floor(studentsArray.length));

    var rando = studentsArray[randomStudent];

    $("#student-list button:contains('" + rando + "')").removeClass("btn-aliceblue").addClass("btn-light").addClass("half-opacity");

    // Write the student's name
    $("#randomStudent").prepend("<li class='list-group-item text-left p-4 text-center'> <i class='mr-4 fad fa-fw fa-user'></i>" + rando + "</li>");

    $("#randomStudent li").removeClass("bg-aliceblue");
    $("#randomStudent li").removeClass("p-4").addClass("p-3").addClass("text-muted");
    $("#randomStudent li > i").removeClass("fa-megaphone").addClass("fa-user").addClass("text-muted");
    $("#randomStudent li:first-of-type").addClass("bg-aliceblue").addClass("p-4").removeClass("text-muted");
    $("#randomStudent li:first-of-type > i").removeClass("fa-user").addClass("fa-megaphone").removeClass("text-muted");

    // Pop the chosen student off the array
    studentsArray.splice(randomStudent, 1);
  }

});

// Turn the students red
$("#student-list button").on("click", function(){
  $(this).addClass("bg-red");
});


});
// document.ready
