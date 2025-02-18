import { useState } from "react";

interface Item {
  id: string;
  [key: string]: any;
}

interface UseItemsProps<T extends Item> {
  initialItems: T[];
}

export const useItems = <T extends Item>({ initialItems }: UseItemsProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const addItem = (newItem: T) => {
    setItems([...items, newItem]);
  };

  const updateItem = (itemId: string, updates: Partial<T>) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  const deleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateNestedItems = (
    parentId: string,
    nestedKey: keyof T,
    itemId: string,
    updates: Partial<T[keyof T]>
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === parentId && Array.isArray(item[nestedKey])) {
          return {
            ...item,
            [nestedKey]: item[nestedKey].map((nestedItem: Item) =>
              nestedItem.id === itemId
                ? { ...nestedItem, ...updates }
                : nestedItem
            ),
          };
        }
        return item;
      })
    );
  };

  const deleteNestedItem = (
    parentId: string,
    nestedKey: keyof T,
    itemId: string
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === parentId && Array.isArray(item[nestedKey])) {
          return {
            ...item,
            [nestedKey]: item[nestedKey].filter(
              (nestedItem: Item) => nestedItem.id !== itemId
            ),
          };
        }
        return item;
      })
    );
  };

  return {
    items,
    setItems,
    addItem,
    updateItem,
    deleteItem,
    updateNestedItems,
    deleteNestedItem,
  };
}; 