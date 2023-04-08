/**
 * Sort the given items by the given rank function
 *
 * Only executes the rank function once per item
 */
export const sortBy = <Item>(
  items: Item[],
  getRank: (item: Item) => number
): Item[] =>
  items
    .map((item) => ({ item, rank: getRank(item) }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ item }) => item);

/**
 * A rather inefficient, but logically sound random shuffle.
 *
 * @todo replace with a smarter shuffle algorithm
 */
export const shuffle = <Item>(items: Item[]): Item[] =>
  sortBy(items, () => Math.random());

/**
 * Pick a random item from the array.
 *
 * Will return undefined if the array is empty.
 */
export const pickRandom = <Item>(items: Item[]): Item | undefined =>
  items[Math.floor(Math.random() * items.length)];
