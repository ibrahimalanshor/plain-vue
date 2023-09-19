import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseVueButton from './base-vue-button.vue';
import { h } from 'vue';

describe.only('button test', () => {
  // element
  test('should have button elment', () => {
    const wrapper = mount(BaseVueButton);

    expect(wrapper.find('button').exists()).toBe(true);
  });

  // text
  test('should render text from slot', () => {
    const wrapper = mount(BaseVueButton, {
      slots: {
        default: 'Something',
      },
    });

    expect(wrapper.text()).toEqual('Something');
  });
  test('should render text from porps', () => {
    const wrapper = mount(BaseVueButton, {
      props: {
        text: 'Something',
      },
    });

    expect(wrapper.text()).toEqual('Something');
  });

  // base
  test('should have default base class', () => {
    const wrapper = mount(BaseVueButton);

    expect(wrapper.props('baseClass')).toBeUndefined();
  });
  test('should have default base class', () => {
    const wrapper = mount(BaseVueButton, {
      props: {
        baseClass: 'p-4 block',
      },
    });

    expect(wrapper.classes('p-4')).toBe(true);
    expect(wrapper.classes('block')).toBe(true);
  });

  // type
  test('should have default type', () => {
    const wrapper = mount(BaseVueButton);

    expect(wrapper.find('button').attributes('type')).toEqual('button');
  });
  test('should have type from props', () => {
    const wrapper = mount(BaseVueButton, {
      props: {
        type: 'submit',
      },
    });

    expect(wrapper.find('button').attributes('type')).toEqual('submit');
  });

  // loading
  test('should have default loading false', () => {
    const wrapper = mount(BaseVueButton, {
      slots: {
        loading: () => h('span', { class: 'loading' }, 'loading'),
      },
    });

    expect(wrapper.props('loading')).toBe(false);
    expect(wrapper.find('.loading').exists()).toBe(false);
  });
  test('should render loading slot', () => {
    const wrapper = mount(BaseVueButton, {
      props: {
        loading: true,
      },
      slots: {
        loading: () => h('span', { class: 'loading' }, 'loading'),
      },
    });

    expect(wrapper.props('loading')).toBe(true);
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  // color
  test('should have default color', () => {
    const wrapper = mount(BaseVueButton);

    expect(wrapper.props('color')).toEqual('default');
    expect(wrapper.props('colorClass')).toEqual({ default: '' });
  });
  test('should have color class by color props', async () => {
    const colors: Record<string, string> = {
      success: 'border-green',
      error: 'border-red',
    };
    const wrapper = mount(BaseVueButton, {
      props: {
        colorClass: {
          default: 'border-gray',
          ...colors,
        },
      },
    });

    expect(wrapper.find('button').classes('border-gray')).toBe(true);

    for (const color in colors) {
      await wrapper.setProps({ color });

      expect(wrapper.find('button').classes(colors[color])).toBe(true);
    }
  });

  // size
  test('should have default size', () => {
    const wrapper = mount(BaseVueButton);

    expect(wrapper.props('size')).toEqual('md');
    expect(wrapper.props('sizeClass')).toEqual({ md: '' });
  });
  test('should have size class by size props', async () => {
    const sizes: Record<string, string> = {
      lg: 'p-4',
      sm: 'p-2',
    };
    const wrapper = mount(BaseVueButton, {
      props: {
        sizeClass: {
          md: 'p-6',
          ...sizes,
        },
      },
    });

    expect(wrapper.find('button').classes('p-6')).toBe(true);

    for (const size in sizes) {
      await wrapper.setProps({ size });

      expect(wrapper.find('button').classes(sizes[size])).toBe(true);
    }
  });
});
