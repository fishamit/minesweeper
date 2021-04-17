import React from "react";
import imgMine from "../img/mine.png";
import imgFlag from "../img/flag.svg";

export default function Square({
  square,
  boardSize,
  handleClick,
  handleRightClick,
  gameOver,
}) {
  const txtColor = [
    { color: "black" },
    { color: "blue" },
    { color: "yellow" },
    { color: "orange" },
    { color: "red" },
    { color: "red" },
    { color: "red" },
    { color: "red" },
  ];
  const sizeStyle = {
    width: 100 / boardSize + "%",
    height: 100 / boardSize + "%",
  };
  const imgSize = {
    width: "50%",
    height: "50%",
  };

  return (
    <div className="squareContainer" style={sizeStyle}>
      <div
        style={txtColor[square.n]}
        className={
          square.clicked
            ? square.n > 0
              ? "squareNoHoverNumber"
              : "squareNoHover clicked"
            : "square"
        }
        onClick={() => {
          if (!square.flagged) handleClick(square.id);
        }}
        onContextMenu={e => handleRightClick(e, square.id)}
      >
        {square.mine && (square.clicked || gameOver) ? (
          <img style={imgSize} src={imgMine} alt="" />
        ) : null}

        {square.clicked && square.n > 0 ? (
          square.n
        ) : square.flagged ? (
          <img style={imgSize} src={imgFlag} alt="" />
        ) : null}
      </div>
    </div>
  );
}
