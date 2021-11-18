export const decodeBinary = (value: string) =>
  parseInt(value.split("").reverse().join(""), 2);
