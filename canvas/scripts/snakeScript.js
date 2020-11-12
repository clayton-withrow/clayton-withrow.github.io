let snake = [  {x: 240, y: 160},
    {x: 220, y: 160},
    {x: 200, y: 160},  
    {x: 180, y: 160},  
    {x: 160, y: 160},];
var score = 0;

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
let dx = 20;
// Vertical velocity
let dy = 0;

var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

gen_food();

document.addEventListener("keydown", change_direction);
document.addEventListener("click", main, {once: true});

ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();

ctx.font = "32px Arial";
ctx.fillStyle = "black";
ctx.fillText("CLICK TO START!", canvas.width/3, canvas.height/2);


// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) {
        alert("GAME OVER.");
        document.location.reload();
    }

    changing_direction = false;

    setTimeout(function onTick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
    drawFood();
    move_snake();
    drawSnake();
    drawScore();
    // Call main again
    main();
    }, 100)
}

function drawCanvas() {
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();
}

/*Function that prints the parts*/
function drawSnake() 
{  
snake.forEach(drawSnakePart);
}

function drawFood() {
ctx.fillStyle = 'red';
ctx.strokestyle = 'black';
ctx.fillRect(food_x, food_y, 20, 20);
ctx.strokeRect(food_x, food_y, 20, 20);
}

function drawScore() {
// Display score on screen
ctx.font = "16px Arial";
ctx.fillStyle = "black";
ctx.fillText("Score: "+ score, 8, 20);
}

function drawSnakePart(snakePart) 
{  
ctx.fillStyle = 'green';  
ctx.strokestyle = 'black';
ctx.fillRect(snakePart.x, snakePart.y, 20, 20);  
ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function has_game_ended()
{  
for (let i = 4; i < snake.length; i++) {
if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
}
const hitLeftWall = snake[0].x < 0;  
const hitRightWall = snake[0].x > canvas.width - 20;
const hitToptWall = snake[0].y < 0;
const hitBottomWall = snake[0].y > canvas.height - 20;

return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

function gen_food() {
// Generate a random number the food x-coordinate
food_x = random_food(0, canvas.width - 20);
// Generate a random number for the food y-coordinate
food_y = random_food(0, canvas.height - 20);
// if the new food location is where the snake currently is, generate a new food location
snake.forEach(function has_snake_eaten_food(part) {
const has_eaten = part.x == food_x && part.y == food_y;
if (has_eaten) gen_food();
});
}

function change_direction(event) 
{  
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

if (changing_direction) return;
changing_direction = true;
const keyPressed = event.keyCode;
const goingUp = dy === -20;
const goingDown = dy === 20;
const goingRight = dx === 20;  
const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight)
    {    
    dx = -20;
    dy = 0;  
    }

    if (keyPressed === UP_KEY && !goingDown)
    {    
    dx = 0;
    dy = -20;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft)
    {    
    dx = 20;
    dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp)
    {    
    dx = 0;
    dy = 20;
    }

}

function move_snake()
{
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Add the new head to the beginning of snake body
    snake.unshift(head);

    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;

    if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+ score, 8, 20);
        // Generate new food location
        gen_food();
    } else {
        // Remove the last part of snake body
        snake.pop();
    }

}