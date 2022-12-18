type GeneratePasswordArgs = {
    length: number;
    hasNumbers: boolean;
    hasSymbols: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
}

type Options = {
    length: number;
    hasNumbers: boolean;
    hasSymbols: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
}

export type { GeneratePasswordArgs, Options };