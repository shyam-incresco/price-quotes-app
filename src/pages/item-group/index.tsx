import { useEffect } from "react";
import ItemGroupListContainer from "../../components/item-group/ItemGroupListContainer";
import MainLayout from "../../components/MainLayout";
import {
  useActiveTabDetails,
  useCreateItems,
  useDynamicItemGroupTabsStore,
} from "../../store";
import { useNavigate } from "react-router-dom";

const ItemGroup = () => {
  const createTabData = useDynamicItemGroupTabsStore(
    (state: any) => state.items
  );
  const activeTabs: any = useActiveTabDetails((state) => state);
  const deleteTabData = useDynamicItemGroupTabsStore(
    (state: any) => state.deleteItem
  );
  const deleteItem = useCreateItems((state: any) => state.deleteItem);

  const navigation = useNavigate();

  useEffect(() => {
    if (activeTabs.tabs?.itemGroup !== "/item-group" && activeTabs.tabs?.itemGroup) {
      navigation(activeTabs.tabs?.itemGroup);
    }
  }, []);

  return (
    <MainLayout
      tabsData={createTabData}
      tabKey='itemGroup'
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
      <ItemGroupListContainer />
    </MainLayout>
  );
};

export default ItemGroup;
