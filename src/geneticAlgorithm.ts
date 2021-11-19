import { decodeBinary } from "./binary";
import { crossbreed } from "./crossbreed";
import { mutate } from "./mutate";

interface GeneticsAlgorithmConfig {
  crossbreedingProb: number;
  mutationProb: number;
  polynomialFunction: (x: number) => number;
}

export const geneticsAlgorithm = (
  population: string[],
  {
    crossbreedingProb,
    mutationProb,
    polynomialFunction,
  }: GeneticsAlgorithmConfig
) => {
  const crossbredPopulation = population
    .reduce<[string, string][]>(
      (a, b, idx, arr) => (idx % 2 === 0 ? [...a, [b, arr[idx + 1]]] : a),
      []
    )
    .flatMap((pair: [string, string]) => crossbreed(pair, crossbreedingProb));

  const mutatedPopulation = crossbredPopulation.map((individual) =>
    mutate(individual, mutationProb)
  );

  const functionResults = mutatedPopulation.map((indv) => {
    const x = decodeBinary(indv);
    console.log(`${x}, ${polynomialFunction(x)}`);
    return polynomialFunction(x);
  });

  const differenceToAdd = functionResults.reduce((a, b) => (a > b ? b : a), 0);

  const resultsWithDifference = functionResults.map(
    (val) => val + differenceToAdd
  );

  const sum = resultsWithDifference.reduce((sum, val) => sum + val, 0);

  const probabilityMap = resultsWithDifference.reduce<number[]>(
    (a, b, idx) => [...a, b / sum + (a[idx - 1] ?? 0)],
    []
  );

  const nextPopulation = mutatedPopulation.map(() => {
    const random = Math.random();

    for (let i = 0; i < probabilityMap.length; i++) {
      if (random < probabilityMap[i]) {
        return mutatedPopulation[i];
      }
    }

    return mutatedPopulation[mutatedPopulation.length - 1];
  });

  return nextPopulation;
};
