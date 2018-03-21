$(function(){
  // =========================================== pager
//   var page = 1;
//   var pages = 1;
//
// function clickies(){
//   var next = $("#nextPage");
//   var prev = $("#prevPage");
//   next.click(function(){
//     if(page < pages){
//       page += 1;
//       getCauses();
//       checkPage();
//     }
//   });
//   prev.click(function(){
//     if(page > 1){
//       page -= 1;
//       getCauses();
//       checkPage();
//     }
//   });
//   function checkPage(){
//     // console.log(pages);
//       if(page == 1){
//         $(next).parent().removeClass("disabled");
//         $(prev).parent().addClass("disabled");
//       } else if (page > 1 && page < pages){
//         $(next).parent().removeClass("disabled");
//         $(prev).parent().removeClass("disabled");
//       } else if (page == pages){
//         $(prev).parent().removeClass("disabled");
//         $(next).parent().addClass("disabled");
//       }
//   }
// };
// ================================================================== get causes
function getCauses(st) {
  var num = 8;
  var status = st || 1;
  if($("#index").length > 0){num = 4;status=1};
  var formURL = "loader.php?a=ProjectsController.Projects.getProjectsList&page="
              + page + "&status=" + status + "&num=" + num;

  $.ajax({
      url: formURL,
      type: 'POST',
      dataType: 'json',
      success:function(data, textStatus, jqXHR){
        if (data.success){
           var count = Object.keys(data.response).length;
           $(".our-causes .row").empty();
           pages = data.cnt;
           $.each(data.response, function(i, field){

             $(".our-causes .row").prepend(html);
           });
         } else {
           $(".our-causes .row").empty();
           var html = "<h4 class='text-center'>პროექტები ვერ მოიძებნა</h4>";
           $(".our-causes .row").prepend(html);
         }
      },

      error: function(jqXHR, textStatus, errorThrown)  {
          console.log(errorThrown);
      }
  });
}
// ================================================================== project status
// function statusChange() {
//   var ongoing = $("#ongoing");
//   var finished = $("#finished");
//
//   $(ongoing).click(function() {
//     getCauses(1);
//     // $(this).addClass("disabled");
//     // $(finished).removeClass("disabled")
//   });
//   $(finished).click(function() {
//     getCauses(2);
//     // $(this).removeClass("disabled");
//     // $(ongoing).toggle("disabled");
//   });
// }
// ====================================================================== /project status
if($("#index").length || $("#causes").length > 0 ) {
  clickies();
  getCauses();
  statusChange();
}
// ================================================================== /get causes
// ================================================================== donation
  // 
  // $(".form-donation").submit(function(event) {
  //       var inputData = $('.form-donation');
  //       var url = "loader.php?a=ProjectsController.Projects.logDonation";
  //       console.log(inputData.serialize());
  //       $.ajax({
  //           type    : 'POST',
  //           url     : url,
  //           dataType: 'json',
  //           data    : inputData.serialize(),
  //           success : function( data ) {
  //                   console.log('submited');
  //                   // console.log(data);
  //                         if(data.success){
  //                           console.log("success");
  //                           // $(".form-donation").submit();
  //                         } else {
  //                           $(".form-donation .alert-danger").text(data.error);
  //                           console.log(data.error);
  //                           $(".form-donation .alert").show(400);
  //                         }
  //           },
  //           error   : function(jXHR, textStatus, errorThrown) {
  //                     console.log('error');
  //                        console.log(errorThrown);
  //
  //           }
  //       });
  //       event.preventDefault();
  // });
// ================================================================== /donation
// ================================================================================== auth
    $(".ajaxLogin .btn").click(function(event) {
          var inputData = $('.ajaxLogin');
          var url = "loader.php?a=UserController.User.login&";
          $.ajax({
              type    : 'POST',
              url     : url,
              // dataType: 'json',
              data    : inputData.serialize(),
              success : function( data ) {
                           var parsed = $.parseJSON(data);
                            if(parsed.success){
                              $(".ajaxLogin").submit();
                            } else {
                              $(".error-box").text(parsed.response);
                              $(".error-box").show(400);
                            }
              },
              error   : function(jXHR, textStatus, errorThrown) {
                           $(".error-box").text(errorThrown);

              }
          });
          event.preventDefault();
    }); //===== /auth

// ========================================================================== single cause
  // if($("#single-cause").length > 0 ){
  //   var url = document.location.href,
  //   params = url.split('?')[1].split('&'),
  //   data = {}, tmp;
  //   for (var i = 0, l = params.length; i < l; i++) {
  //     tmp = params[i].split('=');
  //     data[tmp[0]] = tmp[1];
  //   }
  //   getProject(data.name);
  //   function getProject(s){
  //     var id = s;
  //
  //     var url = "loader.php?a=ProjectsController.Projects.getProjectById&id=" + id;
  //     $.getJSON(url, function(result){
  //       $("#title").html(result.response.name);
  //       $("#desc").html(result.response.description);
  //       $("#full_desc").html(result.response.full_desc);
  //       // console.log(result.response.full_desc);
  //       $("#main_img").attr('src', result.response.main_imgs[0].href);
  //     });
  //   };
  // }
  // ===============================================================================
});
