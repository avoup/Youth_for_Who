
$.fn.drawTable = function(n){
  var obj = $(this);
  var diff;
  var formURL = "loader.php?a=ProjectsController.Projects.getProjectsList&num=10000";

// ================================================================== get project by id
  function getProjects(){
    $(".getProject").click(function(){
      var id = $(this).parent().siblings(".getId").html();
      var url = "loader.php?a=ProjectsController.Projects.getProjectById&id=" + id;
      $.getJSON(url, function(result){
        $("#idInput").val(id)
        $("#titleInput").val(result.response.name);
        $("#descriptionInput").val(result.response.description);
        $("#coverImgIdInput").val(result.response.cover_img_id);
        $("#mainImgIdInput").val(result.response.main_imgs[0].attach_id);
        CKEDITOR.instances.editor1.setData(result.response.full_desc);
      });
    });
  };
// ================================================================== /get project by id
// ================================================================== draw table
  $.ajax({
    url: formURL,
    type: 'POST',
    dataType: 'json',
    success:function(data, textStatus, jqXHR){
      $.each(data.response, function(i, field){

          var html = "<tr>"
          + "<td class='sr-only getId'>" + field.id + "</td>"
          + "<td>" + field.name + "</td>"
          + "<td></td>"
          + "<td>" + field.description + "</td>"
          + "<td>" + "<button class='btn btn-default getProject' data-toggle='modal' data-target='#edit-modal'><i class='fa fa-edit'></i></button>" + "</td>"
          + "<td>" + "<button class='btn btn-default deleteProj' data-toggle='confirmation' data-title='are you serious?'><i class='fa fa-close'></i></button>" + "</td>"
          + "</tr>";

        $("tbody", obj).append(html);
      });

      $(obj).DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : false
      });
      getProjects();
      deleteProj();
    },

    error: function(jqXHR, textStatus, errorThrown)  {

      console.log(errorThrown);
    }

  });

  // ================================================================== delete project
function deleteProj(){
  var butt = $(".deleteProj");
  var yes = $("#yesButton");

  $(butt).click(function(){
    $("#modal-danger").modal("show");
    var id = $(this).parent().siblings(".getId").html();
    $(yes).click(function(){
      var idURL = "loader.php?a=ProjectsController.Projects.deleteProject&project_id=";
      idURL += id;
      $.ajax({
        url: idURL,
        type: 'POST',
        dataType: 'json',
        success: function (data, textStatus, jqXHR){
          console.log('success');
          if(data.success){
            $("#modal-success").modal("show");
          }
        },
        error: function(data, textStatus, jqXHR){
          console.log('error');
          console.log(textStatus);
        }
      });
    });

  });
}
}
