$.fn.drawTable = function(n, startDate, endDate){
  var obj = $(this);
  var formURL = obj.data("action");

  $("tbody", obj).html('');

  switch(n){
    case "projects":
      formURL += "&num=9999";
      var response = "response",
          buttons = "<td><button class='btn btn-default getProject' data-toggle='modal' data-target='#edit-modal'><i class='fa fa-edit'></i></button></td>"
                  + "<td><button class='btn btn-default deleteProj' data-toggle='confirmation' data-title='are you serious?'><i class='fa fa-close'></i></button></td>";
      var deleteURL = "loader.php?a=ProjectsController.Projects.deleteProject&project_id=";
      break;
    case "team_members":
      var response = "";
      var buttons = "<td><button class='btn btn-default getProject' data-toggle='modal' data-target='#edit-modal'><i class='fa fa-edit'></i></button></td>"
              + "<td><button class='btn btn-default deleteProj' data-toggle='confirmation' data-title='are you serious?'><i class='fa fa-close'></i></button></td>";
      var deleteURL = "loader.php?a=AdminController.Admin.deleteTeamMember&id=";
    case "logs":
      formURL += "&start_date=" + startDate + "&end_date=" + endDate;
      var response = "",
          buttons = "";
  }

// ================================================================== draw table
  $.ajax({
    url: formURL,
    type: 'POST',
    dataType: 'json',
    success:function(data, textStatus, jqXHR){
      if(data.success){
        console.log(data);
        response = data[response] != undefined ? data[response] : data;
        $.each(response, function(i, field){
          var optional = field.description || field.amount ,
              date;
          // lastName = field.lastName;
          date = field.create_date != undefined ? "<td>" + field.create_date + "</td>" : '';
          optional = optional != undefined ? optional : '';
          var html = "<tr>"
          + "<td class='sr-only getId'>" + field.id + "</td>"
          + "<td>" + field.name + "</td>"
          // + lastName
          + date
          + "<td>" + optional + "</td>"
          + buttons
          + "</tr>";

          $("tbody", obj).append(html);
          // console.log(field);
        });

        $(obj).DataTable({
          'paging'      : false,
          'lengthChange': false,
          'searching'   : false,
          'retrieve'    : true,
          'ordering'    : true,
          'info'        : true,
          'autoWidth'   : false
        });
        getProjects();
        deleteProj(deleteURL);
      } else {
        alert(data.response)
      }
    },

    error: function(jqXHR, textStatus, errorThrown)  {

      console.log(errorThrown);
    }

  });
  // ================================================================== get project by id
    function getProjects(){
      $(".getProject").click(function(){
        var id = $(this).parent().siblings(".getId").html();
        var url = "loader.php?a=ProjectsController.Projects.getProjectById&id=" + id;
        $.getJSON(url, function(result){
          // console.log(result.response.desc);
          $("#idInput").val(id)
          $("#titleInput").val(result.response.name);
          $("#descriptionInput").val(result.response.description);
          $("#coverImgIdInput").val(result.response.cover_img_id);
          $("#mainImgIdInput").val(result.response.main_imgs[0].attach_id);
          // $("#imgInput").val(result.response.files);
          CKEDITOR.instances.editor1.setData(result.response.full_desc);
        });
      });
    };

  // ================================================================== /get project by id
  // ================================================================== delete project
function deleteProj(u){
  var butt = $(".deleteProj");
  var yes = $("#yesButton");

  $(butt).click(function(){
    $("#modal-danger").modal("show");
    var id = $(this).parent().siblings(".getId").html();
    $(yes).click(function(){
      // if($("#team"))
      var idURL = u;
      idURL += id;
      $.ajax({
        url: idURL,
        type: 'POST',
        dataType: 'json',
        success: function (data, textStatus, jqXHR){
          console.log('success');
          if(data.success){
            $("#modal-success").modal("show");
          } else {
            alert("operation couldn't be completed");
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
function getAbout(){
  var url = "loader.php?a=MenuController.Menu.getPageData";
  $.getJSON(url, function(result){
    CKEDITOR.instances.editor1.setData(result[0].text);
  })
}
