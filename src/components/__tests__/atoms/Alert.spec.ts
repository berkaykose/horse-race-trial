import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import Alert from '../../atoms/Alert.vue'
import { createApp, h, type Plugin } from 'vue'
import { key } from '../../../store'

const createVuexStore = () => {
    return createStore({
        state: {
            alertMessage: '',
        },
        getters: {
            alertMessage: (state: { alertMessage: any }) => state.alertMessage,
        },
        mutations: {
            setAlertMessage(state: { alertMessage: any }, message: any) {
                state.alertMessage = message
            },
        },
    })
}

describe('Alert.vue', () => {
    let store: Plugin | [Plugin, ...any[]]

    beforeEach(() => {
        store = createVuexStore()
    })

    it('renders alert message when alertMessage is set', async () => {
        store.commit('setAlertMessage', 'This is a test alert')

        const app = createApp({
            render() {
                return h(Alert)
            }
        })
        app.provide(key, store)

        const wrapper = mount(Alert, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('This is a test alert')
        expect(wrapper.isVisible()).toBe(true)
    })

    it('does not render alert when alertMessage is empty', async () => {
        store.commit('setAlertMessage', '')

        const app = createApp({
            render() {
                return h(Alert)
            }
        })
        app.provide(key, store)

        const wrapper = mount(Alert, {
            global: {
                plugins: [store],
                provide: {
                    [key as symbol]: store
                }
            }
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.isVisible()).toBe(false)
    })
})
