import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ProgramLists from '../../organisms/ProgramLists.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            selectedHorses: [
                [{ name: "Horse 1", color: "brown", condition: 80 }],
                [{ name: "Horse 2", color: "black", condition: 60 }]
            ],
        },
        getters: {
            selectedHorses: (state: { selectedHorses: any }) => state.selectedHorses,
        },
    })
}

describe('ProgramLists.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders program lists correctly', () => {
        const app = createApp({
            render() {
                return h(ProgramLists)
            }
        })
        app.provide(key, store)

        const wrapper = mount(ProgramLists, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        const tables = wrapper.findAllComponents({ name: 'RaceTable' })
        expect(tables).toHaveLength(store.state.selectedHorses.length)

        store.state.selectedHorses.forEach((horses: any, index: number) => {
            const table = tables[index]
            expect(table.props('title')).toBe(`Lap ${index + 1} - ${1200 + index * 200}M`)
            expect(table.props('results')).toEqual(horses)
        })
    })
})
