import { FC } from "react";
import { Cell } from "./Cell";
import "./Grid.css";
import { useGameState } from "./GameContext";

export const Grid: FC = () => {
  const { gridState } = useGameState();

  return (
    <div className="grid">
      {gridState.map((row, y) => (
        <div key={y} className="grid-row">
          {row.map((cell, x) => (
            <Cell key={`${x}/${y}`} x={x} y={y} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};
