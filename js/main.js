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

    // Toggle show and hide the office movie
    $("#office").on("click", function(){
      $("#hidey").slideToggle();
    });

    // Choose a name at random on click
    $("#roller").on("click", function() {

      // If array not empty
      if (studentsArray.length > 0) {

        // Randomly select a student
        var randomStudent = Math.floor(Math.random() * Math.floor(studentsArray.length));

        // Write the student's name
        $("#randomStudent").prepend("<li class='list-group-item p-3 text-center'>" + studentsArray[randomStudent] + "</li>");

        $("#randomStudent li").removeClass("active");
        $("#randomStudent li").removeClass("p-4").addClass("p-3");
        $("#randomStudent li:first-of-type").addClass("active").addClass("p-4");

        // Pop the chosen student off the array
        studentsArray.splice(randomStudent, 1);
      }

    });

  });



});
// document.ready
