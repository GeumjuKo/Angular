
$(document).ready(function() {
  $(".avatarClickTest").css("cursor", "pointer");

  $(".avatarClickTest").on("click", function() {
    $(this).children().each(function(idx, element) {
      console.log(idx, element)
    })
  });

  $("#search").click(function(e) {
    $("#avatar-click-listener").click();
  });

})

