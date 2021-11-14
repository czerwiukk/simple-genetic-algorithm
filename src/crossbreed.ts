import { getRandomInRange } from "./utils";

export const crossbreed = (pair: [string, string], probability: number) => {
  if (Math.random() > probability) {
    return pair;
  }

  const cutIndex = getRandomInRange(0, 7);

  return [
    `${pair[0].slice(0, cutIndex)}${pair[1].slice(cutIndex, 8)}`,
    `${pair[1].slice(0, cutIndex)}${pair[0].slice(cutIndex, 8)}`,
  ];
};
