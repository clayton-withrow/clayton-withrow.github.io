var imageCounter = 0;
var imageArray = [];
var largeImageUrl;
var thumb1Url;
var thumb2Url;
var thumb3Url;
var thumb4Url;

function counterIncrement() {
    imageCounter++;
    if (imageCounter === 17) {
        imageCounter = 0;
    }
    displayContents(imageCounter, imageArray);
}

function counterDecrement() {
    imageCounter--;
    if (imageCounter === -1) {
        imageCounter = 16;
    }
    displayContents(imageCounter, imageArray);
}

function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
        }

        httpRequest.onreadystatechange = shuffleArray;
        httpRequest.open('GET', "https://pixabay.com/api/?key=19111705-1c1551411e0a91eebfdf86374&q=yellow+flowers&image_type=photo");
        httpRequest.send();
}

function shuffleArray() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {

            var obj = JSON.parse(httpRequest.responseText);

            imageArray = obj.hits;
            
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                  let j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }

                return array;
              }

            imageArray = shuffle(imageArray);
            
            displayContents(imageCounter, imageArray);

        } else {
            alert('There was a problem with the request.');
        }
    }
}

function displayContents(imageCounter, imageArray) {

    largeImageUrl = imageArray[imageCounter].largeImageURL;

    thumb1Url = imageArray[imageCounter].previewURL;
    thumb2Url = imageArray[imageCounter+1].previewURL;
    thumb3Url = imageArray[imageCounter+2].previewURL;
    thumb4Url = imageArray[imageCounter+3].previewURL;

    console.log(imageCounter+3);

    document.getElementById("detailImage").src = largeImageUrl;
    document.getElementById("thumbImage1").src = thumb1Url;
    document.getElementById("thumbImage2").src = thumb2Url;
    document.getElementById("thumbImage3").src = thumb3Url;
    document.getElementById("thumbImage4").src = thumb4Url;
}

makeRequest();

//Search Request

function makeSearchRequest() {
    var input = document.getElementById("search").value;

    if (input === ""){
        input = "nature";
    }

    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
        }

        httpRequest.onreadystatechange = shuffleArray;
        httpRequest.open('GET', `https://pixabay.com/api/?key=19111705-1c1551411e0a91eebfdf86374&q=${input}&image_type=photo1`);
        httpRequest.send();
}

function changeDisplay() {
    largeImageUrl = imageArray[imageCounter].largeImageURL;
    document.getElementById("detailImage").src = largeImageUrl;
}

function changeDisplay1() {
    largeImageUrl = imageArray[imageCounter+1].largeImageURL;
    document.getElementById("detailImage").src = largeImageUrl;
}

function changeDisplay2() {
    largeImageUrl = imageArray[imageCounter+2].largeImageURL;
    document.getElementById("detailImage").src = largeImageUrl;
}

function changeDisplay3() {
    largeImageUrl = imageArray[imageCounter+3].largeImageURL;
    document.getElementById("detailImage").src = largeImageUrl;
}