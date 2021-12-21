$(document).ready(function () {
  $(".tareastyle").keyup(function(){
    displayMatchingVersions();
  });
});

function countDots(str) {
  return str.split(".").length - 1;
}

function splitDots(str) {
  return str.split(".");
}

function versionArray() {
  return $("td.content1");
}

function versionStructureIsValid(str) {

 // $('error').hide();

  let dots = countDots(str);
console.log(dots);
console.log(str);
  let isValid = false;

  let inputLength = str.length;

  const parsed = parseInt(str, 10);

  isValid = is_numeric(str);

  if(!isValid){
    $('.error').removeClass('hideit');
    $('.error').addClass('showit');
  }
  else{
    $('.error').removeClass('showit');
    $('.error').addClass('hideit');
  }

  console.log(isValid);

  return isValid;
}

function is_numeric(str){
  //taken from:  https://stackoverflow.com/questions/2811031/decimal-or-numeric-values-in-regular-expression-validation
  return /^[1-9]\d*(.\d+)?$/.test(str);
}

function displayMatchingVersions() {
  let versions = versionArray();

  //initialize table coloring to grey
  for (const tableVER of versions) {
    tableVER.style.backgroundColor = "grey";
  }

  let tempinput = $(".tareastyle").val(); //get input from textbox
  let isValid = versionStructureIsValid(tempinput);

  if (isValid) {
    let dots = countDots(tempinput);

    if (dots === undefined) {
      dots = 0;
    }

    //console.log('tempinput:  ' + tempinput);
    //console.log('tempdots:  ' + dots);

    for (const tableVER of versions) {
      let userLeft = 0;
      let userMiddle = 0;
      let userRight = 0;

      if (dots === 0) {
        userLeft = isNaN(parseInt(tempinput, 10)) ? 0 : parseInt(tempinput, 10);
      } else {
        userLeft = isNaN(parseInt(splitDots(tempinput)[0], 10))
          ? 0
          : parseInt(splitDots(tempinput)[0], 10);
        userMiddle = isNaN(parseInt(splitDots(tempinput)[1], 10))
          ? 0
          : parseInt(splitDots(tempinput)[1], 10);
        userRight = isNaN(parseInt(splitDots(tempinput)[2], 10))
          ? 0
          : parseInt(splitDots(tempinput)[2], 10);
      }

      let tableLeft = 0;
      let tableMiddle = 0;
      let tableRight = 0;

      tableLeft = isNaN(parseInt(splitDots(tableVER.innerHTML)[0], 10))
        ? 0
        : parseInt(splitDots(tableVER.innerHTML)[0], 10);
      tableMiddle = isNaN(parseInt(splitDots(tableVER.innerHTML)[1], 10))
        ? 0
        : parseInt(splitDots(tableVER.innerHTML)[1], 10);
      tableRight = isNaN(parseInt(splitDots(tableVER.innerHTML)[2], 10))
        ? 0
        : parseInt(splitDots(tableVER.innerHTML)[2], 10);

      let userLeft_EQ_tableLeft = userLeft === tableLeft;
      let userMiddle_EQ_tableMiddle = userMiddle === tableMiddle;
      let userLeft_LT_tableLeft = userLeft < tableLeft;
      let userMiddle_LT_tableMiddle = userMiddle < tableMiddle;
      let userRight_LT_tableRight = userRight < tableRight;

      //console.log('deciding color...');
      if (userLeft_LT_tableLeft) {
        tableVER.style.backgroundColor = "green";
      }

      if (userLeft_EQ_tableLeft && userMiddle_LT_tableMiddle) {
        tableVER.style.backgroundColor = "green";
      }

      if (
        userLeft_EQ_tableLeft &&
        userMiddle_EQ_tableMiddle &&
        userRight_LT_tableRight
      ) {
        tableVER.style.backgroundColor = "green";
      }
    }

    //console.log('========================================================');
  }
}
