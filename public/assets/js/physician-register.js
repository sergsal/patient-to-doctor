$(document).ready(function() {
  if(getURLParam("error", window.location.href) == "true") {
    showErrors();
  }
});

//Parses query string for errors produced by form submission redirects
function showErrors() {
  var missing = getURLParam('missing[]', window.location.href);
  if (missing) {
    var $list = $('<ul>');
    missing.forEach(function(element) {
      $list.append($('<li>').text("* Missing " + decodeURIComponent(element)));  
    });
    var $helpBlock = $('<p class="help-block">')
      .text("Error resulted from the following:")
      .append($list);
    $('.redirect').addClass('has-error').append($helpBlock);
  }
}

/**
 * From http://jsfiddle.net/mm6Bt/1/
 */
function getURLParam(key,target){
  var values = [];
  if(!target) {
    target = location.href;
  }

  key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

  var pattern = key + '=([^&#]+)';
  var o_reg = new RegExp(pattern,'ig');
  while(true) {
    var matches = o_reg.exec(target);
    if(matches && matches[1]){
      values.push(matches[1]);
    }
    else{
      break;
    }
  }

  if(!values.length){
    return null;   
  }
  else{
    return values.length == 1 ? values[0] : values;
  }
}

function physician_register_validate() {
  console.log('validating');

  var valid = true;

  var $fname = $('#inputFirstName');
  if($fname.val() == "") {
    $fname.parent().addClass('has-error');
    valid = false;
  }
  else {
    $fname.parent().removeClass('has-error');
  }

  var $lname = $('#inputLastName');
  if($lname.val() == "") {
    $lname.parent().addClass('has-error');
    valid = false;
  }
  else {
    $lname.parent().removeClass('has-error');
  }

  var $address1 = $('#inputAddress1');
  if($address1.val() == "") {
    $address1.parent().addClass('has-error');
    valid = false;
  }
  else {
    $address1.parent().removeClass('has-error');
  }

  var $city = $('#inputCity');
  if($city.val() == "") {
    $city.parent().addClass('has-error');
    valid = false;
  }
  else {
    $city.parent().removeClass('has-error');
  }

  var $state = $('#inputState');
  if($state.val() == "") {
    $state.parent().addClass('has-error');
    valid = false;
  }
  else {
    $state.parent().removeClass('has-error');
  }

  var $zip = $('#inputZipCode');
  if($zip.val() == "") {
    $zip.parent().addClass('has-error');
    valid = false;
  }
  else {
    $zip.parent().removeClass('has-error');
  }

  var $phone = $('#inputPhone');
  if($phone.val() == "") {
    $phone.parent().addClass('has-error');
    valid = false;
  }
  else {
    $phone.parent().removeClass('has-error');
  }

  var $specialty = $('#inputSpecialty');
  if($specialty.val() == "") {
    $specialty.parent().addClass('has-error');
    valid = false;
  }
  else {
    $specialty.parent().removeClass('has-error');
  }

  return valid;
}