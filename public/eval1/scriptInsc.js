function verification() {
  // Selecting the input element and get its value 
  var inputVal = document.getElementById("nom").value;
  var inputVal1 = document.getElementById("country").value;
  var inputVal2 = document.getElementById("age").value;
  var inputVal3 = document.getElementById("mail").value;
  // Displaying the value
  //alert(inputVal);
  sessionStorage.setItem('nom', inputVal);
  sessionStorage.setItem('country', inputVal1);
  sessionStorage.setItem('age', inputVal2);
  sessionStorage.setItem('mail', inputVal3);

  console.log(inputVal);
  console.log(inputVal1);
  console.log(inputVal2);
  console.log(inputVal3);
  window.location.href = "index.html";
 /* window.parent.checkResults({
    nom: inputVal,
    country: inputVal1,
    age: inputVal2,
    mail: inputVal3,
  });*/
}

