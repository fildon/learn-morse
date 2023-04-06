/**
 * A rather inefficient, but logically sound random shuffle.
 *
 * @todo replace with a smarter shuffle algorithm
 */
export const shuffle = <Item>(items: Item[]) =>
  items
    .map((item) => ({ item, rank: Math.random() }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ item }) => item);
