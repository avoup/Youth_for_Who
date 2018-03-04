$(document).ready(function(){
// var s = "<div class='member'><div class='visual'>"
//                   + "<img src='" + field.img + "class='img-responsive' width='200'>"
//                   + "</div>"
//                   + "<div class='text'>"
//                   + "<h4>" + field.Name + "</h4>"
//                   + "<h6>" + field.status + "</h6>"
//                   + "<p>" + field.description + "</h6>"
//                   + "</div></div>";

  $(".btn").click(function(){
    var id = this.id
          $(".target").load("../views/stack.html #" + id, function(){


      $.getJSON("../views/test/" + id + "_test.js", function(result){
          $.each(result, function(i, field){
              $(".team").append("<div class='member'><div class='visual'>"
                                // + "<img src='" + field.img + "class='img-responsive' width='200'>"
                                + "</div>"
                                + "<div class='text'>"
                                + "<h4>" + field.Name + "</h4>"
                                + "<h6>" + field.status + "</h6>"
                                + "<p>" + field.description + "</h6>"
                                + "</div></div>");
          });
        });
      });
    });


  // $('#subbtn').click(function() {
  //   var form = document.getElementById('team_member');
  //   var formData = new FormData(form);
  //   console.log(formData);
  //
  //   $.ajax ({
  //     url: '',
  //     type: "post",
  //     data: data.serialize(),
  //     datatype: "JSON",
  //     beforeSend: function(){
  //
  //     },
  //     success: function(response){
  //
  //     },
  //     error: function(error){
  //
  //     }
  //   })
  // })
});
