import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceHorse from '../../atoms/RaceHorse.vue'
import { type Horse } from '../../../store/horseUtils'

describe('Horse.vue', () => {
    const raceDistances = [1200, 1400, 1600, 1800, 2000, 2200]
    const raceNumber = 1
    const raceTrackWidth = 1000
    const horse: Horse = {
        name: 'Thunder',
        color: 'brown',
        condition: 80,
        speed: 70,
        position: 300,
    }

    it('renders horse icon with correct position and color', () => {
        const wrapper = mount(RaceHorse, {
            props: {
                raceDistances,
                raceNumber,
                raceTrackWidth,
                horse,
            },
        })

        const icon = wrapper.find('#horse-icon')
        expect(icon.exists()).toBe(true)
        expect(icon.attributes('style')).toContain(`left: ${(horse.position / raceDistances[raceNumber - 1]) * raceTrackWidth}px`)
        expect(icon.attributes('style')).toContain('color: brown')
    })
})
