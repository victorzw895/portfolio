$(document).ready(function() {
  // $('nav ul li a')
  $currentLink = null;

  $("#nav ul li").on("click", "a", function(e) {
    e.preventDefault();
    // Animate NavBar Link
    if ($currentLink) {
      $currentLink.animate({ color: "#aaa", backgroundColor: "black" }, 500);
    }
    $currentLink = $(this);
    $currentLink.animate({ color: "black", backgroundColor: "white" }, 500);

    // Animate Scroll
    let navHeight = $("#nav ul").outerHeight(true);
    let scrollTo = $($currentLink.attr("href")).offset().top;
    let currentPosition = $("body").scrollTop();
    console.log($(this));
    $("html, body").animate(
      {
        scrollTop: scrollTo + currentPosition - navHeight
      },
      500,
      "linear"
    );
  });

  let $featuredImage = null;

  $("#project-container").on("click", "img", function(e) {
    if (
      $(this)
        .next()
        .is(":hidden") &&
      !$featuredImage
    ) {
      $featuredImage = $(this);
      $featuredImage.prev().fadeToggle();
      $featuredImage.next().fadeToggle();
    } else if (
      $(this)
        .next()
        .is(":hidden") &&
      $featuredImage
    ) {
      $featuredImage.prev().fadeToggle();
      $featuredImage.next().fadeToggle();
      $featuredImage = $(this);
      $featuredImage.prev().fadeToggle();
      $featuredImage.next().fadeToggle();
    } else if (
      $(this)
        .next()
        .is(":visible")
    ) {
      $featuredImage.prev().fadeToggle();
      $featuredImage.next().fadeToggle();
      $featuredImage = null;
    }
  });

  $(document).on("click", "body", function(e) {
    if (
      $(e.target).is(".project-name") ||
      ($(e.target).is(".project-info p") && $featuredImage)
    ) {
      return;
    } else if (
      !$(e.target).is("#project-container div img") &&
      $featuredImage
    ) {
      $featuredImage.prev().fadeToggle();
      $featuredImage.next().fadeToggle();
      $featuredImage = null;
    }
  });
});
