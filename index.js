const snake = {
  body: [200, 201, 202, 203],
  nextDirection: [1, 0],
  justEaten: false,
};

const gameState = {
  apple: [66],
  snake: snake, 
  intervalId: null
};

// make grid
function makeGrid() {
  for (let i = 0; i < 420; i++) {
    const newCell = $("<div></div>").addClass("cell");
    newCell.attr("id", i);

    if (i % 2 === 1) {
      newCell.css("background", "gray");
    }

    $(".grid").append(newCell);
  }
}

makeGrid();

// state
let initialState = {
  apple: [66],
  snake: {
    body: [200, 201, 202, 203],
    nextDirection: [1, 0],
    justEaten: false,
  },
};

function buildInitialState() {
  gameState.apple = initialState.apple
  gameState.snake.body = initialState.snake.body
  gameState.snake.nextDirection = initialState.snake.nextDirection
  gameState.snake.justEaten = false
}
buildInitialState();
// render
function renderState() {
  const snake = gameState.snake.body;
  const apple = gameState.apple;

  for (let i = 0; i < snake.length; i++) {
    let id = snake[i];
    let snakeCell = $(`#${id}`);
    snakeCell.css("background", "green");
  }

  for (let j = 0; j < apple.length; j++) {
    let appleId = apple[j];
    let appleCell = $(`#${appleId}`);
    appleCell.css("background", "red");
  }
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// on Start
function start(){
  gameState.intervalId = setInterval(tick, 1000 / 30)
}

function moveSnake(){
  let frontOfSnake = gameState.snake.body[gameState.snake.body.length - 1]
  let backOfSnake = gameState.snake.body[0]
  // console.log('move snake')
  if(gameState.snake.justEaten){
    gameState.snake.body.push(frontOfSnake + 1)
    console.log(gameState.snake.body)
  }else{
    gameState.snake.body.push(frontOfSnake + 1)

    
    if(backOfSnake % 2 === 0){
      $(`#${backOfSnake}`).css("background", "rgb(0,0,0,0");
    }else{
      $(`#${backOfSnake}`).css("background", "gray");
    }

    gameState.snake.body.shift()
   
  }

}


//on Reset
function resetGame() {
  gameState.apple = [66];
  gameState.snake = { body: [200, 201, 202, 203], nextDirection: [1, 0], justEaten: false };
  $('.grid').empty()
  makeGrid()
  clearInterval(gameState.intervalId) 
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
  moveSnake()
  renderState();
}

// setInterval(tick, 1000 / 30); // as close to 30 frames per second as possible

// now you might have things like
$(window).on("keydown", function (event) {
  // here you might read which key was pressed and update the state accordingly
});

renderState()
$(".controls .reset").click(resetGame);
$(".controls .start").click(start);
