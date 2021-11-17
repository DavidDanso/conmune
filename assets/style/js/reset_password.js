//Navigation
$(document).ready(function () {
  //
  $(".nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  //
  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 0) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
});

//
$(window)
  .scroll(function () {
    var $window = $(window),
      $body = $("body"),
      $panel = $(".row");

    var scroll = $window.scrollTop() + $window.height() / 3;

    $panel.each(function () {
      var $this = $(this);
      if (
        $this.position().top <= scroll &&
        $this.position().top + $this.height() > scroll
      ) {
        $body.removeClass(function (index, css) {
          return css.match(/(^|\s)color-\s+/g) || [].join(" ");
        });
        $(".row").removeClass("active");
        $this.addClass("active");
      }
    });
  })
  .scroll();

//Cursor animation
let mouseCursor = document.querySelector(".cursor");
let links = document.querySelectorAll("a");

window.addEventListener("mousemove", cursor);

function cursor(e) {
  gsap.to(mouseCursor, 0.4, {
    x: e.clientX,
    y: e.clientY,
  });
}

links.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-grow");
    gsap.to(mouseCursor, 0.4, {
      scale: 1,
    });
  });

  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-grow");
    gsap.to(mouseCursor, 0.4, {
      scale: 2,
    });
  });
});

//Lax effect
window.onload = function () {
  document.getElementById("main").classList.add("loaded");

  lax.setup();

  const update = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(update);
  };

  window.requestAnimationFrame(update);

  let w = window.innerWidth;
  window.addEventListener("resize", function () {
    if (w !== window.innerWidth) {
      lax.updateElements();
    }
  });
};

// Smooth Scrolling //
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });
