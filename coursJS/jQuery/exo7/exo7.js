$(document).ready(function(){
  $("#tb").on('click','a',function(){
    $(this).parent().parent().remove();
  });
  $("input[type='submit']").click(function(){
    let line = $("<tr>");
    line.append(
      $("<td>").html($("#nom").val())
    ).append(
      $("<td>").html($("#prenom").val())
    ).append(
      $("<td>").html($("<a href='#'>").html("X"))
    );

    $("#matable").append(line);
  });
});
