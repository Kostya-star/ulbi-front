export function classNames(
  cls: string,
  mods: Record<string, boolean | string> = {},
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
