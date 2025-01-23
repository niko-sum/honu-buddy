$(document).ready(function () {
    $("#viewSnorkelingSpots").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#snorkelingCards").offset().top,
        },
        "slow" // Adjust the speed: 'slow', 'fast', or a number in milliseconds
      );
    });
  });
  