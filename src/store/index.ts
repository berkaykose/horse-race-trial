import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { generateRandomHorses, type Horse, getRandomHorses } from './horseUtils';

export const key: InjectionKey<Store<Horse>> = Symbol()

export interface RootState {
    horses: Horse[];
    selectedHorses: Horse[][];
}

export const store = createStore<RootState>({
    state: {
        horses: [],
        selectedHorses: [],
    },
    mutations: {
        setHorses(state: { horses: Horse[]; }, horses: Horse[]) {
            state.horses = horses;
        },
        setSelectedHorses(state: RootState, selectedHorses: Horse[][]) {
            state.selectedHorses = selectedHorses;
        }
    },
    actions: {
        generateHorses({ commit }: { commit: Function }, count: number) {
            const horses = generateRandomHorses(count);
            commit('setHorses', horses);
        },
        selectRacingHorses({ state, commit }: { state: RootState; commit: Function }) {
            const selectedHorses: Horse[][] = [];
            for (let i = 0; i < 6; i++) {
                const racingHorses = getRandomHorses(state.horses, 10);
                selectedHorses.push(racingHorses);
            }
            commit('setSelectedHorses', selectedHorses);
        }
    },
    getters: {
        horses: (state: { horses: Horse[]; }) => state.horses,
        selectedHorses: (state: { selectedHorses: Horse[]; }) => state.selectedHorses,
    },
});

export default store;

