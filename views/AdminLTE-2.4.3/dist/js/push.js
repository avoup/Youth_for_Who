$(function() {
  function ckUpdate(){
    for ( instance in CKEDITOR.instances ) {
      // CKEDITOR.instances[instance].setData('');
      CKEDITOR.instances[instance].updateElement();
    }
  }     //====================================================================== add/update project
  $(".form-add").submit(function(event) {
    event.preventDefault();
        ckUpdate()
        var fileName = $("#imgInput").val();
        var fileName2 = $("#imgInput_main").val();
        var fileData = $("#imgInput").prop("files")[0];
        var fileData2 = $("#imgInput_main").prop("files")[0];
        var inputData = $('.form-add');
        var url, succ;
        var formData = new FormData(this);
        formData.append('imgInput', fileData);
        formData.append('imgInput_main', fileData2);
        if ($("#edit").length > 0 ){
          url = "loader.php?a=ProjectsController.Projects.updateProject";
          succ = "updated";
        } else {
          url = "loader.php?a=ProjectsController.Projects.createProject";
          succ = "added";
        }
        $.ajax({
            type    : 'POST',
            url     : url,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data    : formData,

            success : function( data ) {
                    console.log('submited');
                    console.log(data);
                          if(data.success){
                            console.log('done')
                            $(".form-add .callout-success").text("Project " + succ);
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
                      console.log('error');
                      console.log(errorThrown);

            }
        });
  });
// =============================================================== file upload
  // $('.form-ad').submit(function(){
  //             var fileName = $(this).val();
  //             var file_data = $("#imgInput").prop("files")[0];
  //             var form_data = new FormData();
  //             console.log(form_data);
  //             form_data.append('imgInput', file_data);
  //             console.log(form_data);
  //             if(fileName != "") {
  //               console.log(fileName);
  //               console.log(file_data);
  //                 $.ajax({
  //                 url: "loader.php?a=ProjectsController.Projects.uploadFile&type=1&project_id=196",
  //                 cache: false,
  //                 contentType: false,
  //                 processData: false,
  //                 data: form_data,
  //                 type: 'post',
  //                 success: function(response){
  //                     // var parsed = JSON.parse(response);
  //                     console.log(response);
  //                     // console.log(parsed);
  //
  //                 },
  //                 error: function(jqXHR, textStatus, errorThrown)  {
  //
  //                     console.log(errorThrown);
  //                 }
  //             });
  //           }
  //         });
})
