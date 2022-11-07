$(document).ready(function () {
	let activeLink = null;
	let clickedLink = false;
	// hover

	// $(this).hasClass("active")
	// ? null
	// : ()

	$(".sidebar .icon").on("click", function (e) {
		$(".sidebar .dropdown").css({ display: "inline-block" });
	});

	$(".sidebar .icon").hover(
		function (e) {
			let icon = $(this).attr("alt");
			$(this).attr("src", `./images/${icon}-white.png`);
		},
		function (e) {
			let icon = $(this).attr("alt");
			$(this).attr("src", `./images/${icon}1.png`);
		}
	);

	$(".nav-right img").hover(
		function (e) {
			let media = $(this).attr("alt");
			$(this).attr("src", `./images/${media}-white.png`);
		},
		function (e) {
			let media = $(this).attr("alt");
			$(this).attr("src", `./images/${media}1.png`);
		}
	);

	$(".nav-right img").hover(
		function (e) {
			let media = $(this).attr("alt");
			$(this).attr("src", `./images/${media}-white.png`);
		},
		function (e) {
			let media = $(this).attr("alt");
			$(this).attr("src", `./images/${media}1.png`);
		}
	);

	$("#nav ul li a").hover(
		function () {
			if ($(this).hasClass("active")) {
				$(this).css({
					color: "black",
					cursor: "pointer",
				});
			} else {
				$(this).css({
					color: "rgb(255, 255, 255, 0.85)",
					cursor: "pointer",
				});
			}
		},
		function () {
			if ($(this).hasClass("active")) {
				$(this).css({
					color: "black",
					cursor: "pointer",
				});
			} else {
				$(this).css({
					color: "#aaa",
				});
			}
		}
	);

	// $('nav ul li a')
	$currentLink = null;
	let currentSection = null;
	const sidebarHeight = $("#nav .sidebar").outerHeight(true);
	const navHeight = $("#nav ul").outerHeight(true);
	let navBarHeight = navHeight;

	const animateLink = (link) => {
		const isIcon = link && link.hasClass("icon");
		if (isIcon) return;

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
			$currentLink.animate(
				{ color: "black", backgroundColor: "white" },
				500
			);
		}
	};

	$("body").on("scroll", function (e) {
		if (clickedLink) {
			return;
		}
		if (
			e.target.scrollTop >=
			$("#passions").position().top + $("body").scrollTop() - navBarHeight
		) {
			if (currentSection !== "passions") {
				currentSection = "passions";
				animateLink($("a[href='#passions']"));
			}
		} else if (
			e.target.scrollTop >=
			$("#expSkills").position().top +
				$("body").scrollTop() -
				navBarHeight
		) {
			if (currentSection !== "expSkills") {
				currentSection = "expSkills";
				animateLink($("a[href='#expSkills']"));
			}
		} else if (
			e.target.scrollTop >=
			$("#projects").position().top + $("body").scrollTop() - navBarHeight
		) {
			if (currentSection !== "projects") {
				currentSection = "projects";
				animateLink($("a[href='#projects']"));
			}
		} else if (
			e.target.scrollTop >=
			$("#about-me").position().top + $("body").scrollTop() - navBarHeight
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

	$(".smooth-scroll").on("click", "a", function (e) {
		e.preventDefault();

		clickedLink = true;

		animateLink($(this));

		// IF SMALL SCREEN, sidenav
		if ($(".sidebar .dropdown").css("display") !== "none") {
			$(".sidebar .dropdown").css({ display: "none" });
			navBarHeight = sidebarHeight;
		}

		let scrollTo = $($(this).attr("href")).position().top;
		let currentPosition = $("body").scrollTop();
		$("html, body").animate(
			{
				scrollTop: scrollTo + currentPosition - navBarHeight + 1,
			},
			500,
			"linear"
		);
		setTimeout(() => {
			clickedLink = false;
		}, 550);
	});

	let $featured = null;

	$("#project-container").on("click", "img", function (e) {
		let $this = $(`.${$(this).attr("alt").toLowerCase()}`);
		if ($this.css("display") === "none" && !$featured) {
			$featured = $this;
			$featured.css("display", "flex").hide().fadeIn();
			$(".blur").addClass("unfocused");
		} else if ($this.css("display") === "none" && $featured) {
			$(".blur").removeClass("unfocused");
			$featured.fadeOut();
			$featured = $this;
			$featured.css("display", "flex").hide().fadeIn();
			$(".blur").addClass("unfocused");
		} else if ($this.css("display") === "none" && $featured) {
			$featured.fadeOut();
			$featured = null;
			$(".blur").removeClass("unfocused");
		}
	});

	$(document).on("click", "body", function (e) {
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
