let statusDiv = document.querySelector('.status');
const cellDivs = document.querySelectorAll('.game-cell');
const xSymbol = '×';
const oSymbol = '○';
let gameIsLive = true;
let xIsNext = true;
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

const handleCellClick = (e) => {
    const classList = e.target.classList;
    if (!gameIsLive || classList[1] === 'x'|| classList[1] === 'o'){
        return;
    }
    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};

cellDivs.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
})

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
      handleWin(topLeft);
      cellDivs[0].classList.add('won');
      cellDivs[1].classList.add('won');
      cellDivs[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
      handleWin(middleLeft);
      cellDivs[3].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
      handleWin(bottomLeft);
      cellDivs[6].classList.add('won');
      cellDivs[7].classList.add('won');
      cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
      handleWin(topLeft);
      cellDivs[0].classList.add('won');
      cellDivs[3].classList.add('won');
      cellDivs[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
      handleWin(topMiddle);
      cellDivs[1].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight ) {
      handleWin(topRight);
      cellDivs[2].classList.add('won');
      cellDivs[5].classList.add('won');
      cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
      handleWin(topLeft);
      cellDivs[0].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
      handleWin(topRight);
      cellDivs[2].classList.add('won');
      cellDivs[4].classList.add('won');
      cellDivs[6].classList.add('won');
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
      gameIsLive = false;
      winningMessageTextElement.innerText = 'Draw!';
      winningMessageElement.classList.add('show');
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
        statusDiv.innerHTML = `${xSymbol} is next`;
    } else {
        statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        winningMessageTextElement.innerText = `${letterToSymbol(letter)} has won!`;
      } else {
          winningMessageTextElement.innerText = `${letterToSymbol(letter)} has won!`;
      }
    winningMessageElement.classList.add('show')
}

const handleReset = (e) => {
    xIsNext = true;
    gameIsLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    cellDivs.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('won');
    })
    winningMessageElement.classList.remove('show');
}

restartButton.addEventListener('click', handleReset);

