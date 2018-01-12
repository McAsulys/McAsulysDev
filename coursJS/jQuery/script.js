let toto;
let reds = $('.rouge');

console.log(reds);

$(".cl").click(function(){
  console.log("j'ai cliqué");
});

$(".rouge").each(function(){
  $(this).click(function(){
    //console.log("c'est un rouge");
  });
});

//version sans soucis de mise a jour du contenue.
$('body').on('click', '.rouge', function(){
  console.log("c'est un rouge");
});

$(".content").append('<div class="rouge">GPT</div>');
$(".content").prepend('<div class="rouge">C.D.I.Y.A</div>');

$("<div class='rouge'>Topaz</div>").appendTo(".content");

$(".cl").wrap("<div>");

console.log($(".cl").text());
$(".cl").text("autre texte");

console.log("zezeze");
$("#ttinput").change(function(){
  console.log($(this).val());
});

$(".rouge").css({
  "color" : "pink",
  "background-color" : "purple",
  "width" : "32%",
  "padding" : "10px 0 10px 0",
  "margin-bottom" : "20px" 
});

$(".rouge").each(function(){
  console.log($(this).attr("data-id"));
});
$(".content").css({
  "display" : "flex",
  "justify-content" : "space-between",
  "text-align" : "center",
  "flex-wrap" : "wrap"
});
$(".rouge").css("font-size", "4em");
