const statusDiv = document.querySelector('.status');
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
    if (!gameIsLive || classList.contains('x') || classList.contains('o')){
        return;
    }
    if (xIsNext) {
        classList.add('x');
    } else {
        classList.add('o');
    }
    checkGameStatus();
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
  let winningRow = [];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
      handleWin(topLeft);
      winningRow = [0, 1, 2];
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
      handleWin(middleLeft);
      winningRow = [ 3, 4, 5];
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
      handleWin(bottomLeft);
      winningRow = [6, 7, 8];
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
      handleWin(topLeft);
      winningRow = [0, 3, 6];
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
      handleWin(topMiddle);
      winningRow = [1, 4, 7]
  } else if (topRight && topRight === middleRight && topRight === bottomRight ) {
      handleWin(topRight);
      winningRow = [5, 2, 8];
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
      handleWin(topLeft);
      winningRow = [0, 4, 8];
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
      handleWin(topRight);
      winningRow = [2, 4, 6];
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
  winningRow.forEach((e) => {
      cellDivs[e].classList.add('won');
  })
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

