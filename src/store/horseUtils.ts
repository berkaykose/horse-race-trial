export interface Horse {
    name: string;
    color: string;
    condition: number;
    speed: number;
    position: number;
    ranking?: number;
}

export const horseNames = [
    "Thunder", "Lightning", "Storm", "Blaze", "Shadow", "Comet",
    "Whirlwind", "Gale", "Hurricane", "Tornado", "Zephyr", "Tempest",
    "Cyclone", "Blizzard", "Gust", "Sirocco", "Typhoon", "Squall",
    "Maelstrom", "Breeze"
];

export const horseColors = [
    "brown", "black", "tan", "blue", "red", "yellow",
    "green", "orange", "purple", "pink", "gray", "cyan",
    "magenta", "lime", "indigo", "violet", "gold", "silver",
    "maroon", "navy"
];

export function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomHorses(count: number): Horse[] {
    const generatedHorses: Horse[] = [];
    const usedNames = new Set<string>();
    const usedColors = new Set<string>();

    for (let i = 0; i < count; i++) {
        let name: string;
        let color: string;

        do {
            name = getRandomElement(horseNames);
        } while (usedNames.has(name));
        usedNames.add(name);

        do {
            color = getRandomElement(horseColors);
        } while (usedColors.has(color));
        usedColors.add(color);

        const condition = Math.floor(Math.random() * 100) + 1;

        const baseSpeed = 50;
        const speedRange = 20;
        const speed = baseSpeed + (condition / 100) * speedRange;

        const ranking = undefined;

        generatedHorses.push({ name, color, condition, speed, position: 0, ranking });
    }

    return generatedHorses;
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getRandomHorses(horses: Horse[], count: number): Horse[] {
    const copyHorses = [...horses]
    copyHorses.map(horse => horse.position = 0)
    const shuffledHorses = shuffleArray(copyHorses);
    return shuffledHorses.slice(0, count);
}

