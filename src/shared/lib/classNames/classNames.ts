type Mods = Record<string, boolean | string | undefined | null>

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,

    ...Object.entries(mods)
      .filter(([_, value]) => !!value)
      .map(([key, _]) => key),

    ...additional.filter(Boolean),
  ].join(' ');
}

// return `${cls} ${Object.entries(mods)
//   .filter(([_, value]) => !!value)
//   .map(([key, _]) => key)
//   .join(' ')} ${additional.join(' ')}`;
