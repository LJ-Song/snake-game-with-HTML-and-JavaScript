// set board style
const boardBorder = 'black';
const boardBackground = 'white';
const snakeCol = 'pink';
const snakeBorder = 'darkblue';
// for snake 2
const snakeCol2 = 'blue';
const snakeBorder2 = 'pink';
// for snake 2
let snake2 = [
  {x: 200, y: 180},
  {x: 190, y: 180},
  {x: 180, y: 180},
  {x: 170, y: 180},
  {x: 160, y: 180}
]

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
];

//set initial score:
let score = 0;
let score2 = 0;
//True if changing direction
let changingDir = false;

//True for snake 2
let changingDir2 = false;
// horizontal movement:
let food_x;
let food_y;
let dx = 10;
// vertical movement
let dy = 0;

let dx2 = 10;
let dy2 = 0;

// get the canvas element
const snakeboard = document.getElementById("gameCanvas");
//return a two dimensional drawing context
const snakeboardCtx = snakeboard.getContext("2d");
const time = 60;
document.getElementById("timer").innerHTML = time;
//start the game
let time_ended = timeEnded(time);
main();


gen_food();

document.addEventListener('keydown', change_direction);
document.addEventListener('keydown', change_direction2);

function main() {

  if (has_game_ended()) {
    if (score == score2) {
      alert('It is a tie! ');
      return;
    }
    alert("Blue Snake Won! ");
    return;
  } 
  if (has_game_ended2()) {
    if (score == score2) {
      alert('It is a tie! ');
      return;
    }
    alert("Pink Snake Won! ");
    return;
  }
  if (time_ended) {
    if (score > score2) {
      alert("Pink Snake Won! ");
      return;
    }
    else if (score == score2) {
      alert("It is a tie! ");
      return;
    }
    else {
      alert("Blue Snake Won! ");
      return;
    }
  }

  changingDir = false;
  changingDir2 = false;
  setTimeout(onTick = () => {
    clearCanvas();
    drawFood();
    moveSnake();
    moveSnake2();
    drawSnake();
    drawSnake2();
    //Repeat
    main();
  }, 100)
}

function clearCanvas() {
  // select the color to fill the drawing
  snakeboardCtx.fillStyle = boardBackground;
  // select the color for the border of the canvas
  snakeboardCtx.strokeStyle = boardBorder;
  //draw a filled rectangle to cover the entire canvas
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  //draw a border around the entire cangvas
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

//draw the snake on the canvas
function drawSnake() {
  //draw each part
  snake.forEach(drawSnakePart);
}

//draw the snake2 on the canvas
function drawSnake2() {
  //draw each part
  snake2.forEach(drawSnakePart2);
}

function drawFood() {
  snakeboardCtx.fillStyle = 'lightgreen';
  snakeboardCtx.strokeStyle = 'darkgreen';
  snakeboardCtx.fillRect(food_x, food_y, 10, 10);
  snakeboardCtx.strokeRect(food_x, food_y, 10, 10);
}

// draw one snake part
function drawSnakePart(snakePart) {
  // set the color of the snake part
  snakeboardCtx.fillStyle = snakeCol;
  // set the border color of the snake part
  snakeboardCtx.strokeStyle = snakeBorder;
  //draw a filled rectangle to represent the snake part at the coordinates
  //the part is located
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
  //darw a border around the snake part
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// draw one snake2 part
function drawSnakePart2(snakePart) {
  // set the color of the snake part
  snakeboardCtx.fillStyle = snakeCol2;
  // set the border color of the snake part
  snakeboardCtx.strokeStyle = snakeBorder2;
  //draw a filled rectangle to represent the snake part at the coordinates
  //the part is located
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
  //darw a border around the snake part
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
 }

 function has_game_ended2() {
   for (let i = 4; i < snake2.length; i++) {
     if (snake2[i].x === snake2[0].x && snake2[i].y === snake2[0].y) return true;
   }
   const hitLeftWall2 = snake2[0].x < 0;
   const hitRightWall2 = snake2[0].x > snakeboard.width - 10;
   const hitTopWall2 = snake2[0].y < 0;
   const hitBottomWall2 = snake2[0].y > snakeboard.height - 10;
   return hitLeftWall2 || hitRightWall2 || hitTopWall2 || hitBottomWall2;
 }


 function random_food(min, max) {
   return Math.round((Math.random()*(max-min) + min) / 10) * 10;
 }

 function gen_food() {
   // generate a random number the food x
   food_x = random_food(0, snakeboard.width - 10);
   food_y = random_food(0, snakeboard.height - 10);
   snake.forEach(function has_snake_eaten_food(part){
     const has_eaten = part.x == food_x && part.y == food_y;
     if (has_eaten) gen_food();
   });
 }

function change_direction2(event) {
   const LEFT_KEY = 65;
   const RIGHT_KEY = 68;
   const UP_KEY = 87;
   const DOWN_KEY = 83;
  // PREVENT THE SNAKE FROM REVERSING
  if (changingDir2) return;
  changingDir2 = true;
  const keyPressed = event.keyCode;
  const goingUp = dy2 === -10;
  const goingDown = dy2 === 10;
  const goingRight = dx2 === 10;
  const goingLeft = dx2 === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx2 = -10;
    dy2 = 0;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx2 = 10;
    dy2 = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx2 = 0;
    dy2 = -10;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx2 = 0;
    dy2 = 10;
  }
 }

 function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
   // PREVENT THE SNAKE FROM REVERSING
   if (changingDir) return;
   changingDir = true;
   const keyPressed = event.keyCode;
   const goingUp = dy === -10;
   const goingDown = dy === 10;
   const goingRight = dx === 10;
   const goingLeft = dx === -10;
   if (keyPressed === LEFT_KEY && !goingRight) {
     dx = -10;
     dy = 0;
   }
   if (keyPressed === RIGHT_KEY && !goingLeft) {
     dx = 10;
     dy = 0;
   }
   if (keyPressed === UP_KEY && !goingDown) {
     dx = 0;
     dy = -10;
   }
   if (keyPressed === DOWN_KEY && !goingUp) {
     dx = 0;
     dy = 10;
   }
  }

function moveSnake() {
  // create the new snake head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // increase score
    score += 10;
    document.getElementById('score').innerHTML = score;
    // generate new food location
    gen_food();
  } else {
    snake.pop();
  }
}


function timeEnded(time) {
  let x = setInterval(onTick = () => {
    time -= 1;
    document.getElementById("timer").innerHTML = time;
    if (time == 0 || (has_game_ended()) || (has_game_ended2())) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = time;
      return true;
    }
  }, 1000)
}

function moveSnake2() {
  // create the new snake head
  const head = {x: snake2[0].x + dx2, y: snake2[0].y + dy2};
  // add the new head to the beginning of snake body
  snake2.unshift(head);
  const has_eaten_food = snake2[0].x === food_x && snake2[0].y === food_y;
  if (has_eaten_food) {
    // increase score
    score2 += 10;
    document.getElementById('score2').innerHTML = score2;
    // generate new food location
    gen_food();
  } else {
    snake2.pop();
  }
}
