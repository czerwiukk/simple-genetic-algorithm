"use-strict";

import { decodeBinary } from "./binary";
import fs from "fs";
import { generateInitialPopulation } from "./generateInitialPopulation";
import { geneticsAlgorithm } from "./geneticAlgorithm";

interface PolynomialParams {
  a: number;
  b: number;
  c: number;
}

const getPolynomialFunction =
  ({ a, b, c }: PolynomialParams) =>
  (x: number) =>
    a * x ** 2 + b * x + c;

const iterations = 5;

const populationQuantity = 32;

const individuals = 30;

if (populationQuantity * individuals > 150) {
  console.log("Too many individuals");
  process.exit();
}

const crossbreedingProb = 0.7;

const mutationProb = 0.2;

const polynomialFunction = getPolynomialFunction({ a: -1, b: 15, c: 4 });

const runAlgorithm = () => {
  const initialPopulation = generateInitialPopulation(individuals);

  const evolvePopulation = (population: string[]) =>
    geneticsAlgorithm(population, {
      crossbreedingProb,
      mutationProb,
      polynomialFunction,
    });

  const finalPopulation = Array.from(Array(populationQuantity).keys())
    .reduce(evolvePopulation, initialPopulation)
    .map((ind) => decodeBinary(ind));

  const bestResult = finalPopulation.reduce((currentBest, x) => {
    const result = polynomialFunction(x);
    return result > polynomialFunction(currentBest) ? x : currentBest;
  }, 0);

  fs.appendFileSync(
    "results.txt",
    `${bestResult} ${polynomialFunction(bestResult)}\n`
  );
};

Array(iterations).fill(0).forEach(runAlgorithm);
