import { Item, ItemAPI } from "./data";

/**
 * Transforms a flat array of ItemAPI[] to a nested type of array of Item[] where
 * each child of an element is placed in the children array of its parent
 * i.e.
 * [
 *   {id: 2, parentId: 1, name: "Months"},
 *   {id: 1, parentId: null, name: "Years"},
 *   {id: 3, parentId: 2, name: "Weeks"},
 * ]
 * ------->
 * [
 *   {id: 1, parentId: null, name: "Years", children: [
 *      {id: 2, parentId: 1, name: "Months", children: [
 *         {id: 3: parentId: 2, name: "Weeks"}
 *      ]},
 *   ]}
 * ]
 * @param data - mock back-end data in format of ItemAPI
 * @returns Item[]
 */
export const formatData = (data: ItemAPI[]) => {
  const dataCopy: Item[] = [...data.map((item) => ({ ...item, children: [] }))];

  // temporary map that is stored by {ID: Item} for quick get of the Item details
  const map: { [id: number]: Item } = {};
  const result: Item[] = [];

  dataCopy.forEach((item) => {
    map[item.id] = item;
  });

  dataCopy.forEach((item) => {
    // if it has a parent -> put it in the children array
    if (item.parentId != null) {
      map[item.parentId].children.push(item);
    } else {
      // else -> push it as a top level item
      result.push(item);
    }
  });

  return result;
};

export const filterData = (data: Item[], query: string): Item[] => {
  return data.filter((item) => {
    const isMatch = item.name.toLowerCase().includes(query.toLowerCase());
    if (isMatch) {
      return item;
    }
    if (item.children.length > 0) {
      return filterData(item.children, query).length > 0;
    }
  });
};
