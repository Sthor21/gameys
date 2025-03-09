import { words } from "./words"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export function getFarewellText(term) {
    const options = [
        `Firewall breached: ${term} compromised!`,
        `Encryption cracked: ${term} is exposed!`,
        `Alert! ${term} has been bypassed!`,
        `Security failure: ${term} is down!`,
        `Oh no! ${term} has been compromised!`,
        `${term} has fallen to cyber attackers!`,
        `Data breach detected: ${term} is vulnerable!`,
        `The end of ${term} as we know it!`,
        `Unauthorized access: ${term} is at risk!`,
        `Critical failure! ${term} is no longer secure!`,
        `Dark web alert: ${term} has been leaked!`,
        `${term} has left the cybersecurity perimeter!`
    ];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}