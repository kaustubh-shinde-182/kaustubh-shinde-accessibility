export function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let numbersString = numbers;

  // Check for custom delimiter
  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.indexOf("\n");
    const customDelimiter = numbers.substring(2, delimiterEndIndex);
    delimiter = new RegExp(`[${customDelimiter}]`);
    numbersString = numbers.substring(delimiterEndIndex + 1);
  }

  const numbersArray = numbersString
    .split(delimiter)
    .map((num) => parseInt(num, 10));

  // Check for negative numbers
  const negativeNumbers = numbersArray.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed: ${negativeNumbers.join(",")}`
    );
  }

  // Sum numbers ignoring those greater than 1000
  return numbersArray
    .filter((num) => num <= 1000)
    .reduce((sum, num) => sum + num, 0);
}
