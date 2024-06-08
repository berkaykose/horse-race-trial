import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import type { Horse, RootState } from './types';

export const key: InjectionKey<Store<Horse>> = Symbol()

const horseNames = [
    "Thunder", "Lightning", "Storm", "Blaze", "Shadow", "Comet",
    "Whirlwind", "Gale", "Hurricane", "Tornado", "Zephyr", "Tempest",
    "Cyclone", "Blizzard", "Gust", "Sirocco", "Typhoon", "Squall",
    "Maelstrom", "Breeze"
];
const horseColors = [
    "brown", "black", "white", "blue", "red", "yellow",
    "green", "orange", "purple", "pink", "gray", "cyan",
    "magenta", "lime", "indigo", "violet", "gold", "silver",
    "maroon", "navy"
];

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomHorses(count: number): Horse[] {
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

        const condition = Math.floor(Math.random() * 101);

        generatedHorses.push({ name, color, condition });
    }

    return generatedHorses;
}

export const store = createStore<RootState>({
    state: {
        horses: [],
    },
    mutations: {
        setHorses(state: { horses: Horse[]; }, horses: Horse[]) {
            state.horses = horses;
        },
    },
    actions: {
        generateHorses({ commit }, count: number) {
            const horses = generateRandomHorses(count);
            commit('setHorses', horses);
        },
    },
    getters: {
        horses: (state: { horses: any; }) => state.horses,
    },
});

export default store;

