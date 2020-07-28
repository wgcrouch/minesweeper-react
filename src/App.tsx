import React, { useReducer } from "react";
import { Grid } from "./Grid";
import { gameStateReducer, newGameState } from "./GameState";
import { GridSizes, GridSize } from "./GridSizes";
import { SizeSelector } from "./SizeSelector";
import { Timer } from "./Timer";
import "./App.css";

export default function App() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    newGameState(GridSizes[0])
  );

  const resetGrid = () => {
    dispatch({ type: "reset" });
  };

  const changeSize = (gridSize: GridSize) => {
    dispatch({ type: "change-size", payload: { gridSize } });
  };

  return (
    <div className="App">
      <Grid gridState={gameState.gridState} dispatch={dispatch} />
      <div className="Controls">
        <Timer playState={gameState.playState} />

        <button onClick={resetGrid}>Reset</button>
        <div>
          <span role="img" aria-label="Remaining">
            💣
          </span>{" "}
          {gameState.remainingFlags}
        </div>
      </div>

      <SizeSelector
        onChange={changeSize}
        selectedSize={gameState.gridSize}
        gridSizes={GridSizes}
      />
    </div>
  );
}
