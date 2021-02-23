const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

let gameIsLive = true;
let xIsNext = true;

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[2];
  const topMiddle = cellDivs[1].classList[2];
  const topRight = cellDivs[2].classList[2];
  const middleLeft = cellDivs[3].classList[2];
  const middleMiddle = cellDivs[4].classList[2];
  const middleRight = cellDivs[5].classList[2];
  const bottomLeft = cellDivs[6].classList[2];
  const bottomMiddle = cellDivs[7].classList[2];
  const bottomRight = cellDivs[8].classList[2];
};

const handleReset = (e) => {
    console.log(e);
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    const location = classList[1];

    if (classList[2] === 'x'|| classList[2] === 'o'){
        return;
    }
    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
        xIsNext = !xIsNext;
    } else {
        classList.add('o');
        checkGameStatus();
        xIsNext = !xIsNext;
    };
};

resetDiv.addEventListener('click', handleReset);

for(let cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}