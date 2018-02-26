$(document).ready(function(){

  $('.menu')
  .addClass('original')
  .clone()
  .insertAfter('.menu')
  .addClass('clone')
  .css('position','fixed')
  .css('top','0')
  .css('margin-top','0')
  .css('z-index','500')
  .removeClass('original')
  .hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position;
    // now only show the cloned, sticky element.

    // Cloned element should always have same
     // left position and width as original element.
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;
    widthOrgElement = orgElement.css('width');
    $('.clone')
    .css('left',leftOrgElement+'px')
    .css('top',0)
    .css('width',widthOrgElement)
    .show();
    $('.original')
    .css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.clone').hide();
    $('.original').css('visibility','visible');
  }
}


  $(".menu_btn").click(function() {
      $('html,body').animate({
          scrollTop: $("#" + this.dataset.name).offset().top - 80},
          'slow');
      // alert($(document).scrollTop());
  });

  $(window).scroll(function(){
    var pos = $(document).scrollTop();
    var act = $(".active");
    var main_pos = $("#main").offset().top - 90;
    var team_pos = $("#team").offset().top - 90;
    var projects_pos = $("#projects").offset().top - 90;
    var news_pos = $("#news").offset().top - 90;
    var contact_pos = $("#contact").offset().top - 90;

    if(pos <= team_pos){
      if(act.attr("class") !== "main_btn"){
        act.removeClass("active");
        $(".main_btn").addClass("active");
      }
    }
    else if(pos <= projects_pos){
      if(act.attr("class") !== "team_btn"){
        act.removeClass("active");
        $(".team_btn").addClass("active");
      }
    }
    else if(pos <= news_pos){
      if(act.attr("class") !== "projects_btn"){
        act.removeClass("active");
        $(".projects_btn").addClass("active");
      }
    }
    else if(pos <= contact_pos - 243){
      if(act.attr("class") !== "news_btn"){
        act.removeClass("active");
        $(".news_btn").addClass("active");
      }
    }
    else if(pos >= contact_pos - 242){
      if(act.attr("class") !== "contact_btn"){
        act.removeClass("active");
        $(".contact_btn").addClass("active");
      }
    }
  });

  $(".menu_open").click(function(){
    $(this).toggleClass("clicked");
    $('.pages').toggleClass("open");
  });

});
