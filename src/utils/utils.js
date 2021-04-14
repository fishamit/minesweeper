export const createGameBoard = size => {
  let tmp = new Array();
  let id = 0;
  for (let i = 0; i < size; i++) {
    tmp[i] = new Array();
    for (let j = 0; j < size; j++) {
      tmp[i].push({
        mine: Math.random() > 0.1 ? false : true,
        id,
        n: 0,
        clicked: false,
        flagged: false,
      });
      id++;
    }
  }
  return tmp;
};

export const checkSurroundingRecursion = (array, i, j, boardSize) => {
  const nMines = calcSurroundingMines(array, i, j, boardSize);
  if (array[i][j].clicked || array[i][j].flagged) return;

  if (nMines === 0) {
    array[i][j].clicked = true;
    if (i < boardSize - 1)
      checkSurroundingRecursion(array, i + 1, j, boardSize);
    if (i > 0) checkSurroundingRecursion(array, i - 1, j, boardSize);
    if (j < boardSize - 1)
      checkSurroundingRecursion(array, i, j + 1, boardSize);
    if (j > 0) checkSurroundingRecursion(array, i, j - 1, boardSize);
  } else {
    array[i][j].clicked = true;
    array[i][j].n = nMines;
  }
};

export const calcSurroundingMines = (array, i, j, boardSize) => {
  let nMines = 0;
  if (i > 0) {
    if (array[i - 1][j].mine) nMines++;
    if (j < boardSize - 1) {
      if (array[i - 1][j + 1].mine) nMines++;
    }
    if (j > 0) {
      if (array[i - 1][j - 1].mine) nMines++;
    }
  }
  if (i < boardSize - 1) {
    if (array[i + 1][j].mine) nMines++;
    if (j < boardSize - 1) {
      if (array[i + 1][j + 1].mine) nMines++;
    }
    if (j > 0) {
      if (array[i + 1][j - 1].mine) nMines++;
    }
  }
  if (j > 0) {
    if (array[i][j - 1].mine) nMines++;
  }
  if (j < boardSize - 1) {
    if (array[i][j + 1].mine) nMines++;
  }
  return nMines;
};
