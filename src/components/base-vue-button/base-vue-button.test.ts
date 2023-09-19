import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseVueButton from './base-vue-button.vue';

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
});
