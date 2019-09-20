$(document).ready(function() {
  // $('nav ul li a')
  $currentLink = null;

  $("body").scroll(function(e) {
    console.log("scrolling");
    console.log(e.target.scrollTop);
  });

  $("#nav ul li").on("click", "a", function(e) {
    e.preventDefault();
    // Animate NavBar Link
    if ($currentLink) {
      $currentLink.animate(
        { color: "#aaa", backgroundColor: "rgb(15, 15, 15)" },
        500
      );
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

  let $featured = null;

  $("#project-container").on("click", "img", function(e) {
    if (
      $(this)
        .prev()
        .css("visibility") === "hidden" &&
      !$featured
    ) {
      $featured = $(this);
      $featured
        .prev()
        .css("visibility", "visible")
        .animate({ opacity: 1.0 }, 400);
      $(`.${$featured.attr("alt").toLowerCase()}`)
        .css("display", "flex")
        .hide()
        .fadeIn();
      $(".blur").addClass("unfocused");
    } else if (
      $(this)
        .prev()
        .css("visibility") === "hidden" &&
      $featured
    ) {
      $featured.prev().animate({ opacity: 0.0 }, 400, () => {
        $featured.prev().css("visibility", "hidden");
        $(".blur").removeClass("unfocused");
        $featured = $(this);
        $featured
          .prev()
          .css("visibility", "visible")
          .animate({ opacity: 1.0 }, 400);
        $(`.${$featured.attr("alt").toLowerCase()}`).fadeOut();
      });
      $(`.${$featured.attr("alt").toLowerCase()}`)
        .css("display", "flex")
        .hide()
        .fadeIn();
      $(".blur").addClass("unfocused");
    } else if (
      $(this)
        .prev()
        .css("visibility") === "visible" &&
      $featured
    ) {
      console.log($featured);
      $featured.prev().animate({ opacity: 0.0 }, 400, () => {
        console.log($featured);
        $featured.prev().css("visibility", "hidden");
        $featured = null;
      });
      $(`.${$featured.attr("alt").toLowerCase()}`).fadeOut();
      $(".blur").removeClass("unfocused");
    }
  });

  $(document).on("click", "body", function(e) {
    if (
      $(e.target).is(".project-name") ||
      ($(e.target).is(".project-info p") && $featured)
    ) {
      return;
    } else if (!$(e.target).is("#project-container div img") && $featured) {
      $featured.prev().animate({ opacity: 0.0 }, 400, () => {
        $featured.prev().css("visibility", "hidden");
        $featured = null;
      });
      $(`.${$featured.attr("alt").toLowerCase()}`).fadeOut();
      $(".blur").removeClass("unfocused");
    }
  });
});
