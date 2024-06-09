import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Header from '../../atoms/ListHeader.vue'

describe('Header.vue', () => {
  it('renders with correct title and color', () => {
    const wrapper = mount(Header, {
      props: {
        title: 'Test Title',
        color: 'blue',
      },
    })

    const titleElement = wrapper.find('p')
    expect(titleElement.text()).toBe('Test Title')
    expect(wrapper.attributes('style')).toContain('background-color: blue;')
  })

  it('renders default title when title prop is not provided', () => {
    const wrapper = mount(Header)

    const titleElement = wrapper.find('p')
    expect(titleElement.text()).toBe('')
  })
})