const snake = {
  body: [
    [8, 10],
    [9, 10],
    [10, 10],
    [11, 10],
  ],
  nextDirection: [1, 0],
  justEaten: false,
};

const gameState = {
  apple: [5, 3],
  snake: snake,
  intervalId: null,
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

  for (let i = 0; i < snake.length; i++) {
    // console.log("snake", snake[i]);
    let xCoord = snake[i][0];
    let yCoord = snake[i][1];
    let coord = `#${xCoord}-${yCoord}`;
    let snakeCell = $(`${coord}`);
    // console.log($("#10-7").css('background', 'blue'), 'background')
    snakeCell.css("background", "green");
    // console.log(snakeCell.attr("id"));
  }

  for (let j = 0; j < apple.length; j++) {
    let appleId = apple[j];
    let appleCell = $(`#${appleId}`);
    appleCell.css("background", "red");
  }
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// on Start
function start() {
  gameState.intervalId = setInterval(tick, 1000 / 30);
}

function moveSnake() {
  let frontOfSnakeX = gameState.snake.body[gameState.snake.body.length - 1][0];
  let frontOfSnakeY = gameState.snake.body[gameState.snake.body.length - 1][1];
  let backOfSnakeX = gameState.snake.body[0][0];
  let backOfSnakeY = gameState.snake.body[0][1];
  let backOfSnake = `#${backOfSnakeX}-${backOfSnakeY}`;
  // console.log('move snake', frontOfSnake)
  if (gameState.snake.justEaten) {
    gameState.snake.body.push([frontOfSnakeX + 1, frontOfSnakeY]);
    // console.log(gameState.snake.body);
  } else {
    gameState.snake.body.push([frontOfSnakeX + 1, frontOfSnakeY]);

    if ($(backOfSnake).hasClass("gray")) {
      $(`${backOfSnake}`).css("background", "gray");
    } else {
      $(`${backOfSnake}`).css("background", "rgb(0,0,0,0");
    }

  

    //make a stop condition if the snake gets out of bounds

    gameState.snake.body.shift();
  }
}

//on Reset
function resetGame() {
  gameState.apple = [66];
  gameState.snake = {
    body: [
      [8, 10],
      [9, 10],
      [10, 10],
      [11, 10],
    ],
    nextDirection: [1, 0],
    justEaten: false,
  };
  $(".grid").empty();
  makeGrid();
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
