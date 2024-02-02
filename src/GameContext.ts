import { Dispatch, createContext, useContext } from "react";
import { GameAction, GameState } from "./GameState";

export const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameDispatchContext = createContext<
  Dispatch<GameAction> | undefined
>(undefined);

export const useGameState = (): GameState => {
  const state = useContext(GameStateContext);

  if (!state) {
    throw new Error(
      "gameState undefined, have you wrapped your code in a GameStateProvider"
    );
  }

  return state;
};

export const useGameDispatch = (): Dispatch<GameAction> => {
  const dispatch = useContext(GameDispatchContext);

  if (!dispatch) {
    throw new Error(
      "gameDispatch undefined, have you wrapped your code in a GameStateProvider"
    );
  }

  return dispatch;
};
