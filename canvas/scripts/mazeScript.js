var canvas = document.getElementById("mazeCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width-960;
var y = canvas.height-640;
var rectHeight = (canvas.height/6);
var rectWidth = 98;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function drawCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawRect() {
    ctx.beginPath();
    ctx.rect(x, y, rectWidth, rectHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawMaze() {
    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.strokeStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "black";
    //First Line
    ctx.moveTo(0, canvas.height/6);
    ctx.lineTo(860, canvas.height/6);
    //Second Line
    ctx.moveTo(960, (canvas.height/6)*2);
    ctx.lineTo(100, (canvas.height/6)*2);
    //Third Line
    ctx.moveTo(0, (canvas.height/6)*3);
    ctx.lineTo(860, (canvas.height/6)*3);
    //Fourth Line
    ctx.moveTo(960, (canvas.height/6)*4);
    ctx.lineTo(100, (canvas.height/6)*4);
    //Fifth Line
    ctx.moveTo(0, (canvas.height/6)*5);
    ctx.lineTo(860, (canvas.height/6)*5);

    ctx.stroke();
}

function drawBegin() {
    ctx.beginPath();
    ctx.rect(0, 0, 100, canvas.height/6);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawEnd() {
    ctx.beginPath();
    ctx.rect(0, 530, 100, canvas.height/6);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
    drawBegin();
    drawEnd();
    drawRect();
    drawMaze();
    
    if(rightPressed) {
        x += 3.5;
        if (x + rectWidth > canvas.width){
            x -= 3.5;
        }
        else if (y + rectHeight >= ((canvas.height/6)*2)+8 && y <= ((canvas.height/6)*2)-8 && x + rectWidth >= rectWidth) {
            x -= 3.5;
        }
        else if (y + rectHeight >= ((canvas.height/6)*4)+8 && y <= ((canvas.height/6)*4)-8 && x + rectWidth >= rectWidth) {
            x -= 3.5;
        }
    }
    else if(leftPressed) {
        x -= 3.5;
        if (x < 0){
            x += 3.5;
        }
        else if (y <= 0 && x <= 860) {
            x += 0;
        }
        else if (y + rectHeight >= (canvas.height/6) && y <= (canvas.height/6)-4 && x <= 860) {
            x += 3.5;
        }
        else if (y + rectHeight >= ((canvas.height/6)*3)+8 && y <= ((canvas.height/6)*3)-8 && x <= 860) {
            x += 3.5;
        }
        else if (y + rectHeight >= ((canvas.height/6)*5)+8 && y <= ((canvas.height/6)*5)-8 && x <= 860) {
            x += 3.5;
        }
    }
    else if(downPressed) {
        y += 3.5;
        if (y + rectHeight > canvas.height){
            y -= 3.5;
        }
        else if (y + rectHeight > canvas.height/6 && y + rectHeight < (canvas.height/6)*2 && x < 860) {
            y -= 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*2 && y + rectHeight < (canvas.height/6)*3 && x + rectWidth > 100) {
            y -= 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*3 && y + rectHeight < (canvas.height/6)*4 && x < 860) {
            y -= 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*4 && y + rectHeight < (canvas.height/6)*5 && x + rectWidth > 100) {
            y -= 3.5;
        }
        else if (y + rectHeight > ((canvas.height/6)*5)+2 && y + rectHeight < canvas.height+1 && x < 860) {
            y -= 3.5;
        }
    }
    else if(upPressed) {
        y -= 3.5;
        if (y < 0){
            y += 3.5;
        }
        else if (y + rectHeight > canvas.height/6 && y + rectHeight < (canvas.height/6)*2 && x < 860) {
            y += 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*2 && y + rectHeight < (canvas.height/6)*3 && x + rectWidth > 100) {
            y += 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*3 && y + rectHeight < (canvas.height/6)*4 && x < 860) {
            y += 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*4 && y + rectHeight < (canvas.height/6)*5 && x + rectWidth > 100) {
            y += 3.5;
        }
        else if (y + rectHeight > (canvas.height/6)*5 && y + rectHeight < canvas.height && x < 860) {
            y += 3.5;
        }
    }
    if (x === 0 && y === 532) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }
}

var interval = setInterval(draw, 10);