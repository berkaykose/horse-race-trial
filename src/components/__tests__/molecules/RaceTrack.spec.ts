import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import RaceTrack from '../../molecules/RaceTrack.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'
import { Horse } from '../../../store/horseUtils'
import type { RootState } from '@/store'

const createVuexStore = () => {
    return createStore({
        state: {
            selectedHorses: [[
                { name: 'Horse 1', position: 0, speed: 1, ranking: undefined },
                { name: 'Horse 2', position: 0, speed: 1, ranking: undefined },
            ]],
            raceNumber: 1,
            isRaceRunning: false,
            raceDistances: [1200, 1400, 1600, 1800, 2000, 2200],
            isRaceFinished: false
        },
        getters: {
            selectedHorses: (state: { selectedHorses: any }) => state.selectedHorses,
            raceNumber: (state: { raceNumber: any }) => state.raceNumber,
            isRaceRunning: (state: { isRaceRunning: any }) => state.isRaceRunning,
            raceDistances: (state: { raceDistances: any }) => state.raceDistances,
            isRaceFinished: (state: { isRaceFinished: any }) => state.isRaceFinished
        },
        mutations: {
            setRaceRunning(state: { isRaceRunning: any }, isRunning: any) {
                state.isRaceRunning = isRunning
            },
            updateRaceResults(state: { selectedHorses: { [x: string]: any } }, { raceIndex, results }: any) {
                state.selectedHorses[raceIndex] = results
            }
        },
        actions: {
            nextRace({ commit, state }: { commit: Function, state: RootState }) {
                if (state.raceNumber < 6) {
                    commit('setRaceNumber', state.raceNumber + 1)
                } else {
                    commit('resetRace')
                }
            }
        }
    })
}

describe('RaceTrack.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders race track correctly', async () => {
        const app = createApp({
            render() {
                return h(RaceTrack)
            }
        })
        app.provide(key, store)

        const wrapper = mount(RaceTrack, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.findAll('#horse-icon')).toHaveLength(2)
    })

    it('updates horse positions correctly', async () => {
        store.commit('setRaceRunning', true)

        const app = createApp({
            render() {
                return h(RaceTrack)
            }
        })
        app.provide(key, store)

        const wrapper = mount(RaceTrack, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.vm.$nextTick()

        // Simulate the horses moving
        await new Promise(resolve => setTimeout(resolve, 1000))

        const horses = store.getters.selectedHorses[0]
        horses.forEach((horse: { position: any }) => {
            expect(horse.position).toBeGreaterThan(0)
        })
    })
})