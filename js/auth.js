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

//=============password change
    $(".form-add").submit(function(event) {
      var url = "loader.php?a=UserController.User.changePass";
      event.preventDefault();
          var formData = new FormData(this);
          var inputData = $('.form-add');
          var succ;

          $.ajax({
              type    : 'POST',
              url     :  url,
              dataType: 'json',
              cache: false,
              contentType: false,
              processData: false,
              data    : formData,

              success : function( data ) {
                            if(data.success){
                              console.log('done')
                              $(".form-add .callout-success").text("Operation Successful");
                              $(".form-add .callout-success").show(400);
                              // $(".form-add").trigger('reset');
                              // ckUpdate();
                              setTimeout(function() {
                                  location.reload();
                              }, 1000);
                            } else {
                              $(".form-add .callout-danger").text(data.response);
                              console.log(data);
                              $(".form-add .callout-danger").show(400);
                            }
              },
              error   : function(jXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        alert("operation couldn/'t be completed")
              }
          });
    });
