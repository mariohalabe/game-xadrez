const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const buttoExit = document.querySelector('[data-button]')

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    isCircleTurn = false;
    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    };


    setBoardHover();
    winningMessage.classList.remove('message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageText.innerText = "Empate!";
    } else {
        winningMessageText.innerText = isCircleTurn ? 'O Venceu!' : 'X Venceu';
    }

    winningMessage.classList.add("message")
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const empate = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") ||   cell.classList.contains("circle")
    });
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHover = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');

    } else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHover();
};



const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = empate();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {

        swapTurns();
    }
};


startGame();
buttoExit.addEventListener('click', startGame)