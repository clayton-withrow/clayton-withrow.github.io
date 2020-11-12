var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails() {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('id', 'mazeCanvas');
}

function setCanvas() {
    var x = document.getElementsByClassName("detail-image")[0].id;
    x = "mazeCanvas";
}

