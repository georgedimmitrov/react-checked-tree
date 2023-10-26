import React, { useState } from "react";
import { Item } from "./data";
import { filterData } from "./utils";

type ItemByIdMap = {
  [id: string]: boolean;
};

interface CheckedTreeProps {
  data: Item[];
}

const CheckedTree: React.FC<CheckedTreeProps> = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState<ItemByIdMap>({});
  const [checkedItems, setCheckedItems] = useState<ItemByIdMap>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleExpandToggle = (itemId: number) => {
    setExpandedItems((prev) => {
      return {
        ...prev,
        [itemId]: !prev[itemId],
      };
    });
  };

  const handleCheckToggle = (itemId: number) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[itemId] = !updatedCheckedItems[itemId];

    if (updatedCheckedItems[itemId]) {
      // check all parents as well as current item
      checkParent(itemId, updatedCheckedItems);
    } else {
      // uncheck all children as well as current item
      // uncheckAllChildren(data, itemId, updatedCheckedItems);
      uncheckChildren(itemId, updatedCheckedItems);
    }

    setCheckedItems(updatedCheckedItems);
  };

  const findParent = (data: Item[], itemId: number): Item | undefined => {
    for (const item of data) {
      if (item.children.length > 0) {
        if (item.children.some((child) => child.id === itemId)) {
          return item;
        } else {
          const parent: Item | undefined = findParent(item.children, itemId);
          if (parent) {
            return parent;
          }
        }
      }
    }

    return undefined;
  };

  const checkParent = (itemId: number, updatedCheckedItems: ItemByIdMap) => {
    updatedCheckedItems[itemId] = true;
    const parent = findParent(data, itemId);
    if (parent) {
      checkParent(parent.id, updatedCheckedItems);
    }
  };

  // solution 1
  // const uncheckAllChildren = (
  //   dataCopy: Item[],
  //   itemId: number,
  //   updatedCheckedItems: ItemByIdMap
  // ) => {
  //   for (const item of dataCopy) {
  //     if (item.id === itemId) {
  //       uncheckChild(item, updatedCheckedItems);
  //       return;
  //     }

  //     if (item.children.length > 0) {
  //       uncheckAllChildren(item.children, itemId, updatedCheckedItems);
  //     }
  //   }
  // };

  // const uncheckChild = (item: Item, updatedCheckedItems: ItemByIdMap) => {
  //   updatedCheckedItems[item.id] = false;
  //   for (const childNode of item.children) {
  //     uncheckChild(childNode, updatedCheckedItems);
  //   }
  // };

  // alternative solution
  const uncheckChild = (child: Item, updatedCheckedItems: ItemByIdMap) => {
    updatedCheckedItems[child.id] = false;
    for (const childNode of child.children) {
      uncheckChild(childNode, updatedCheckedItems);
    }
  };

  const uncheckChildren = (
    itemId: number,
    updatedCheckedItems: ItemByIdMap
  ) => {
    updatedCheckedItems[itemId] = false;
    // currItem is top level item
    let currItem = data.find((d) => d.id === itemId);

    // else currItem should be a nested item and can be found using the findParent func
    if (!currItem) {
      currItem = findParent(data, itemId);
    }

    if (currItem?.children.length) {
      currItem.children.forEach((child) => {
        uncheckChild(child, updatedCheckedItems);
      });
    }
  };

  const filteredData = filterData(data, searchQuery);

  const renderTree = (data: Item[]) => {
    return (
      <ul>
        {data.map((item) => {
          return (
            <li>
              <span
                onClick={() => handleExpandToggle(item.id)}
                style={{
                  cursor: "pointer",
                  paddingLeft: item.children.length > 0 ? "0" : "10px",
                }}
              >
                {item.children.length > 0 && ">"}
              </span>
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={() => handleCheckToggle(item.id)}
              />
              {item.name}
              {expandedItems[item.id] &&
                item.children.length > 0 &&
                renderTree(item.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div style={{ border: "solid black 1px" }}>
      <input
        type="text"
        style={{ padding: "10px", width: "100%", color: "#000" }}
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search.."
      />
      <div>{renderTree(filteredData)}</div>
    </div>
  );
};

export default CheckedTree;
