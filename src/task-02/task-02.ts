export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueItems: Item[] = [];

  const seenIds: { [key: number]: boolean } = {};

  for (const item of array) {
    if (!seenIds[item.id]) {
      seenIds[item.id] = true;
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
};
