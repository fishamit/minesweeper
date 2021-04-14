import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import {
  createGameBoard,
  calcSurroundingMines,
  checkSurroundingRecursion,
} from "./utils/utils";

export default function App() {
  const [arrBoard, setArrBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const setBoard = size => {
    setBoardSize(size);
    setArrBoard(createGameBoard(size));
    setGameOver(false);
  };

  const handleRightClick = (e, id) => {
    e.preventDefault();
    const tmp = [...arrBoard];
    tmp.forEach(row =>
      row.forEach(square => {
        if (square.id === id && !square.clicked) {
          square.flagged = !square.flagged;
        }
      })
    );
    setArrBoard(tmp);
  };
  const handleClick = id => {
    let finishLoop = false;
    const tmp = [...arrBoard];
    for (let i = 0; i < boardSize; i++) {
      if (gameOver || finishLoop) break;
      for (let j = 0; j < boardSize; j++) {
        if (arrBoard[i][j].id === id) {
          if (arrBoard[i][j].mine) {
            setGameOver(true);
            return;
          } else {
            const nMines = calcSurroundingMines(tmp, i, j, boardSize);
            if (nMines === 0) {
              checkSurroundingRecursion(tmp, i, j, boardSize);
              finishLoop = true;
            } else {
              tmp[i][j].n = nMines;
              tmp[i][j].clicked = true;
              finishLoop = true;
            }
          }
        }
      }
    }
    setArrBoard(tmp);
  };

  useEffect(() => {
    setBoard(9);
  }, []);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setBoard(9);
      }, 1000);
    }
  }, [gameOver]);
  return (
    <div className="app">
      <Board
        arrBoard={arrBoard}
        boardSize={boardSize}
        handleClick={handleClick}
        handleRightClick={handleRightClick}
        gameOver={gameOver}
      />
    </div>
  );
}
