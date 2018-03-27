$(function() {
  function ckUpdate(){
    for ( instance in CKEDITOR.instances ) {
      // CKEDITOR.instances[instance].setData('');
      CKEDITOR.instances[instance].updateElement();
    }
  }     //====================================================================== add/update project

  $(".form-add").submit(function(event) {
    var url = $(this).attr('action');
    event.preventDefault();
        ckUpdate()
        var formData = new FormData(this);
        if($("#imgInput")){
          var fileName = $("#imgInput").val();
          var fileData = $("#imgInput").prop("files")[0];

        }
        var inputData = $('.form-add');
        var succ;
        formData.append('imgInput', fileData);
        if($("#imgInput_main").lenght){
          var fileName2 = $("#imgInput_main").val();
          var fileData2 = $("#imgInput_main").prop("files")[0];
          formData.append('imgInput_main', fileData2);
        }
        // if ($("#edit").length > 0 ){
        //   url = "loader.php?a=ProjectsController.Projects.updateProject";
        //   succ = "updated";
        // } else {
        //   url = "loader.php?a=ProjectsController.Projects.createProject";
        //   succ = "added";
        // }
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
                            $(".form-add .callout-danger").text(data.error);
                            console.log(data.error);
                            $(".form-add .callout-danger").show(400);
                          }
            },
            error   : function(jXHR, textStatus, errorThrown) {
                      console.log(errorThrown);
                      alert("operation couldn/'t be completed")
            }
        });
  });
})
