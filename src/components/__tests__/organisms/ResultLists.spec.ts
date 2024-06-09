import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ResultLists from '../../organisms/ResultLists.vue'
import ListHeader from '../../atoms/ListHeader.vue'
import RaceTable from '../../molecules/RaceTable.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            raceResults: [
                [{ name: "Horse 1", color: "brown", condition: 80, position: 0, speed: 5 }],
                [{ name: "Horse 2", color: "black", condition: 60, position: 0, speed: 5 }],
                [{ name: "Horse 3", color: "white", condition: 50, position: 0, speed: 5 }],
                [{ name: "Horse 4", color: "blue", condition: 70, position: 0, speed: 5 }],
                [{ name: "Horse 5", color: "red", condition: 90, position: 0, speed: 5 }],
                [{ name: "Horse 6", color: "yellow", condition: 40, position: 0, speed: 5 }]
            ]
        },
        getters: {
            raceResults: (state: { raceResults: any }) => state.raceResults
        },
    })
}

describe('ResultLists.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders correctly', () => {
        const app = createApp({
            render() {
                return h(ResultLists)
            }
        })
        app.provide(key, store)

        const wrapper = mount(ResultLists, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        expect(wrapper.findComponent(ListHeader).exists()).toBe(true)
        expect(wrapper.findAllComponents(RaceTable)).toHaveLength(6)
    })

    it('passes correct props to RaceTable', () => {
        const app = createApp({
            render() {
                return h(ResultLists)
            }
        })
        app.provide(key, store)

        const wrapper = mount(ResultLists, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        const raceTables = wrapper.findAllComponents(RaceTable)
        raceTables.forEach((raceTable, index) => {
            expect(raceTable.props('title')).toBe(`Lap ${index + 1} - ${1200 + index * 200}M`)
            expect(raceTable.props('results')).toEqual(store.getters.raceResults[index])
        })
    })
})
