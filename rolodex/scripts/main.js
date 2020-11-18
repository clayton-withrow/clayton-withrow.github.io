// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
  var div = this.parentElement;
  div.style.display = "none";
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("nameInput").value;
    var t = document.createTextNode(inputValue);
    li.style="font-weight: bold;";
    li.appendChild(t);
    if (inputValue === '') {
    alert("Please enter name.");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("nameInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    var detailsLocation = document.createElement("li");
    var cityValue = document.getElementById("cityInput").value;
    if (cityValue === '') {
      alert("Please enter city.");
      }
    var stateValue = document.getElementById("stateInput").value;
    if (stateValue === '') {
      alert("Please enter state.");
      }
    var dl = document.createTextNode("-Location: " + cityValue + ", " + stateValue);
    detailsLocation.style = "list-style-type:none;font-weight: normal;";
    detailsLocation.appendChild(dl);
    li.appendChild(detailsLocation);
    document.getElementById("cityInput").value = "";
    document.getElementById("stateInput").value = "";

    var detailsEmail = document.createElement("li");
    var emailValue = document.getElementById("emailInput").value;
    if (emailValue === '') {
      alert("Please enter e-mail.");
      }
    var de = document.createTextNode("-Email: " + emailValue);
    detailsEmail.style = "list-style-type:none;font-weight: normal;";
    detailsEmail.appendChild(de);
    li.appendChild(detailsEmail);
    document.getElementById("emailInput").value = "";
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
          var div = this.parentElement;
          div.style.display = "none";
      }
    }
  }

//Clearing the list
function removeAll(){
    var lst = document.getElementsByTagName("ul");
      lst[0].innerHTML = "";
  }


//Creation of initial data
function initialData() {
  fetch(`https://randomuser.me/api/?results=10&nat=us`)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    for(i=0; i<5; i++) {
      var li = document.createElement("li");
      var t = document.createTextNode(data.results[i].name.first + " " + data.results[i].name.last);
      li.style="font-weight: bold;";
      li.appendChild(t);
      document.getElementById("myUL").appendChild(li);

      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      var detailsLocation = document.createElement("li");
      var dl = document.createTextNode("-Location: " + data.results[i].location.city + ", " + data.results[i].location.state);
      detailsLocation.style = "list-style-type:none;font-weight: normal;";
      detailsLocation.appendChild(dl);
      li.appendChild(detailsLocation);

      var detailsEmail = document.createElement("li");
      var de = document.createTextNode("-Email: " + data.results[i].email);
      detailsEmail.style = "list-style-type:none;font-weight: normal;";
      detailsEmail.appendChild(de);
      li.appendChild(detailsEmail);
    }

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
          var div = this.parentElement;
          div.style.display = "none";
      }
    }
  })
  .catch(function(error) {
      console.log(error);
  });
}

initialData();