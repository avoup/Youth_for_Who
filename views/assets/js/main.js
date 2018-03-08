function showToggle() {
    // Configure/customize these variables.
    var showChar = 100;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.more').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">'
                     + ellipsestext + '&nbsp;</span><span class="morecontent"><span>'
                     + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">'
                     + moretext + '</a></span>';
            $(this).html(html);
        }

    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}



function showModal() {
    var modal = document.getElementById('myModal');

    var proj = $('.project_block');
    var modalImg = document.getElementById("img01");
    var modalTitle = document.getElementById("title");
    var modalDesc = document.getElementById("desc");

    proj.click(function(){
        modal.style.display = "block";
        modalImg.src = $(this).find('img').attr('src');
        modalTitle.innerHTML = $(this).find('h3').html();
        modalDesc.innerHTML = $(this).find('p').html();
    })

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}
// aaaaaaaaaaaaaaaaa

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
