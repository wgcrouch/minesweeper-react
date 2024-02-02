import React, { FC, useCallback, useRef } from "react";
import { CellState, MINE, GridCellState } from "./GridState";
import { useGameDispatch } from "./GameContext";
import classNames from "classnames";
import "./Cell.css";

export type CellProps = {
  x: number;
  y: number;
  cell: GridCellState;
};

const useOnBothClick = (onBothClick: () => void) => {
  const leftButtonPressed = useRef(false);
  const rightButtonPressed = useRef(false);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<unknown>) => {
      if (event.button === 0) {
        leftButtonPressed.current = true;
      } else if (event.button === 2) {
        event.preventDefault();
        rightButtonPressed.current = true;
      }

      // Check if both buttons are pressed
      if (leftButtonPressed.current && rightButtonPressed.current) {
        onBothClick();
      }
    },
    [leftButtonPressed, onBothClick, rightButtonPressed]
  );

  const handleMouseUp = (event: React.MouseEvent<unknown>) => {
    if (event.button === 0) {
      leftButtonPressed.current = false;
    } else if (event.button === 2) {
      rightButtonPressed.current = false;
    }
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};

export const Cell: FC<CellProps> = ({ x, y, cell }) => {
  const dispatch = useGameDispatch();

  const handleClick = () => {
    dispatch({ type: "open", payload: { x, y } });
  };

  const handleSetFlag = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: "flag", payload: { x, y } });
  };

  const handleOpenSafe = () => {
    dispatch({ type: "open-neighbours", payload: { x, y } });
  };

  const bothClickHandlers = useOnBothClick(handleOpenSafe);

  const disableContextMenu = (event: React.MouseEvent<unknown>) => {
    event.preventDefault();
  };

  if (cell.state !== CellState.OPEN && cell.state !== CellState.BOOM) {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleSetFlag}
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
      {...bothClickHandlers}
      onContextMenu={disableContextMenu}
      className={openClasses}
    >
      {cell.value === MINE
        ? cell.state === CellState.BOOM
          ? "💥"
          : "💣"
        : cell.value > 0
        ? cell.value
        : null}
    </button>
  );
};
