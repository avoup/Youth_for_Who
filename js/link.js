$(function(){
  var page = 1;
  var pages = 1;

function clickies(){
  var next = $("#nextPage");
  var prev = $("#prevPage");
  next.click(function(){
    if(page < pages){
      page += 1;
      getCauses();
      checkPage();
    }
  });
  prev.click(function(){
    if(page > 1){
      page -= 1;
      getCauses();
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
      }
  }
};
// ================================================================== get causes
function getCauses(prop) {
  var formURL = "loader.php?a=ProjectsController.Projects.getProjectsList&page="
              + prop.page + "&status=" + prop.page + "&num=" + prop.num;

  $.ajax({
      url: formURL,
      type: 'POST',
      dataType: 'json',
      success:function(data, textStatus, jqXHR){
        if (data.success){
           var count = Object.keys(data.response).length;
           // console.log(count);
           $(".our-causes .row").empty();
           pages = data.cnt;
           $.each(data.response, function(i, field){
             var html ='';
               $.each(prop.html, function(j, fiel){
                 if(j%2){
                   html += eval(fiel);
                 } else {
                   html += fiel;
                 }
               });
             $(prop.target).append(html);
           });
           showToggle();
           showModal();
         } else {
           $(prop.target).empty();
           var html = "<h4 class='text-center'>პროექტები ვერ მოიძებნა</h4>";
           $(prop.target).prepend(html);
         }
      },

      error: function(jqXHR, textStatus, errorThrown)  {

          console.log(errorThrown);
      }

  });
}
  clickies();
  // var html = "<div class='col-xs-6 col-md-4 project_block'>"
  //       + "<img src='" + field.img + "' class='img-responsive'>"
  //       + "<h3 class='centered'>" + eval(test) + "</h3>"
  //       + "<p>" + field.description + "</p>"
  //       +"</div>";

  var props = [
    {
      target:"#tProjects",
      status: 1,
      num   : 9,
      page  : 1,
      html  : ["<div class='col-xs-6 col-md-4 project_block'><img src='",
               "field['img']",
               "' class='img-responsive'><h3 class='centered'>",
               "field['name']",
               "</h3><p>",
               "field['desc']",
               "</p></div>"]
    },
    {
      target:"#tNews",
      status: 2,
      num   : 6,
      page  : 1,
      html  : ["<div class='col-md-12'><div class='news-container'><div class='news-img'></div><h4>",
               "field['name']",
               "</h4><h6>",
               "field['status']",
               "</h6><span class='more'>",
               "field['description']",
               "</span></div></div>"
              ]
    },
    {
      target:"#tTeam",
      status: 3,
      num   : 3,
      page  : 1,
      html  : ["<div class='col-xs-6 col-sm-4'><div class='member'><div class='visual'><img src='",
               "field['img']",
               "' class='img-responsive' width='200'></div><div class='text'><h4>",
               "field['name']",
               "</h4><h6>",
               "field['status']",
               "</h6><p>",
               "field['description']",
               "</p></div></div></div>"]
    }
  ];
  $.each(props, function(i, field){
    getCauses(field);
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
