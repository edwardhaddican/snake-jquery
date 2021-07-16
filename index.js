const snake = {
  body: [
    [8, 10],
    [9, 10],
    [10, 10],
    [11, 10],
  ],
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

  for (let i = 0; i < 420; i++) {
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
      newCell.css("background", "gray");
      newCell.addClass("gray");
    }

    $(".grid").append(newCell);
  }
}

makeGrid();

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

    //setting the current and high score
    $(".currentScore").text(gameState.currentScore);
    $(".highScore").text(gameState.highScore);

    snakeCell.css("background", "green");
  }
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// on Start
function start() {
  // gameState.intervalId = setInterval(tick, 1000 / 30);
  gameState.intervalId = setInterval(tick, 1000 / 10);
}

function moveSnake() {
  let frontOfSnakeX = gameState.snake.body[gameState.snake.body.length - 1][0];
  let frontOfSnakeY = gameState.snake.body[gameState.snake.body.length - 1][1];
  let backOfSnakeX = gameState.snake.body[0][0];
  let backOfSnakeY = gameState.snake.body[0][1];
  let backOfSnake = `#${backOfSnakeX}-${backOfSnakeY}`;

  let currentDirection = gameState.snake.nextDirection;
  console.log(currentDirection);
  if (currentDirection[0] === 0 && currentDirection[1] === 0) {
    //up
    console.log([frontOfSnakeX, frontOfSnakeY - 1]);
    gameState.snake.body.push([frontOfSnakeX, frontOfSnakeY - 1]);
  } else if (currentDirection[0] === 1 && currentDirection[1] === 0) {
    //right
    // console.log([frontOfSnakeX, frontOfSnakeY - 1])
    gameState.snake.body.push([frontOfSnakeX + 1, frontOfSnakeY]);
  } else if (currentDirection[0] === 1 && currentDirection[1] === 1) {
    //down
    gameState.snake.body.push([frontOfSnakeX, frontOfSnakeY + 1]);
  } else if (currentDirection[0] === 0 && currentDirection[1] === 1) {
    //left
    gameState.snake.body.push([frontOfSnakeX - 1, frontOfSnakeY]);
  }

  // gameState.snake.body.push([frontOfSnakeX + 1, frontOfSnakeY]);

  //check if the snake ate an apple
  if (
    frontOfSnakeX === gameState.apple[0] &&
    frontOfSnakeY === gameState.apple[1]
  ) {
    gameState.snake.justEaten = true;
    gameState.currentScore += 1;
  }

  //adjust tail accordingly
  if (gameState.snake.justEaten) {
    gameState.snake.justEaten = false;
  } else {
    console.log("in else? ", backOfSnake);

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
    currentScore: 0,
  };
  $(".grid").empty();
  makeGrid();
  $(".gameOverMessage").addClass("hidden");
  clearInterval(gameState.intervalId);
  renderState();
}

// listeners
// function onBoardClick() {
//   // update state, maybe with another dozen or so helper functions...

//   renderState(); // show the user the new state
// }

// $(".board").on("click", onBoardClick); // etc

// add to above
function tick() {
  // this is an incremental change that happens to the state every time you update...
  moveSnake();
  renderState();
}

// setInterval(tick, 1000 / 30); // as close to 30 frames per second as possible

// now you might have things like
$(window).on("keydown", function (event) {
  // here you might read which key was pressed and update the state accordingly
});

renderState();
$(".controls .reset").click(resetGame);
$(".controls .start").click(start);

//i can deal with direction change by adding a number to the value
// ex for moving down, 21 needs to be added to the number.
// for moving up 21 needs to be subtracted
// left is -1
// right is +1

function upArrowKey() {
  gameState.nextDirection = [0, 0];
  console.log(gameState.nextDirection);
}

function rightArrowKey() {
  gameState.nextDirection = [1, 0];
  console.log(gameState.nextDirection);
}

function downArrowKey() {
  gameState.nextDirection = [1, 1];
  console.log(gameState.nextDirection);
}

function leftArrowKey() {
  gameState.nextDirection = [0, 1];
  console.log(gameState.nextDirection);
}

$(document).keydown(function (e) {
  //e.which is set by jQuery for those browsers that do not normally support e.keyCode.
  let keyCode = e.keyCode || e.which;

  if (keyCode === 38 || keyCode === 87) {
    console.log("Up arrow key hit.");
    upArrowKey();
  }

  if (keyCode === 39 || keyCode === 68) {
    console.log("Right arrow key hit.");
    rightArrowKey();
  }
  if (keyCode === 40 || keyCode === 83) {
    console.log("Down arrow key hit.");
    downArrowKey();
  }

  if (keyCode === 37 || keyCode === 65) {
    console.log("Left arrow key hit.");
    leftArrowKey();
  }
});
