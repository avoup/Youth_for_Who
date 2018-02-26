

    $(function() {
      $("#loadergif").hide();
      $("#loadertick").hide();
      $("#loaderX").hide();
      $("#loadergifE").hide();
      $("#loadertickE").hide();
      $("#loaderXE").hide();
      //-------navbar

      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function() {
      //   if (this.readyState == 4 && this.status == 200) {
      //     response = this.responseText;
      // };
      // xhttp.open("GET", "gimmeJson.php", true);
      // xhttp.send();
      //


      $.getJSON("views/js/statham.json", function(result){
      $.each(result, function(i, field){
          $("#navbar").append("<li><a href='#" + field + "'>" + field + "</a></li>");
          });
        });

        // $('.traki').click(function(e) {
        //         e.preventDefault();
        //         $('.traki').removeClass('active');
        //         $(this).addClass('active');
        //     });


      //-------auth

      $("#username").blur(function() {
        // $("#loadericon").show();
        $.ajax ({
          url: 'loader.php?a=UserController.User.checkUsername',
          type: "post",
          data: $('#username').serialize(),
          datatype: "JSON",
          beforeSend: function(){

            $("#loadergif").show();

          },
          success: function(response){


            var answer = $.parseJSON(response);
            // $("#errorplace").html(answer.response);
            if(answer.success == true){
              $("#loadergif").hide();
              $("#loaderX").hide();
              $("#loadertick").show();
            }else{
              $("#loadergif").hide();
              $("#loadertick").hide();
              $("#loaderX").show();
            }

          },
          error: function(error){

            var answer = $.parseJSON(error);

            $("#errorplace").html(answer.response);
          }
        })
      });



            $("#email").blur(function() {
              // $("#loadericon").show();
              $.ajax ({
                url: 'loader.php?a=UserController.User.checkEMail',
                type: "post",
                data: $('#email').serialize(),
                datatype: "JSON",
                beforeSend: function(){

                  $("#loadergifE").show();

                },
                success: function(response){


                  var answer = $.parseJSON(response);
                  // $("#errorplace").html(answer.response);
                  if(answer.success == true){
                    $("#loadergifE").hide();
                    $("#loaderXE").hide();
                    $("#loadertickE").show();
                  }else{
                    $("#loadergifE").hide();
                    $("#loadertickE").hide();
                    $("#loaderXE").show();
                  }

                },
                error: function(error){

                  var answer = $.parseJSON(error);

                  $("#errorplace").html(answer.response);
                }
              })
            });


        $('.error').hide();
        $(".button").click(function() {

          $('.error').hide();
      	  var username = $("input#username").val();
      		if (username == "") {
            $("label#username_error").show();
            $("input#username").focus();
            return false;
          }
      		var email = $("input#email").val();
      		if (email == "") {
            $("label#email_error").show();
            $("input#email").focus();
            return false;
          }
      		var password = $("input#password").val();
      		if (password == "") {
            $("label#password_error").show();
            $("input#password").focus();
            return false;
          }
          var repeated_password = $("input#repeated_password").val();
          if (repeated_password == "") {
            $("label#repeated_password_error").show();
            $("input#repeated_password").focus();
            return false;
          }
          var cityid = $("input#cityid").val();
          if (cityid == "") {
            $("label#cityid_error").show();
            $("input#cityid").focus();
            return false;
          }



          $.ajax({
            url: 'loader.php?a=UserController.User.register',
            type: "post",
            data:  $('#vform').serialize(),
            datatype: "JSON",
            success: function(response) {
              console.log(response);
              var answer = $.parseJSON(response);

              if(answer.success == true){

                $('#submitted').html("<div id='message'></div>");
                $('#message').html("<h2>Contact Form Submitted!</h2>")
                .append("<p>hasta la vista bitch</p>")
                .hide()
                .fadeIn(1500, function() {
                  $('#message')
                });

              }else{

                $('#errorplace').html("<h2>error response:</h2>");

                for(var error in answer.errors){

                  if(answer.errors[error] !== '0'){
                    $('#errorplace').append("<p>" + answer.errors[error] + "</p>")
                  }
                }
              }

            },
            error: function(error){
              console.log(error);
            }
          });
        return false;

        });
      });
