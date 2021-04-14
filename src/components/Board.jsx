import React from "react";
import Square from "./Square";

export default function Board({
  arrBoard,
  boardSize,
  handleClick,
  handleRightClick,
  gameOver,
}) {
  const boardJsx = [];
  for (const rows of arrBoard) {
    for (const squares of rows) {
      boardJsx.push(
        <Square
          key={squares.id}
          square={squares}
          boardSize={boardSize}
          handleClick={handleClick}
          handleRightClick={handleRightClick}
          gameOver={gameOver}
        />
      );
    }
  }
  return <div className="gameBoard">{boardJsx}</div>;
}
