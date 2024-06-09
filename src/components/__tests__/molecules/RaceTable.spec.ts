import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceTable from '../../molecules/RaceTable.vue'

describe('RaceTable.vue', () => {
    it('renders title correctly', () => {
        const title = 'Race Results'
        const results: any = []
        const wrapper = mount(RaceTable, {
            props: {
                title,
                results,
            },
        })

        expect(wrapper.find('p').text()).toBe(title)
    })

    it('renders results correctly', () => {
        const title = 'Race Results'
        const results = [
            { name: 'Horse 1' },
            { name: 'Horse 2' },
            { name: 'Horse 3' },
        ]
        const wrapper = mount(RaceTable, {
            props: {
                title,
                results,
            },
        })

        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(results.length)
        results.forEach((result, index) => {
            expect(rows[index].find('td:nth-child(1)').text()).toBe((index + 1).toString())
            expect(rows[index].find('td:nth-child(2)').text()).toBe(result.name)
        })
    })
})
