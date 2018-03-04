$(document).ready(function(){

  var roles = ["team", "about", "projects", "news"];

  for(var j = 0; j < roles.length; j++){
    (function(j){
    $.ajax({
        url: 'views/test/' + roles[j] + '_test.js',
        type: 'GET',
        dataType: 'json',
        success: function(result){
          $.each(result, function(i, field){
            switch(roles[j]){
              case "team":
                var id = "tTeam";
                var stuff = "<div class='col-xs-6 col-sm-4'>"
                      + "<div class='member'>"
                      + "<div class='visual'><img src='" + field.img + "' class='img-responsive' width='200'></div>"
                      + "<div class='text'>"
                      + "<h4>" + field.Name + "</h4>"
                      + "<h6>" + field.status + "</h6>"
                      + "<p>" + field.description + "</p>"
                      + "</div></div></div>";
                break;
              case "about":
                var id = "tAbout";
                var stuff = "<h4>" + field.Name + "</h4><br><p>" + field.description + "</p>";
                break;
              case "projects":
                var id = "tProjects";
                var stuff = "<div class='col-xs-6 col-md-4 project_block'>"
                      + "<img src='" + field.img + "' class='img-responsive'>"
                      + "<h3 class='centered'>" + field.Name + "</h3></div>";
                break;
              case "news":
                var id = "tNews";
                var stuff = "<div class='col-md-12'>"
                      + "<div class='news-container'>"
                      + "<div class='news-img'></div>"
                      + "<h4>" + field.Name + "</h4>"
                      + "<h6>" + field.status + "</h6>"
                      + "<p>" + field.description + "</p>"
                      + "</div></div>";
            }

              var target = $("#" + id).append(stuff);
          });        // each
        }          // success
      });        // ajax
    })(j);

    }
});
