$("ul").prepend("<li>le zero item</li>");
$("body").append("<p>cecie est un §</p>");
$("document").ready();
$( document ).ready(function() {
  let baz = $("body").html();
  $("body").html($("<div>").html(baz));

  $("li").each(function(){
    let li = $(this).html();
    $(this).html($("<a href='#'>").html(li));
  });

  $("div[data-type='exemple']").each(function(){
    let h3 = $(this).html();
    $(this).after($("<p>").html(h3));
    $(this).replaceWith($("<h3>").html(h3));
  })
});
