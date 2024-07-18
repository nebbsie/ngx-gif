export type MediaColumn<T> = readonly MediaRow<T>[];
export type MediaRow<T> = { rows: readonly T[]; id: number };

export function SplitIntoColumns<T>(
  array: readonly T[],
): MediaRow<T>[] | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const halfLength = Math.ceil(array.length / 2);
  return [
    { rows: array.slice(0, halfLength), id: 1 },
    { rows: array.slice(halfLength), id: 2 },
  ];
}
