$(function(){
  var page = 1;
  var page_news = 1;
  // var pages = 1;

function clickies(p){
  var next = $("#nextPage");
  var prev = $("#prevPage");
  checkPage();
  pages = p;
  next.click(function(){
    if(page < pages){
      page += 1;
      getCauses(props[0], page);
      checkPage();
    }
  });
  prev.click(function(){
    if(page > 1){
      page -= 1;
      getCauses(props[0], page);
      checkPage();
    }
  });
  function checkPage(){
    $(next).parent().removeClass("disabled");
    $(prev).parent().removeClass("disabled");
      if(page == 1){
        $(next).parent().removeClass("disabled");
        $(prev).parent().addClass("disabled");
      } else if (page == pages){
        $(next).parent().addClass("disabled");
        $(prev).parent().removeClass("disabled");
      } else if (page == 1 && page == pages){
        $(next).parent().addClass("disabled");
        $(prev).parent().addClass("disabled");
      }
  }
};

function moreBtn(p){
  var n = $(".project_block").length;
  if (n < 8){
    for(var i=0; i < 8-n; n++){
      var ph = "<div class='col-xs-6 col-md-4 project_block'>"
      + "</div>";
      $("#tProjects").append(ph);
    }
  }
  var more = "<div class='col-xs-6 col-md-4' id='more_projects'>"
  + "<h3>იხილეთ მეტი პროექტი</h3>"
  + "<div class='arrow arrow_md rotLeft disabled' id='prevPage'></div>"
  + "<div class='arrow arrow_md rotRight' id='nextPage'></div>"
  + "</div>";
  $(".project_block").last().before(more);
  clickies(p);
}

function moreNews(){
  $("#moreNews").click(function(){
    getCauses(props[1], ++page_news)
  })
}
// ================================================================== get causes
function getCauses(prop, pg) {
  // page = pg || 1;
  var formURL = prop.url + "&page=" + pg;
  $.ajax({
      url: formURL,
      type: 'POST',
      dataType: 'json',
      success:function(data, textStatus, jqXHR){
        if (data.success){
           // var count = Object.keys(data.response).length;
           if(prop.status==1){$(prop.target).empty();}
           var pages = data.cnt;
           $.each(data.response, function(i, field){
             var html ='';
               $.each(prop.html, function(j, fiel){
                 if(j%2){html += eval(fiel);} else {html += fiel;}
               });
             $(prop.target).append(html);
           }); //======/each

           if (prop.status == 2){showToggle();moreNews();};

           if (prop.status==1 && pages>1 ){
             moreBtn(pages);
           };

           showModal();

         } else {
           $(prop.target).empty();
           var html = "<h4 class='text-center'>ვერ მოიძებნა</h4>";
           $(prop.target).prepend(html);
         }
      },

      error: function(jqXHR, textStatus, errorThrown)  {

          console.log(errorThrown);
      }

  });
}

  var props = [
    {
      target:"#tProjects",
      url   : "loader.php?a=ProjectsController.Projects.getProjectsList&status=1&num=8",
      status: 1,
      num   : 9,
      page  : 1,
      html  : ["<div class='col-xs-6 col-md-4 project_block'><img src='",
               "field['img']",
               "' class='img-responsive'><h3 class='centered'>",
               "field['name']",
               "</h3>",
               "field['description']",
               "</div>"]
    },
    {
      target:"#tNews",
      url   : "loader.php?a=ProjectsController.Projects.getProjectsList&status=2&num=6",
      status: 2,
      num   : 6,
      page  : 1,
      html  : ["<div class='col-md-12'><div class='news-container'><img src='",
               "field['img']",
               "'class='news-img img-responsive'><h4>",
               "field['name']",
               "</h4><h6></h6><span class='more'>",
               "field['description']",
               "</span></div></div>"
              ]
    }
    // {
    //   target:"#tTeam",
    //   url   : "loader.php?a=AdminController.Admin.getTeamMembers&num=3",
    //   status: 3,
    //   num   : 3,
    //   page  : 1,
    //   html  : ["<div class='col-xs-6 col-sm-4'><div class='member'><div class='visual'><img src='",
    //            "field['img']",
    //            "' class='img-responsive' width='200'></div><div class='text'><h4>",
    //            "field['name']",
    //            "</h4><h6>",
    //            "field['status']",
    //            "</h6><p>",
    //            "field['description']",
    //            "</p></div></div></div>"]
    // }
  ];
  $.each(props, function(i, field){
    getCauses(field, 1);
  });

// ================================================================== /get causes

// // ========================================================================== single cause
//   if($("#single-cause").length > 0 ){
//     var url = document.location.href,
//     params = url.split('?')[1].split('&'),
//     data = {}, tmp;
//     for (var i = 0, l = params.length; i < l; i++) {
//       tmp = params[i].split('=');
//       data[tmp[0]] = tmp[1];
//     }
//     getProject(data.name);
//     function getProject(s){
//       var id = s;
//
//       var url = "loader.php?a=ProjectsController.Projects.getProjectById&id=" + id;
//       $.getJSON(url, function(result){
//         $("#title").html(result.response.name);
//         $("#desc").html(result.response.description);
//         $("#full_desc").html(result.response.full_desc);
//         // console.log(result.response.full_desc);
//         $("#main_img").attr('src', result.response.main_imgs[0].href);
//       });
//     };
//   }
});
