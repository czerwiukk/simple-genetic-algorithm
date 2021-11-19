export const generateInitialPopulation = (individualsCount: number) => {
  const generateByte = () => Math.round(Math.random());

  const generateIndividual = () =>
    Array.from(Array(8).keys()).map(generateByte).join("");

  return Array.from(Array(individualsCount).keys()).map(generateIndividual);
};
