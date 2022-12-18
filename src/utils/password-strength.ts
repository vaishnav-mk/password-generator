import { Options } from "~/types";

export function passwordStrength(password: string) {
    let charStrength = {
        strong: {
            charlength: 8,
            uppercase: 1,
            lowercase: 1,
            numbers: 1,
            symbols: 1
        }, 
        medium: {
            charlength: 6,
            uppercase: 1,
            lowercase: 1,
            numbers: 1,
            symbols: 0
        },
        weak: {
            charlength: 6,
            uppercase: 0,
            lowercase: 1,
            numbers: 1,
            symbols: 0
        },
        veryweak: {
            charlength: 4,
            uppercase: 0,
            lowercase: 1,
            numbers: 0,
            symbols: 0
        }
    }
    let score = 0;
    let chars = {
        uppercase: 0,
        lowercase: 0,
        numbers: 0,
        symbols: 0
    }
    password.split('').forEach(char => {
        if (/[A-Z]/.test(char)) {
            chars.uppercase++
        } else if (/[a-z]/.test(char)) {
            chars.lowercase++
        } else if (/[0-9]/.test(char)) {
            chars.numbers++
        } else if (/[!@#$%^&*()_+~\`|}{[\]:;?><,./-]/.test(char)) {
            chars.symbols++
        }
    })
    if (chars.uppercase >= charStrength.strong.uppercase) {
        score++
    }
    if (chars.lowercase >= charStrength.strong.lowercase) {
        score++
    }
    if (chars.numbers >= charStrength.strong.numbers) {
        score++
    }
    if (chars.symbols >= charStrength.strong.symbols) {
        score++
    }
    if (score >= 4) {
        return {
            strength: 'strong',
            score: 4
        }
    } else if (score >= 3) {
        return {
            strength: 'medium',
            score: 3
        }
    } else if (score >= 2) {
        return {
            strength: 'weak',
            score: 2
        }
    } else {
        return {
            strength: 'veryweak',
            score: 0
        }
    }
}