import { shallowMount } from '@vue/test-utils';
import mapValues from 'lodash/mapValues';
import TRadio from '@/inputs/TRadio';

describe('TRadio', () => {
  it('it renders the input', () => {
    const wrapper = shallowMount(TRadio);
    expect(wrapper.get('input[type=radio]')).toBeTruthy();
  });

  it('set the props.value into the input value', () => {
    const value = 'input value';

    const wrapper = shallowMount(TRadio, {
      propsData: { value },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(value);
  });

  it('updates the model value', async () => {
    const value = 'input value';
    const newValue = 'new value';
    const wrapper = shallowMount(TRadio, {
      propsData: { value },
    });

    wrapper.setProps({ value: newValue });

    await wrapper.vm.$nextTick();

    const { input } = wrapper.vm.$refs;

    expect(input.value).toBe(newValue);
  });

  it('disables the input', async () => {
    const wrapper = shallowMount(TRadio, {
      propsData: { disabled: false },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.disabled).toBe(false);

    wrapper.setProps({ disabled: true });

    await wrapper.vm.$nextTick();

    expect(input.disabled).toBe(true);
  });

  it('check the input if checked attribute', async () => {
    const wrapper = shallowMount(TRadio, {
      propsData: {
        checked: true,
      },
    });

    const { input } = wrapper.vm.$refs;

    expect(input.checked).toBe(true);
  });

  it('has input attributes', async () => {
    const wrapper = shallowMount(TRadio);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
      required: {
        default: false,
        new: true,
      },
      value: {
        default: 'on',
        new: 'my value',
      },
    };

    const { input } = wrapper.vm.$refs;

    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(input[elementValue.keyName || key]).toBe(elementValue.default);
    });

    const newProps = mapValues(values, ({ new: newValue }, key) => newValue);

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = values[key];
      expect(input[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits an input event when the model change', async () => {
    const wrapper = shallowMount(TRadio);

    const inputValue = 'Hello World';

    wrapper.setProps({
      model: inputValue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue]);
  });

  it('emits an input event using the checked attribute', async () => {
    const inputValue = 'A';

    const wrapper = shallowMount(TRadio, {
      propsData: {
        value: inputValue,
      },
    });

    wrapper.setProps({
      checked: 'checked',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([inputValue]);
  });

  it('emits an change event with the input value', async () => {
    const wrapper = shallowMount(TRadio);

    const inputValue = 'Hello World';

    wrapper.setProps({
      model: inputValue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits an change event using the checked attribute', async () => {
    const inputValue = 'A';

    const wrapper = shallowMount(TRadio, {
      propsData: {
        value: inputValue,
      },
    });

    wrapper.setProps({
      checked: 'checked',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([inputValue]);
  });

  it('emits a blur event when the input is blurred', () => {
    const inputValue = 'input value';
    const wrapper = shallowMount(TRadio, {
      propsData: { value: inputValue },
    });

    const { input } = wrapper.vm.$refs;

    // The change event should be emitted when the input is blurred
    input.dispatchEvent(new Event('blur'));

    expect(wrapper.emitted('blur')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('emits a focus event when the input is focused', () => {
    const inputValue = 'input value';
    const wrapper = shallowMount(TRadio, {
      propsData: { value: inputValue },
    });

    const { input } = wrapper.vm.$refs;

    // The change event should be emitted when the input is focusred
    input.dispatchEvent(new Event('focus'));

    expect(wrapper.emitted('focus')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('focus').length).toBe(1);
  });

  it('has a focus and a blur method', () => {
    const wrapper = shallowMount(TRadio);

    wrapper.vm.focus();

    expect(wrapper.emitted('focus')).toBeTruthy();

    expect(wrapper.emitted('focus').length).toBe(1);

    wrapper.vm.blur();

    expect(wrapper.emitted('blur')).toBeTruthy();

    expect(wrapper.emitted('blur').length).toBe(1);
  });
});
