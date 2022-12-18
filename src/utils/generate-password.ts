import { GeneratePasswordArgs } from "~/types";
import { customAlphabet } from "nanoid";

const charSet = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

function shuffle(array: string) {
  return array
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export function generatePassword({
  length,
  hasNumbers,
  hasSymbols,
  hasUppercase,
  hasLowercase,
}: GeneratePasswordArgs) {
  let charSetString = "";
  if (hasNumbers) charSetString += charSet.numbers;
  if (hasSymbols) charSetString += charSet.symbols;
  if (hasUppercase) charSetString += charSet.uppercase;
  if (hasLowercase) charSetString += charSet.lowercase;

  const shuffledCharSet = shuffle(charSetString);
  const password = customAlphabet(shuffledCharSet, length)();

  return password;
}
