export type ItemAPI = {
  id: number;
  parentId: number | null;
  name: string;
};

export type Item = ItemAPI & {
  children: Item[];
};

const response: ItemAPI[] = [
  { id: 4, parentId: 3, name: "Days" },
  { id: 1, parentId: null, name: "Years" },
  { id: 2, parentId: 1, name: "Months" },
  { id: 5, parentId: null, name: "Stars" },
  { id: 3, parentId: 2, name: "Weeks" },
  { id: 6, parentId: 5, name: "Sun" },
  { id: 7, parentId: 5, name: "Proxima Centauri" },
  { id: 8, parentId: null, name: "Dogs" },
  { id: 9, parentId: 4, name: "Hours" },
];

export default response;
