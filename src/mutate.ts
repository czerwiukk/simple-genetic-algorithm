export const mutate = (individual: string, probability: number) =>
  individual
    .split("")
    .map((gene) =>
      Math.random() < probability ? `${(parseInt(gene) + 1) % 2}` : gene
    )
    .join("");
