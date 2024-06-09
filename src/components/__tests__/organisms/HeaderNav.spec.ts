import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import HeaderNav from '../../organisms/HeaderNav.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key, type RootState } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            isRaceFinished: false,
            isRaceRunning: false,
            selectedHorses: [[]],
        },
        getters: {
            isRaceFinished: (state: { isRaceFinished: any }) => state.isRaceFinished,
            isRaceRunning: (state: { isRaceRunning: any }) => state.isRaceRunning,
            selectedHorses: (state: { selectedHorses: any }) => state.selectedHorses,
        },
        mutations: {
            resetAllRace(state: { isRaceFinished: boolean; isRaceRunning: boolean; selectedHorses: never[][] }) {
                state.isRaceFinished = false
                state.isRaceRunning = false
                state.selectedHorses = [[]]
            },
        },
        actions: {
            selectRacingHorses({ commit }: { commit: Function }) {
                commit('resetAllRace')
            },
            startStopRace({ state, commit }: { state: RootState, commit: Function }) {
                commit('setRaceRunning', !state.isRaceRunning)
            },
            showAlert({ commit }: { commit: Function }, message: any) {
                console.log(message)
            }
        }
    })
}

describe('HeaderNav.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders Generate Program button when race is not finished', () => {
        store.state.isRaceFinished = false

        const app = createApp({
            render() {
                return h(HeaderNav)
            }
        })
        app.provide(key, store)

        const wrapper = mount(HeaderNav, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        expect(wrapper.find('button').text()).toBe('Generate Program')
    })

    it('renders Start Race Again button when race is finished', () => {
        store.state.isRaceFinished = true

        const app = createApp({
            render() {
                return h(HeaderNav)
            }
        })
        app.provide(key, store)

        const wrapper = mount(HeaderNav, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        expect(wrapper.find('button').text()).toBe('Start Race Again')
    })

    it('renders Start / Pause button when race is not finished', () => {
        store.state.isRaceFinished = false

        const app = createApp({
            render() {
                return h(HeaderNav)
            }
        })
        app.provide(key, store)

        const wrapper = mount(HeaderNav, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        const buttons = wrapper.findAll('button')
        expect(buttons[1].text()).toBe('Start / Pause')
    })

    it('calls generateProgram method when Generate Program button is clicked', async () => {
        store.state.isRaceFinished = false

        const wrapper = mount(HeaderNav, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.find('button').trigger('click')
        expect(store.state.isRaceFinished).toBe(false)
    })

    it('calls resetRace method when Start Race Again button is clicked', async () => {
        store.state.isRaceFinished = true

        const wrapper = mount(HeaderNav, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.find('button').trigger('click')
        expect(store.state.isRaceFinished).toBe(false)
    })
})
