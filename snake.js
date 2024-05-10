let board;
let boxSize = 20;
let rows = 20;
let columns = 20;
let boardHeight = rows * boxSize;
let boardWidth = columns * boxSize;
let context;

//snakeHead
let snakeX = 5 * boxSize;
let snakeY = 5 * boxSize;
let snakeXVelocity = 0;
let snakeYVelocity = 1;
//Food
let foodX;
let foodY;

//snakeBody
let snakeBody = [];
let gameOver = false;
let score = 0;
window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");
  window.addEventListener("keydown", keyClicked);
  placeFood();
  setInterval(update, 100);
};
function update() {
  context.clearRect(0, 0, board.width, board.height);
  if (gameOver) {
    context.fillStyle = "white";
    context.font = "15px Arial ";
    context.fillText(
      "GAME OVER press space to restart game",
      board.width / 6,
      board.height / 2
    );
    return;
  }
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, boxSize, boxSize);
  snakeX = snakeX + snakeXVelocity * boxSize;
  snakeY = snakeY + snakeYVelocity * boxSize;
  context.fillStyle = "green";
  context.fillRect(snakeX, snakeY, boxSize, boxSize);
  context.font = "15px Arial";
  context.fillText(score, 10, 20);
  context.fillStyle = "green";
  if (
    snakeX <= 0 ||
    snakeX >= board.width ||
    snakeY <= 0 ||
    snakeY >= board.height
  ) {
    gameOver = true;
  }
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
  for (var i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    score += 100;
    placeFood();
  }
  for (var i = 0; i < snakeBody.length; i++) {
    foodIndexs = snakeBody[i];
    context.fillRect(foodIndexs[0], foodIndexs[1], boxSize, boxSize);
  }
}
function keyClicked(e) {
  if (e.code === "Space") {
    if (gameOver) {
      resetGame();
    }
  }
  if (e.code === "ArrowUp" && snakeYVelocity != 1) {
    snakeXVelocity = 0;
    snakeYVelocity = -1;
  }
  if (e.code === "ArrowDown" && snakeYVelocity != -1) {
    snakeXVelocity = 0;
    snakeYVelocity = 1;
  }
  if (e.code === "ArrowLeft" && snakeXVelocity != 1) {
    snakeYVelocity = 0;
    snakeXVelocity = -1;
  }
  if (e.code === "ArrowRight" && snakeXVelocity != -1) {
    snakeYVelocity = 0;
    snakeXVelocity = 1;
  }
}
function placeFood() {
  foodX = Math.floor(Math.random() * columns - 1) * boxSize;
  foodY = Math.floor(Math.random() * rows - 1) * boxSize;
  if (foodX < 0 || foodX > board.width || foodY < 0 || foodY > board.height) {
    placeFood();
  }
}
function resetGame() {
  gameOver = false;
  snakeBody = [];
  snakeX = 5 * boxSize;
  snakeY = 5 * boxSize;
  score = 0;
  snakeXVelocity = 0;
  snakeYVelocity = 1;
}
