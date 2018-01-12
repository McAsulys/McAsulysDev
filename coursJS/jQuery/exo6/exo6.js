$(document).ready(function(){
  let line = 1;
  $("input[type='submit']").click(function(){
    $("#rendu").append($("<p>").html(line+" "+$("#moninput").val()+"<br>"));
    line++;
  });
});
