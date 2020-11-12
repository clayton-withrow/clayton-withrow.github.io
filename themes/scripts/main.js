function showImage(imgName) {
    var curImage = document.getElementById('currentImg');
    var thePath = 'img/';
    var theSource = thePath + imgName;

    curImage.src = theSource;
}

function changeColor(color) {
    var curBackground = document.getElementById('body');

    curBackground.style = color;
}

function changeHeader(color) {
    var curHeader = document.getElementById('jumbotron');

    curHeader.style = color;
}