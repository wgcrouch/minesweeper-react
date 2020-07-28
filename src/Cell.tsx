import React, { FC, useCallback } from "react";
import { GridState, CellState, MINE } from "./GridState";
import classNames from "classnames";
import "./Cell.css";

export type CellProps = {
  x: number;
  y: number;
  gridState: GridState;
  onOpen: (x: number, y: number) => void;
  onFlag: (x: number, y: number) => void;
  onOpenNeighbours: (x: number, y: number) => void;
};

export const Cell: FC<CellProps> = ({
  x,
  y,
  gridState,
  onOpen,
  onFlag,
  onOpenNeighbours
}) => {
  const cell = gridState[y][x];

  const handleClick = useCallback(() => {
    onOpen(x, y);
  }, [onOpen, x, y]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onFlag(x, y);
    },
    [onFlag, x, y]
  );

  const handleOpenSafe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOpenNeighbours(x, y);
  };

  const disableRightClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();
  };

  if (cell.state !== CellState.OPEN && cell.state !== CellState.BOOM) {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className="cell cell-closed"
      >
        {cell.state === CellState.FLAGGED ? "🚩" : null}
        {cell.state === CellState.MAYBE ? "?" : null}
      </button>
    );
  }

  const openClasses = classNames(
    "cell",
    "cell-open",
    cell.value !== MINE && cell.value > 0 && `cell-open-${cell.value}`
  );

  return (
    <button
      onDoubleClick={handleOpenSafe}
      onContextMenu={disableRightClick}
      className={openClasses}
    >
      {cell.value === MINE && cell.state === CellState.BOOM ? "💥" : null}
      {cell.value === MINE && cell.state !== CellState.BOOM ? "💣" : null}
      {cell.value > 0 ? cell.value : null}
    </button>
  );
};
