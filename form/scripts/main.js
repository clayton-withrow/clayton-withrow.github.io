function changeText(){
    var nameVal = document.getElementById("nameInput").value;
    var fontVal = document.getElementById("fontSel").value;
    var redVal = document.getElementById("redRange1").value;
    var greenVal = document.getElementById("greenRange1").value;
    var blueVal = document.getElementById("blueRange1").value;

    document.getElementById("name").innerHTML = nameVal;
    document.getElementById("name").style = "font-family: " + fontVal + ";color: rgb(" + redVal + ", " + greenVal + ", " + blueVal + ");";
}

function changeBackground(){
    var redVal2 = document.getElementById("redRange2").value;
    var greenVal2 = document.getElementById("greenRange2").value;
    var blueVal2 = document.getElementById("blueRange2").value;

    document.getElementById("display").style = "background-color: rgb(" + redVal2 + ", " + greenVal2 + ", " + blueVal2 + ");";
}

document.getElementById("boldInput").onchange = function() {
    var name = document.getElementsByClassName("name")[0];
    if (this.checked) {
        name.style.fontWeight = "bold";
    } else {
        name.style.fontWeight = "normal";
    }
}

document.getElementById("italicInput").onchange = function() {
    var name = document.getElementsByClassName("name")[0];
    if (this.checked) {
        name.style.fontStyle = "italic";
    } else {
        name.style.fontStyle = "normal";
    }
}