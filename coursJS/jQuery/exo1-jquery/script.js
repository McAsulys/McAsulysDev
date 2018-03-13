$(document).ready(function(){
  $("#btn-animate").on("click", function(){
    $h2 = $("h2");
    $h2.addClass('titre');
    $h2.animate(
      {
        'marginLeft' : 150,
        'marginTop' : '+=15',
      },{
        duration : 200,
        complete : function(){
          console.log("Animation terminé");
        }
      }
    );
  });

  $(document).on('click', '#btn-hidetext', function(){
    let $p = $('#content p');
    $p.toggleClass('hide');
    console.log("truc");
  });

  $(document).on("click", '#btn-link', function(){
    let $logo = $("#logo-jquery");
    $logo.attr("href", "http://mcasulys.fr");
  });

  $(document).on("click", "#btn-enabled", function(){
    let $btn = $("button:not(#btn-enabled)");
    let disabled = $btn.attr("disabled");
    if (disabled == 'disabled') {
      $btn.attr('disabled', null);
    }
    else {
      $btn.attr('disabled', "disabled");
    }
  });

  $('form [required="required"]').attr('data-required', "required");
  $('form [required="required"]').attr('required', null);

  $(document).on('focus', "input, select", function(){
    let $fieldset = $(this).parents("fieldset");
    $fieldset.addClass('focus-field');
  });
  $(document).on('blur', 'input, select', function(){
    let $fieldset = $(this).parents("fieldset");
    $fieldset.removeClass('focus-field valid-field error-field');

    var state = valideField($(this));
    if(state.isValid){
      $fieldset.addClass('valid-field');
    }else {
      $fieldset.addClass('error-field');
    }
  });

  function valideField($field){
    let value = $field.val();
    let isRequired = false;
    let result = {isValid : true, value : value};
    if($field.attr('data-required') == "required"){
      isRequired = true;
    }
    if (isRequired == true && value == '') {
      result.isValid = false;
    }
    if(result.isValid == true){
      if ($field.attr('type') == 'email'){
        let reg = /^toto@/;
        if(value.match(reg) == null){
          result.isValid = false;
        }
      }
      else {
        if ($field.attr('data-validation') == 'borne') {
          var min = Number($field.attr('data-min'));
          var max = Number($field.attr('data-max'));
          if (value > max || value < min) {
            result.isValid = false;
          }
        }
      }
    }
    console.log(result);
    return result;
  }

  $(document).on('click', 'form', function(e){
    e.preventDefault();
    $('input, select').trigger('blur');
    if($('fieldset.error-field').length > 0){
      console.log("ERROR");
    }else {
      console.log('OK');
      let data = $('form').serializeArray();
    }
  });
});
