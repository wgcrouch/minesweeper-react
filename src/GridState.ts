import { GridSize } from "./GridSizes";
import { randomPosition} from "./utils";

export const MINE = "mine";

export enum CellState {
  OPEN = "open",
  FLAGGED = "flagged",
  MAYBE = "maybe",
  BOOM = "boom",
  CLOSED = "closed"
}

export type GridCellState = {
  value: typeof MINE | number;
  state: CellState;
};

export type GridState = GridCellState[][];

const getNeighbours = (x: number, y: number) => [
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
  [x - 1, y],
  [x + 1, y],
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1]
];

export const newGridState = (gridSize: GridSize): GridState => {
  const { height, width, mines} = gridSize;
  let grid: GridState = [];
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = { value: 0, state: CellState.CLOSED };
    }
  }

  let rem = mines;

  while (rem > 0) {
    const [x, y] = randomPosition(width, height);

    if (grid[y][x].value !== MINE) {
      grid[y][x].value = MINE;
      rem--;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x].value === MINE) {
        continue;
      }

      grid[y][x].value = getNeighbours(x, y).reduce(
        (out, [x, y]) => out + (grid[y]?.[x]?.value === MINE ? 1 : 0), 
        0
      )
    }
  }

  return grid;
};

const openMines = (gridState: GridState) => {
  for (let y = 0; y < gridState.length; y++) {
    for (let x = 0; x < gridState[y].length; x++) {
      const cell =  gridState[y][x];
      if (cell.value === MINE) {
        cell.state = CellState.OPEN;
      }
    }
  }
}

const openEmpty = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y]?.[x]; 
  if (!cell || cell.state === CellState.OPEN) {
    return;
  }
  cell.state = CellState.OPEN;    
  if (cell.value === 0) {
    getNeighbours(x, y).forEach(
      ([neighbourX, neighbourY]) => 
        openEmpty(gridState, neighbourX, neighbourY)
    )

  } 
}

export const openCell = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y]?.[x];
  if (!cell || (cell.state !== CellState.CLOSED && cell.state !== CellState.MAYBE)) {
    return;
  }

  if (cell.state === CellState.MAYBE) {
    cell.state = CellState.CLOSED;
    return;
  }
  
  if (cell.value === MINE) {
    openMines(gridState)
    cell.state = CellState.BOOM;
  } else if (cell.value === 0) {
    openEmpty(gridState, x, y);
  } else {
    cell.state = CellState.OPEN;
  }
};

export const openNeighbours = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y][x];
  if (cell.state !== CellState.OPEN) {
    return;
  }

  const flagCount = getNeighbours(x, y).reduce(
    (out, [x, y]) => 
      out + (gridState[y]?.[x]?.state === CellState.FLAGGED ? 1 : 0),
    0
  )
  
  if (flagCount === cell.value) {
    getNeighbours(x, y).forEach(
      ([neighbourX, neighbourY]) => 
        openCell(gridState, neighbourX, neighbourY)
    )
  }
};