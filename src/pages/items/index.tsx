import { useEffect } from "react";
import ItemListContainer from "../../components/items/ItemListContainer";
import MainLayout from "../../components/MainLayout";
import {
  useActiveTabDetails,
  useCreateItems,
  useDynamicItemsTabsStore,
} from "../../store";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const createTabData = useDynamicItemsTabsStore((state: any) => state.items);
  const activeTabs: any = useActiveTabDetails((state) => state);
  const deleteTabData = useDynamicItemsTabsStore(
    (state: any) => state.deleteItem
  );
  const deleteItem = useCreateItems((state: any) => state.deleteItem);

  const navigation = useNavigate();

  useEffect(() => {
    if (activeTabs.tabs?.items !== "/items" && activeTabs.tabs?.items) {
      navigation(activeTabs.tabs?.items);
    }
  }, []);

  return (
    <MainLayout
      tabsData={createTabData}
      tabKey='items'
      handleDeleteData={(tabIndex: number, createTabIndex?: number) => {
        const id = createTabData[tabIndex]?.path.includes("/create")
          ? createTabData[tabIndex]?.path?.split("/").pop()
          : null;
        deleteTabData(tabIndex, navigation);
        if (id) {
          deleteItem(createTabIndex);
        }
      }}
    >
      <ItemListContainer />
    </MainLayout>
  );
};

export default Items;
