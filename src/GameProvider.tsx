import { FC, useReducer } from "react";
import { gameStateReducer, newGameState } from "./GameState";
import { GridSizes } from "./GridSizes";
import { GameDispatchContext, GameStateContext } from "./GameContext";

export const GameProvider: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    gameStateReducer,
    newGameState(GridSizes[0])
  );
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
