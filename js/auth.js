// ================================================================================== Login
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
    }); //===== /login
