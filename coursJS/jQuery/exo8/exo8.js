

$("#img1").on('drop', function(g){
  e.preventDefault();
  let id = ev.originalEvent.dataTransfer.getData("Text");
});

$("li").on('drag', function(e){
  e.originalEvent.dataTransfer.setData("Text", ev.originalEvent.target.id);
});
