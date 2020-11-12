var canvas = document.getElementById("pongCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 20;
    var ballx = canvas.width/2;
    var bally = canvas.height/2;
    var direction = 0;
    var balldx = 0;
    var balldy = 0;
    var leftPaddleHeight = 150;
    var leftPaddleWidth = 20;
    var leftPaddleY = (canvas.height-leftPaddleHeight) / 2;
    var rightPaddleHeight = 150;
    var rightPaddleWidth = 20;
    var rightPaddleY = (canvas.height-rightPaddleHeight) / 2;
    var wPressed = false;
    var sPressed = false;
    var upPressed = false;
    var downPressed = false;
    var enterPressed = false;
    var leftCounter = 0;
    var rightCounter = 0;
    var interval;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.key == "w") {
            wPressed = true;
        }
        else if(e.key == "s") {
            sPressed = true;
        }
        else if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }
        else if(e.key == "Enter") {
            enterPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == "w") {
            wPressed = false;
        }
        else if(e.key == "s") {
            sPressed = false;
        }
        else if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = false;
        }
    }

    function determineDirection () {
        direction = Math.floor((Math.random() * 4) + 1);

        if (direction === 1) {
            balldx = 3;
            balldy = 1;
        }
        else if (direction === 2) {
            balldx = 3;
            balldy = -1;
        }
        else if (direction === 3) {
            balldx = -3;
            balldy = 1;
        }
        else if (direction === 4) {
            balldx = -3;
            balldy = -1;
        }

        return balldx, balldy;

    }

    function drawCanvas() {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballx, bally, ballRadius, 0, Math.PI*2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    function drawLeftPaddle() {
        ctx.beginPath();
        ctx.rect(0, leftPaddleY, leftPaddleWidth, leftPaddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawRightPaddle() {
        ctx.beginPath();
        ctx.rect(canvas.width-rightPaddleWidth, rightPaddleY, rightPaddleWidth, rightPaddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Left Score: "+ leftCounter, 8, 20);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Right Score: "+ rightCounter, 840, 20);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("W=UP, S=DOWN", 8, 620);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("USE D-PAD", 840, 620);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Press Enter To Start", canvas.width/2-75, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas();
        drawBall();
        drawLeftPaddle();
        drawRightPaddle();
        drawScore();

        if(enterPressed) {
            ballx += balldx;
            bally += balldy;
        }

        if(ballx + balldx > canvas.width-ballRadius) {
            if(bally > rightPaddleY && bally < rightPaddleY + rightPaddleHeight) {
                balldx = -balldx;
            }
        }
        if(ballx + balldx > canvas.width-ballRadius) {
            balldx = -balldx;
            leftCounter++;
            console.log("left player: " + leftCounter);
            determineDirection();
            ballx = canvas.width/2;
            bally = canvas.height/2;
        }
        if (leftCounter === 5) {
                alert("GAME OVER. LEFT PLAYER WINS.");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }

        if(ballx + balldx < ballRadius) {
            if(bally > leftPaddleY && bally < leftPaddleY + leftPaddleHeight) {
                balldx = -balldx;
            }
        }
        if (ballx + balldx < ballRadius) {
            balldx = -balldx;
            rightCounter++;
            console.log("right player: " + rightCounter);
            determineDirection();
            ballx = canvas.width/2;
            bally = canvas.height/2
        }
        if (rightCounter === 5) {
                alert("GAME OVER. RIGHT PLAYER WINS.");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }

        if(bally + balldy > canvas.height-ballRadius || bally + balldy < ballRadius) {
            balldy = -balldy;
        }

        if(sPressed) {
            leftPaddleY += 7;
            if (leftPaddleY + leftPaddleHeight > canvas.height){
                leftPaddleY = canvas.height - leftPaddleHeight;
            }
        }
        else if(wPressed) {
            leftPaddleY -= 7;
            if (leftPaddleY < 0){
                leftPaddleY = 0;
            }
        }

        if(downPressed) {
            rightPaddleY += 7;
            if (rightPaddleY + rightPaddleHeight > canvas.height){
                rightPaddleY = canvas.height - rightPaddleHeight;
            }
        }
        else if(upPressed) {
            rightPaddleY -= 7;
            if (rightPaddleY < 0){
                rightPaddleY = 0;
            }
        }

    }

    determineDirection();
    var interval = setInterval(draw, 10);