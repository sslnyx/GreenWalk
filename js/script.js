jQuery(document).ready(function ($) {

// $('.ml6 .letters').each(function(){
//   $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
// });

// anime.timeline({loop: false})
//   .add({
//     targets: '.ml6 .letter',
//     translateY: ["1.1em", 0],
//     translateZ: 0,
//     duration: 750,
//     delay: function(el, i) {
//       return 50 * i;
//     }
//   }).add({
//     targets: '.ml6',
//     opacity: 1,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

// $('.modal').on('shown.bs.modal', function () {
//     $(this).find('form').validator('destroy').validator()
// });

$('#myForm').on('submit', function(e){
  $('#myModal').modal('show');
  e.preventDefault();
});



// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          // var $target = $(target);
          // $target.focus();
          // if ($target.is(":focus")) { // Checking if the target was focused
          //   return false;
          // } else {
          //   $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
          //   $target.focus(); // Set focus again
          // };
        });
      }
    }
  });
 
 

  
 }(jQuery));