import React, { FC } from "react";
import { Grid } from "./Grid";
import { SizeSelector } from "./SizeSelector";
import { Controls } from "./Controls";
import "./Game.css";
import { GameProvider } from "./GameContext";
import { Status } from "./Status";

export const Game: FC = () => {
  return (
    <GameProvider>
      <div className="game">
        <Grid />
        <Status />
        <Controls />
        <SizeSelector />
      </div>
    </GameProvider>
  );
};
