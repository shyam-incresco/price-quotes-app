import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useActiveTabDetails = create(
  persist(
    (set, get) => ({
      tabs: {
        quotes: "/quotes",
        customers: "/customers",
        items: "/items",
        itemGroup: "/item-group",
      },
      updateActiveTabs: (key: string, value: any) => {
        let tabs = get().tabs;
        tabs[key] = value || 0;
        set({ tabs });
      },
    }),
    {
      name: "active-tab-detail",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useCreateItems = create(
  persist(
    (set, get) => ({
      data: {},
      createNewItem: (uuid: string) => {
        let data = get().data;
        if (Object.keys(data[uuid] || {}).length <= 0) {
          data[uuid] = {
            name: "",
            item_name: "",
            item_group: "",
            description: "",
            stock_uom: "",
            valuation_rate: "",
          };
          set({ data });
        }
      },
      updateItemId: (uuid: string, itemID: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          name: itemID,
        };
        set({ data });
      },
      updateItemName: (uuid: string, itemName: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          item_name: itemName,
        };
        set({ data });
      },
      updateItemGroup: (uuid: string, itemGroup: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          item_group: itemGroup,
        };
        set({ data });
      },
      updateItemDescription: (uuid: string, itemDescription: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          description: itemDescription,
        };
        set({ data });
      },
      updateItemStockUom: (uuid: string, stockUom: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          stock_uom: stockUom,
        };
        set({ data });
      },
      updateItemValuationRate: (uuid: string, valuationRate: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          valuation_rate: valuationRate,
        };
        set({ data });
      },
      deleteItem: (uuid: string) => {
        let data = get().data;
        delete data[uuid];
        set({ data });
      },
    }),
    {
      name: "create-item-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useDynamicItemsTabsStore = create(
  persist(
    (set, get) => ({
      items: [
        {
          title: "Items",
          path: "/Items",
          isClosable: false,
        },
      ],

      createNewItem: (newItemData: any) => {
        const items = get().items;
        items.push(newItemData);
        set({
          items,
        });
      },

      deleteItem: (tabIndex: number, navigation: any) => {
        const items = get().items;
        const currentPathName = window.location.pathname;
        const isActiveTab = items[tabIndex]?.path === currentPathName;
        let finalPath = "/items";
        let newItems = items.filter(
          (item: any) => item?.path !== items[tabIndex]?.path
        );
        set({ items: newItems });
        if (newItems?.length === 1) {
          navigation(`/items`);
        } else if (isActiveTab) {
          if (tabIndex === 1) {
            navigation(`/items`);
          } else {
            finalPath = newItems[tabIndex - 1]?.path;
            navigation(newItems[tabIndex - 1]?.path);
          }
        } else {
          finalPath = newItems[tabIndex - 1]?.path;
        }
        return finalPath;
      },
    }),
    {
      name: "items-tab",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useDynamicItemGroupTabsStore = create(
  persist(
    (set, get) => ({
      items: [
        {
          title: "Item Group",
          path: "/item-group",
          isClosable: false,
        },
      ],

      createNewItem: (newItemData: any) => {
        const items = get().items;
        items.push(newItemData);
        set({
          items,
        });
      },

      deleteItem: (tabIndex: number, navigation: any) => {
        const items = get().items;
        const currentPathName = window.location.pathname;
        const isActiveTab = items[tabIndex]?.path === currentPathName;
        let finalPath = "/item-group";
        let newItems = items.filter(
          (item: any) => item?.path !== items[tabIndex]?.path
        );
        set({ items: newItems });
        if (newItems?.length === 1) {
          navigation(`/item-group`);
        } else if (isActiveTab) {
          if (tabIndex === 1) {
            navigation(`/item-group`);
          } else {
            finalPath = newItems[tabIndex - 1]?.path;
            navigation(newItems[tabIndex - 1]?.path);
          }
        } else {
          finalPath = newItems[tabIndex - 1]?.path;
        }
        return finalPath;
      },
    }),
    {
      name: "item-group-tab",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useCreateItemGroup = create(
  persist(
    (set, get) => ({
      data: {},
      createNewItem: (uuid: string) => {
        let data = get().data;
        if (Object.keys(data[uuid] || {}).length <= 0) {
          data[uuid] = {
            name: "",
          };
          set({ data });
        }
      },
      updateItemGroupName: (uuid: string, name: string) => {
        let data = get().data;
        data[uuid] = {
          ...data[uuid],
          name: name,
        };
        set({ data });
      },

      deleteItem: (uuid: string) => {
        let data = get().data;
        delete data[uuid];
        set({ data });
      },
    }),
    {
      name: "create-item-group-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
