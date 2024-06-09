import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import RaceScreen from '../../organisms/RaceScreen.vue'
import ListHeader from '../../atoms/ListHeader.vue'
import RaceTrack from '../../molecules/RaceTrack.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            selectedHorses: [
                [{ name: "Horse 1", color: "brown", condition: 80, position: 0, speed: 5 }],
                [{ name: "Horse 2", color: "black", condition: 60, position: 0, speed: 5 }]
            ],
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
            isRaceFinished: (state: { isRaceFinished: any }) => state.isRaceFinished,
        },
    })
}

describe('RaceScreen.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders correctly', () => {
        const app = createApp({
            render() {
                return h(RaceScreen)
            }
        })
        app.provide(key, store)

        const wrapper = mount(RaceScreen, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        expect(wrapper.findComponent(ListHeader).exists()).toBe(true)
        expect(wrapper.findComponent(RaceTrack).exists()).toBe(true)
    })

    it('passes correct props to ListHeader', () => {
        const app = createApp({
            render() {
                return h(RaceScreen)
            }
        })
        app.provide(key, store)

        const wrapper = mount(RaceScreen, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        const listHeader = wrapper.findComponent(ListHeader)
        expect(listHeader.props('title')).toBe('Race Track')
        expect(listHeader.props('color')).toBe('red')
    })
})
