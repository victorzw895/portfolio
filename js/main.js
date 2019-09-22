$(document).ready(function() {
  let activeLink = null;
  let clickedLink = false;
  // hover

  // $(this).hasClass("active")
  // ? null
  // : ()

  $("#nav ul li a").hover(
    function() {
      if ($(this).hasClass("active")) {
        $(this).css({
          color: "black",
          cursor: "pointer"
        });
      } else {
        $(this).css({
          color: "rgb(255, 255, 255, 0.85)",
          cursor: "pointer"
        });
      }
    },
    function() {
      if ($(this).hasClass("active")) {
        $(this).css({
          color: "black",
          cursor: "pointer"
        });
      } else {
        $(this).css({
          color: "#aaa"
        });
      }
    }
  );

  // $('nav ul li a')
  $currentLink = null;
  let currentSection = null;
  let navHeight = $("#nav ul").outerHeight(true);

  const animateLink = link => {
    if ($currentLink) {
      $currentLink.animate(
        { color: "#aaa", backgroundColor: "rgb(15, 15, 15)" },
        500
      );
      $currentLink.removeClass("active");
    }
    if (!link) {
      $currentLink = null;
    } else {
      $currentLink = link;
      $currentLink.addClass("active");
      $currentLink.animate({ color: "black", backgroundColor: "white" }, 500);
    }
  };

  $("body").scroll(function(e) {
    if (clickedLink) {
      return;
    }
    if (
      e.target.scrollTop >=
      $("#passions").position().top + $("body").scrollTop() - navHeight
    ) {
      if (currentSection !== "passions") {
        currentSection = "passions";
        animateLink($("a[href='#passions']"));
      }
    } else if (
      e.target.scrollTop >=
      $("#expSkills").position().top + $("body").scrollTop() - navHeight
    ) {
      if (currentSection !== "expSkills") {
        currentSection = "expSkills";
        animateLink($("a[href='#experience']"));
      }
    } else if (
      e.target.scrollTop >=
      $("#projects").position().top + $("body").scrollTop() - navHeight
    ) {
      if (currentSection !== "projects") {
        currentSection = "projects";
        animateLink($("a[href='#projects']"));
      }
    } else if (
      e.target.scrollTop >=
      $("#about-me").position().top + $("body").scrollTop() - navHeight
    ) {
      if (currentSection !== "about-me") {
        currentSection = "about-me";
        animateLink($("a[href='#about-me']"));
      }
    } else {
      if (currentSection) {
        currentSection = null;
        animateLink(null);
      }
    }
  });

  $("#nav ul li").on("click", "a", function(e) {
    e.preventDefault();

    clickedLink = true;

    animateLink($(this));

    // if ($currentLink) {
    //   $currentLink.animate(
    //     { color: "#aaa", backgroundColor: "rgb(15, 15, 15)" },
    //     500
    //   );
    // }
    // $currentLink = $(this);
    // $currentLink.animate({ color: "black", backgroundColor: "white" }, 500);

    let scrollTo = $($(this).attr("href")).offset().top;
    let currentPosition = $("body").scrollTop();
    $("html, body").animate(
      {
        scrollTop: scrollTo + currentPosition - navHeight + 1
      },
      500,
      "linear"
    );
    setTimeout(() => {
      clickedLink = false;
    }, 550);
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
