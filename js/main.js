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
    let $this = $(
      `.${$(this)
        .attr("alt")
        .toLowerCase()}`
    );
    if ($this.css("display") === "none" && !$featured) {
      $featured = $this;
      $featured
        .css("display", "flex")
        .hide()
        .fadeIn();
      $(".blur").addClass("unfocused");
    } else if ($this.css("display") === "none" && $featured) {
      $(".blur").removeClass("unfocused");
      $featured.fadeOut();
      $featured = $this;
      $featured
        .css("display", "flex")
        .hide()
        .fadeIn();
      $(".blur").addClass("unfocused");
    } else if ($this.css("display") === "none" && $featured) {
      $featured.fadeOut();
      $featured = null;
      $(".blur").removeClass("unfocused");
    }
  });

  $(document).on("click", "body", function(e) {
    if (
      $(e.target).is(".project-info") ||
      ($(e.target).is(".project-info p") && $featured)
    ) {
      return;
    } else if (!$(e.target).is("#project-container div img") && $featured) {
      $featured.fadeOut();
      $featured = null;
      $(".blur").removeClass("unfocused");
    }
  });
});
