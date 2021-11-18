export const generateInitialPopulation = (individualsCount: number) => {
  const generateByte = () => (Math.random() > 0.5 ? 1 : 0);

  const generateIndividual = () =>
    Array.from(Array(8).keys()).map(generateByte).join("");

  return Array.from(Array(individualsCount).keys()).map(generateIndividual);
};
