import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import HorseList from '../../organisms/HorseList.vue'
import { createStore } from 'vuex'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            horses: [],
        },
        getters: {
            horses: (state: { horses: any }) => state.horses,
        },
        actions: {
            generateHorses({ commit }: { commit: Function }, count: any) {
                commit('setHorses', Array.from({ length: count }, (_, i) => ({
                    name: `Horse ${i + 1}`,
                    color: `color${i + 1}`,
                    condition: Math.floor(Math.random() * 100),
                })))
            }
        },
        mutations: {
            setHorses(state: { horses: any }, horses: any) {
                state.horses = horses
            }
        }
    })
}

describe('HorseList.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders horse list correctly', async () => {
        const app = createApp({
            render() {
                return h(HorseList)
            }
        })
        app.provide(key, store)

        const wrapper = mount(HorseList, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        // Component mount edildikten sonra generateHorses çağrılmasını bekle
        await wrapper.vm.$nextTick()

        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(20)

        store.state.horses.forEach((horse: { name: any; condition: { toString: () => any }; color: any }, index: string | number) => {
            const cells = rows[index].findAll('td')
            expect(cells[0].text()).toBe(horse.name)
            expect(cells[1].text()).toBe(horse.condition.toString())
            expect(cells[2].text()).toBe(horse.color)
        })
    })

    it('calls generateHorses on mount', async () => {
        const app = createApp({
            render() {
                return h(HorseList)
            }
        })
        app.provide(key, store)

        const wrapper = mount(HorseList, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        // Component mount edildikten sonra generateHorses çağrılmasını bekle
        await wrapper.vm.$nextTick()

        expect(store.state.horses).toHaveLength(20)
    })
})
