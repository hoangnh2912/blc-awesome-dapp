const getCenterPointOfElement = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX + rect.width / 2,
    y: rect.top + window.scrollY + rect.height / 2,
  };
};

const findNextNumberDivisible = (
  currentNumber: number,
  divisible: number = 10
) => {
  return currentNumber + divisible - (currentNumber % divisible);
};

const ipfsToHttps = (url: string) => {
  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
};

const convertToInternationalCurrencySystem = (labelValue: number): string => {
  // Nine Zeroes for Billions
  return `${
    Math.round(Number(labelValue)) >= 1.0e9
      ? (Math.round(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.round(Number(labelValue)) >= 1.0e6
      ? (Math.round(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.round(Number(labelValue)) >= 1.0e3
      ? (Math.round(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.round(Number(labelValue))
  }`;
};

export {
  getCenterPointOfElement,
  ipfsToHttps,
  findNextNumberDivisible,
  convertToInternationalCurrencySystem,
};
