interface PolynomialParams {
  a: number;
  b: number;
  c: number;
}

const getPolynomialFunction =
  ({ a, b, c }: PolynomialParams) =>
  (x: number) =>
    a * x ** 2 + b * x + c;

export default getPolynomialFunction;
