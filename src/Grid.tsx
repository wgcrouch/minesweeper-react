import React, { FC } from "react";
import { Cell } from "./Cell";
import { GridState } from "./GridState";
import { GameAction } from "./GameState";
import "./Grid.css";

export type GridProps = {
  gridState: GridState;
  dispatch: React.Dispatch<GameAction>;
};

export const Grid: FC<GridProps> = ({ gridState, dispatch }) => {
  const handleOpen = (x: number, y: number) => {
    dispatch({ type: "open", payload: { x, y } });
  };

  const handleFlag = (x: number, y: number) => {
    dispatch({ type: "flag", payload: { x, y } });
  };

  const handleOpenSafe = (x: number, y: number) => {
    dispatch({ type: "open-neighbours", payload: { x, y } });
  };

  return (
    <div className="grid">
      {gridState.map((row, y) => (
        <div key={y} className="grid-row">
          {row.map((cell, x) => (
            <Cell
              key={`${x}/${y}`}
              x={x}
              y={y}
              gridState={gridState}
              onOpen={handleOpen}
              onFlag={handleFlag}
              onOpenNeighbours={handleOpenSafe}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
