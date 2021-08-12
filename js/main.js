$(document).ready(function() {


  // load external files
  // $("#site-navbar").load("navbar.html");

  // Write the site footer
  // $("#site-footer").load("site-footer.html");

  // Get course json list
  var currentCourse = "real-students";

  // Declare and clear the array on load
  var studentsArray = [];

  // read in the array of names
  $.getJSON("json/" + currentCourse + ".json", function(data) {

    // Push the data into an array
    for (let i = 0; i < data.length; i++) {
      studentsArray.push(data[i]);
    }

    // Sort the array
    studentsArray = studentsArray.sort();

    for (let i = 0; i < studentsArray.length; i++) {
      $("#student-list").append("<button data-studentname='" + studentsArray[i] + "' class='btn btn-aliceblue mx-2 my-2 pl-0 student'><span class='badge badge-pill'><i class='fas fa-fw fa-user mr-1'></i></span>" + studentsArray[i] + "</button>");
    }

  });

  function aliceblue() {
    // Remove from all li elements
    $("#randomStudent li").removeClass("btn-aliceblue");
    // Add effects only to first element
    $("#randomStudent li:first-of-type").addClass("btn-aliceblue");
    $("#randomStudent li:first-of-type").removeClass("text-muted");
  }


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
      $("#randomStudent").prepend("<li class='list-group-item text-left p-3 text-center btn-aliceblue'> <i class='mr-4 fas fa-fw fa-user'></i>" + $(this).text() + "</li>");

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
      $("#randomStudent").prepend("<li class='list-group-item text-left p-3 text-center'> <i class='mr-4 fas fa-fw fa-user'></i>" + rando + "</li>");


      // Pop the chosen student off the array
      studentsArray.splice(randomStudent, 1);

      aliceblue();

    }

  });

  // Reset dialog -------------------------------------------------------------
  $("#reset").on("click", function() {

    // Open the dialog box onClick
    $("#dialog-confirm").dialog("open");

    // remove the close button on the modal
    $(".ui-dialog-titlebar-close").remove();
    $(".ui-icon-alert").remove();
    $(".ui-dialog-buttonset button:first-of-type").addClass("btn btn-default");
    $(".ui-dialog-buttonset button:last-of-type").addClass("btn btn-primary");
  });

  $("#dialog-confirm").dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Cancel": function() {
        $(this).dialog("close");
      },
      "Reset Form": function() {
        // Turns the green checked circles to open empty circles
        window.location.reload();
      }
    }
  });

  // Upload new students
  $("#upload").on("click", function() {

    // Get the student names from the textarea
    var studentNames = $("#student-names").val();

    if (studentNames != "") {

      // remove final comma if exists
      studentNames = studentNames.replace(/,\s*$/, "");

      // replace comma + space with just comma
      studentNames = studentNames.replace(/[, ]+/g,",");


      alert(studentNames);
    }
  });




  // Get the date for saving to a filename
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var amPm = "am";
  if (hours >= 12) {
    hours = hours - 12;
    amPm = "pm";
  }
  var minutes = d.getMinutes();

  // Concatenate date and file name
  var fullDate = d.getFullYear() + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day + "-" + hours + minutes + amPm;
  var fileToSave = fullDate + "-participation.txt";

  // Save button
  $("#save-button").on("click", function() {

    var listy = $("#randomStudent li").map(function() {
      return $(this).text();
    }).get().join("\n");

    // $("#randomStudent li").text()

    var blob = new Blob([listy], {
      type: "text/txt;charset=utf-8"
    });
    saveAs(blob, fileToSave);
  });

});
// document.ready
