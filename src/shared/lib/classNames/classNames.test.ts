import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
  test('with first argument only', () => {
    expect(classNames('class1')).toBe('class1');
  });

  test('with additional classes', () => {
    const expected = 'class1 class2 class3';
    expect(classNames('class1', {}, ['class2', 'class3'])).toBe(expected);
  });

  test('with mods classes', () => {
    const expected = 'class1 hovered focused';
    const mods = { hovered: true, selectable: false, focused: true };

    expect(classNames('class1', mods, [])).toBe(expected);
  });

  test('with mods classes undefined and null', () => {
    const expected = 'class1 hovered';
    const mods = { hovered: true, selectable: undefined, focused: null };

    expect(classNames('class1', mods, [])).toBe(expected);
  });
});
