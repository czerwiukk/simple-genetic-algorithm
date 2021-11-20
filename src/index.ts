"use-strict";

import { decodeBinary } from "./binary";
import fs from "fs";
import { generateInitialPopulation } from "./generateInitialPopulation";
import { geneticsAlgorithm } from "./geneticAlgorithm";
import getPolynomialFunction from "./getPolynomialFunction";

const iterations = 40;

const populationQuantity = 5;

const individualPairsQuantity = 15;

const crossbreedingProb = 0.3;

const mutationProb = 0.5;

const individuals = individualPairsQuantity * 2;

if (populationQuantity * individuals > 150) {
  console.log("Too many individuals");
  process.exit();
}

const polynomialFunction = getPolynomialFunction({ a: -1, b: 80, c: -12 });

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
