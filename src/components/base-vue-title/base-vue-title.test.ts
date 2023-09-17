import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseVueTitle from './base-vue-title.vue';

describe.only('title component', () => {
  test('should render heading element', () => {
    const wrapper = mount(BaseVueTitle);

    expect(wrapper.find('h1').exists()).toBeTruthy();
  });

  test('should render text default slot', () => {
    const wrapper = mount(BaseVueTitle, {
      slots: {
        default: 'Something',
      },
    });

    expect(wrapper.text()).toEqual('Something');
  });

  test('should have default text props to undefined', () => {
    const wrapper = mount(BaseVueTitle);

    expect(wrapper.props('text')).toBeUndefined();
  });

  test('should render text from text props', () => {
    const wrapper = mount(BaseVueTitle, {
      props: {
        text: 'Something',
      },
    });

    expect(wrapper.text()).toEqual('Something');
  });

  test('should have default base classes', () => {
    const wrapper = mount(BaseVueTitle);

    expect(wrapper.props('classes')).toEqual({
      base: '',
    });
  });

  test('should have base class from props', () => {
    const wrapper = mount(BaseVueTitle, {
      props: {
        classes: {
          base: 'font-bold text-lg',
        },
      },
    });

    expect(wrapper.classes('font-bold')).toBe(true);
    expect(wrapper.classes('text-lg')).toBe(true);
  });

  test('should have default level props to 1', () => {
    const wrapper = mount(BaseVueTitle);

    expect(wrapper.props('level')).toEqual(1);
  });

  test.only('should render heading element with different level from props', async () => {
    const wrapper = mount(BaseVueTitle);
    const levels = [1, 2, 3, 4, 5, 6];

    for (const level of levels) {
      await wrapper.setProps({ level });

      expect(wrapper.find(`h${level}`).exists()).toBe(true);
    }
  });
});