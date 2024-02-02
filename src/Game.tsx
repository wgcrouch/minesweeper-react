import { FC } from "react";
import { Grid } from "./Grid";
import { SizeSelector } from "./SizeSelector";
import { Controls } from "./Controls";
import "./Game.css";

import { Status } from "./Status";
import { GameProvider } from "./GameProvider";

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
