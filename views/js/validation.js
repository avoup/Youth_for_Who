// $("#vform").validate({
//   debug: true,
//   submitHandler: function(form) {
//     $(form).ajaxSubmit();
//   },
//   invalidHandler: function(event, validator) {
//     var errors = validator.numberOfInvalids();
//     if(errors) {
//       var message = errors == 1
//       ?'You missed 1 field. It has been highlighted'
//     }
//   }
// })

jQuery.validator.setDefaults({
  debug: true,
  success: "valid",

});
$( "#vform" ).validate({
  rules: {
    username: {
      required: true,
      minlength: 3
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      rangelength: [4, 8]
    },
    repeated_password: {
      required: true,
      equalTo: "#password"
    },
    cityid: {
      required: true,
      range: [1, 1]
    }
  },

  messages: {
    cityid: "we only accept 1 as a city...why?...Fuck you that's why"
  },

  errorPlacement: function(error, element) {
    error.insertBefore(element);
    }
});
