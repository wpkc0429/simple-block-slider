jQuery(document).ready(function($){
  $('.blocks-slider-gallery-grid-frontend').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
  $(document).on('click', '.steps-slider', function() {
    var url = $(this).data('url');
    window.open(url, '_blank');
  });


});
