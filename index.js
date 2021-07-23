const snake = {
  body: [
    [8, 10],
    [9, 10],
    [10, 10],
    [11, 10],
  ],
  previousCell: [],
  nextDirection: [1, 0],
  justEaten: false,
  isAlive: true,
};

//directions
// [0,0] up
// [1,0] right
// [1,1] down
// [0,1] left

const gameState = {
  apple: [5, 3],
  snake: snake,
  intervalId: null,
  isAlive: true,
  highScore: 0,
  currentScore: 0,
};

// make grid
function makeGrid() {
  let xCoord = 0;
  let yCoord = 0;
  let counter = 0;

  for (let i = 0; i < 441; i++) {
    const newCell = $("<div></div>").addClass("cell");

    if (counter === 21) {
      yCoord++;
      xCoord = 0;
      counter = 0;
    }

    newCell.attr("id", `${xCoord}-${yCoord}`);
    xCoord++;
    counter++;

    if (i % 2 === 1) {
      newCell.addClass("gray");
    }

    $(".grid").append(newCell);
  }
}

makeGrid();

// on Start
function start() {
  // gameState.intervalId = setInterval(tick, 1000 / 30);
  resetGame();
  gameState.intervalId = setInterval(tick, 1000 / 10);
}

// state
let initialState = {
  apple: [5, 3],
  snake: {
    body: [
      [8, 10],
      [9, 10],
      [10, 10],
      [11, 10],
    ],
    nextDirection: [1, 0],
    justEaten: false,
    highScore: 0,
    currentScore: 0,
    previousCell: [],
  },
};

function buildInitialState() {
  gameState.apple = initialState.apple;
  gameState.snake.body = initialState.snake.body;
  gameState.snake.nextDirection = initialState.snake.nextDirection;
  gameState.snake.justEaten = false;
}
buildInitialState();

// render
function renderState() {
  const snake = gameState.snake.body;
  const apple = gameState.apple;

  let appleX = apple[0];
  let appleY = apple[1];
  let appleCoord = `#${appleX}-${appleY}`;

  //rendering the apple
  let appleCell = $(`${appleCoord}`);
  appleCell.css("background", "red");

  //rendering the snake
  for (let i = 0; i < snake.length; i++) {
    let xCoord = snake[i][0];
    let yCoord = snake[i][1];
    let snakeCoord = `#${xCoord}-${yCoord}`;

    // gameState.snake.lastHead = [xCoord, yCoord]

    let snakeCell = $(`${snakeCoord}`);

    if (xCoord > 20 || xCoord < 0) {
      gameState.snake.isAlive = false;
    }

    if (yCoord > 20 || yCoord < 0) {
      gameState.snake.isAlive = false;
    }

    if (gameState.snake.isAlive === false) {
      $(".gameOverMessage").removeClass("hidden");
      clearInterval(gameState.intervalId);
    } else {
      snakeCell.css("background", "green");
    }

    //checking if the current score is greater than the highScore
    if (gameState.currentScore > gameState.highScore) {
      gameState.highScore = gameState.currentScore;
    }

    gameState.snake.previousCell = [xCoord, yCoord];

    //setting the current and high score
    $(".currentScore").text(gameState.currentScore);
    $(".highScore").text(gameState.highScore);

    snakeCell.css("background", "green");
    //maybe next time use a snake class to make transitioning colors neater.
  }
}

function moveSnake() {
  let frontOfSnakeX = gameState.snake.body[gameState.snake.body.length - 1][0];
  let frontOfSnakeY = gameState.snake.body[gameState.snake.body.length - 1][1];
  let backOfSnakeX = gameState.snake.body[0][0];
  let backOfSnakeY = gameState.snake.body[0][1];
  let backOfSnake = `#${backOfSnakeX}-${backOfSnakeY}`;

  let currentDirection = gameState.snake.nextDirection;

  if (currentDirection[0] === 0 && currentDirection[1] === 0) {
    //up
    gameState.snake.body.push([frontOfSnakeX, frontOfSnakeY - 1]);
  } else if (currentDirection[0] === 1 && currentDirection[1] === 0) {
    //right
    gameState.snake.body.push([frontOfSnakeX + 1, frontOfSnakeY]);
  } else if (currentDirection[0] === 1 && currentDirection[1] === 1) {
    //down
    gameState.snake.body.push([frontOfSnakeX, frontOfSnakeY + 1]);
  } else if (currentDirection[0] === 0 && currentDirection[1] === 1) {
    //left
    gameState.snake.body.push([frontOfSnakeX - 1, frontOfSnakeY]);
  }

  let newX = gameState.snake.body[gameState.snake.body.length - 1][0];
  let newY = gameState.snake.body[gameState.snake.body.length - 1][1];

  //checking if the snake ate itself and ending the game if this happened
  let newHeadOfSnake = $(`#${newX}-${newY}`);

  if (newHeadOfSnake.css("background-color") === "rgb(0, 128, 0)") {
    $(".gameOverMessage2").removeClass("hidden");
    clearInterval(gameState.intervalId);
  }

  //check if the snake ate an apple
  if (
    frontOfSnakeX === gameState.apple[0] &&
    frontOfSnakeY === gameState.apple[1]
  ) {
    gameState.snake.justEaten = true;
    gameState.currentScore += 1;

    //remove the current apple
    let currentAppleLocation = $(
      `#${gameState.apple[0]}-${gameState.apple[1]}`
    );

    if (currentAppleLocation.hasClass("gray")) {
      currentAppleLocation.css("background", "gray");
    } else {
      currentAppleLocation.css("background", "rgb(0,0,0,0");
    }

    //make a new apple
    randomAppleCoord();
  }

  //adjust tail accordingly
  if (gameState.snake.justEaten) {
    gameState.snake.justEaten = false;
  } else {
    if ($(backOfSnake).hasClass("gray")) {
      $(`${backOfSnake}`).css("background", "gray");
    } else {
      $(`${backOfSnake}`).css("background", "rgb(0,0,0,0");
    }
    gameState.snake.body.shift();
  }
}

//on Reset
function resetGame() {
  gameState.apple = [5, 3];
  gameState.snake = {
    body: [
      [8, 10],
      [9, 10],
      [10, 10],
      [11, 10],
    ],
    nextDirection: [1, 0],
    justEaten: false,
    isAlive: true,
    previousCell: [],
  };
  gameState.currentScore = 0;
  $(".grid").empty();
  makeGrid();
  $(".gameOverMessage").addClass("hidden");
  $(".gameOverMessage2").addClass("hidden");
  clearInterval(gameState.intervalId);
  $(".currentScore").text(gameState.currentScore);
  renderState();
}

function tick() {
  // this is an incremental change that happens to the state every time you update...
  moveSnake();
  renderState();
}

$(".controls .reset").click(resetGame);
$(".controls .start").click(start);

function randomAppleCoord() {
  function randomNum() {
    return Math.floor(Math.random() * 21);
  }

  let xCoord = randomNum();
  let yCoord = randomNum();

  let possibleNewAppleCoord = $(`#${xCoord}-${yCoord}`);

  if (possibleNewAppleCoord.css("background-color") === "rgb(0, 128, 0)") {
    randomAppleCoord();
  } else {
    gameState.apple = [xCoord, yCoord];
    let appleCoord = $(`#${xCoord}-${yCoord}`);

    appleCoord.addClass("apple");
  }
}

function upArrowKey() {
  gameState.snake.nextDirection = [0, 0];
}

function rightArrowKey() {
  gameState.snake.nextDirection = [1, 0];
}

function downArrowKey() {
  gameState.snake.nextDirection = [1, 1];
}

function leftArrowKey() {
  gameState.snake.nextDirection = [0, 1];
}

$(document).keydown(function (e) {
  //e.which is set by jQuery for those browsers that do not normally support e.keyCode.
  let keyCode = e.keyCode || e.which;

  if (keyCode === 38 || keyCode === 87) {
    upArrowKey();
  }

  if (keyCode === 39 || keyCode === 68) {
    rightArrowKey();
  }
  if (keyCode === 40 || keyCode === 83) {
    downArrowKey();
  }

  if (keyCode === 37 || keyCode === 65) {
    leftArrowKey();
  }
});

renderState();
