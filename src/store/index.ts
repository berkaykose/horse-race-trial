import type { InjectionKey } from 'vue';
import { generateRandomHorses, type Horse, getRandomHorses } from './horseUtils';
import { createStore, type Store } from 'vuex';

export const key: InjectionKey<Store<Horse>> = Symbol()

export interface RootState {
    horses: Horse[];
    selectedHorses: Horse[][];
    raceNumber: number;
    isRaceRunning: boolean;
    raceResults: Horse[][];
    isRaceFinished: boolean;
    alertMessage: string | null;
}

const raceDistances = [1200, 1400, 1600, 1800, 2000, 2200];

export const store = createStore<RootState>({
    state: {
        horses: [],
        selectedHorses: Array(6).fill([]),
        raceNumber: 1,
        isRaceRunning: false,
        raceResults: Array(6).fill([]),
        isRaceFinished: false,
        alertMessage: null,
    },
    mutations: {
        setHorses(state: { horses: Horse[]; }, horses: Horse[]) {
            state.horses = horses;
        },
        setSelectedHorses(state: { selectedHorses: Horse[][]; }, selectedHorses: Horse[][]) {
            state.selectedHorses = selectedHorses;
        },
        setRaceNumber(state: { raceNumber: number; }, raceNumber: number) {
            state.raceNumber = raceNumber;
        },
        setRaceRunning(state: { isRaceRunning: boolean; }, isRunning: boolean) {
            state.isRaceRunning = isRunning;
        },
        updateRaceResults(state: { raceResults: Horse[][] }, { raceIndex, results }: { raceIndex: number, results: Horse[] }) {
            console.log("Updating race results for race:", raceIndex, results);
            state.raceResults[raceIndex] = [...results].sort((a, b) => (a.ranking ?? 0) - (b.ranking ?? 0));
            console.log("Updated race results:", state.raceResults[raceIndex]);
        },
        resetRace(state: { raceNumber: number; isRaceRunning: boolean; raceResults: any[]; isRaceFinished: boolean }) {
            state.raceNumber = 1;
            state.isRaceRunning = false;
            state.raceResults = Array(6).fill([]);
            state.isRaceFinished = false;
        },
        setRaceFinished(state: { isRaceFinished: boolean }, isRaceFinished: boolean) {
            state.isRaceFinished = isRaceFinished
        },
        resetAllRace(state: { selectedHorses: Horse[][]; raceNumber: number; isRaceRunning: boolean; raceResults: any[]; isRaceFinished: boolean }) {
            state.selectedHorses = Array(6).fill([]);
            state.raceNumber = 1;
            state.isRaceRunning = false;
            state.raceResults = Array(6).fill([]);
            state.isRaceFinished = false;
        },
        setAlertMessage(state: { alertMessage: string | null }, message: | null) {
            state.alertMessage = message;
        }
    },
    actions: {
        generateHorses({ commit }: { commit: Function }, count: number) {
            const horses = generateRandomHorses(count);
            commit('setHorses', horses);
        },
        selectRacingHorses({ commit, state }: { commit: Function }) {
            const selectedHorses: Horse[][] = [];
            for (let i = 0; i < 6; i++) {
                const racingHorses = getRandomHorses(store.state.horses, 10);
                selectedHorses.push(racingHorses);
            }
            commit('resetRace');
            commit('setSelectedHorses', selectedHorses);
        },
        startStopRace({ commit, state }: { commit: Function, state: RootState }) {
            commit('setRaceRunning', !state.isRaceRunning);
        },
        nextRace({ commit, state }: { commit: Function, state: RootState }) {
            if (state.raceNumber < 6) {
                commit('setRaceNumber', state.raceNumber + 1);
            } else {
                commit('resetRace');
            }
        },
        showAlert({ commit }: { commit: Function }, message: string | null) {
            commit('setAlertMessage', message);
            setTimeout(() => {
                commit('setAlertMessage', '');
            }, 3000)
        }

    },
    getters: {
        horses: (state: RootState) => state.horses,
        selectedHorses: (state: RootState) => state.selectedHorses,
        raceNumber: (state: RootState) => state.raceNumber,
        isRaceRunning: (state: RootState) => state.isRaceRunning,
        raceResults: (state: RootState) => state.raceResults,
        raceDistances: () => raceDistances,
        isRaceFinished: (state: RootState) => state.isRaceFinished,
        alertMessage: (state: RootState) => state.alertMessage,
    },
});

export default store;
