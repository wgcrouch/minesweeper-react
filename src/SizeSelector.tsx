import React, { FC } from "react";
import { GridSize } from "./GridSizes";

export type SizeSelectorProps = {
  selectedSize: GridSize;
  gridSizes: GridSize[];
  onChange: (gridSize: GridSize) => void;
};

export const SizeSelector: FC<SizeSelectorProps> = ({
  gridSizes,
  selectedSize,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = gridSizes.find(
      gridSize => gridSize.size === event.target.value
    );
    if (selected) {
      onChange(selected);
    }
  };
  return (
    <div>
      <label>
        Game size:{" "}
        <select value={selectedSize.size} onChange={handleChange}>
          {gridSizes.map(gridSize => (
            <option key={gridSize.size} value={gridSize.size}>
              {gridSize.size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
