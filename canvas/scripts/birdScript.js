var canvas = document.getElementById("birdCanvas");
    var ctx = canvas.getContext("2d");
    var rectWidth = 100;
    var rectHeight = 100;
    var rectx = 40;
    var recty = canvas.height/2;
    var rectdx = 1;
    var rectdy = 1;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var enterPressed = false;
    var linex = 950;
    var lineCounter = 0;
    var segment1 = 100;
    var score = 0;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
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
        if(e.key == "Up" || e.key == "ArrowUp") {
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


    function drawLine1() {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "black";

        //First Segment
        ctx.moveTo(linex, 0);
        ctx.lineTo(linex, segment1);
        //Second Segment
        ctx.moveTo(linex, segment1+200);
        ctx.lineTo(linex, 640);

        ctx.stroke();
    }


    function drawRect() {
        ctx.beginPath();
        ctx.rect(rectx, recty, rectWidth, rectHeight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }

    function drawScore() {
        // Display score on screen
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+ score, 8, 20);

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Press Enter To Start", canvas.width/2-75, 20);
    }

    function gameOver() {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawCanvas();
        drawRect();
        drawScore();
        
        if (upPressed) {
            recty -= 3;
            if (recty < 0){
                recty = 0;
            }
        }
        else if (downPressed) {
            recty += 3;
            if (recty + rectHeight > canvas.height){
                recty = canvas.height - rectHeight;
            }
        }

        drawLine1();

        if(enterPressed){
            linex -= 2;
            lineCounter += 2;

            if (lineCounter === 960) {
                segment1 = Math.floor((Math.random() * 300) + 1);
                linex = 960;
                lineCounter = 0;
            }
        }


        if(rectx + rectWidth === linex && recty < segment1) {
            gameOver();
        }
        if(rectx + rectWidth === linex && recty + rectHeight > segment1+200){
            gameOver();
        }
        if(rectx === linex && recty < segment1) {
            gameOver();
        }
        if(rectx === linex && recty + rectHeight > segment1+200){
            gameOver();
        }
        if(rectx === linex) {
            score++;
            if(score === 5) {
                alert('YOU WIN!');
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }

    }

    setInterval(draw, 10);