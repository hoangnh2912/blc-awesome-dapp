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
export { getCenterPointOfElement, ipfsToHttps, findNextNumberDivisible };
