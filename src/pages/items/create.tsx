import { useNavigate, useParams } from "react-router-dom";
import CreateItemContainer from "../../components/items/CreateItemContainer";
import MainLayout from "../../components/MainLayout";
import { useCreateItems, useDynamicItemsTabsStore } from "../../store";
import { useEffect } from "react";

const CreateItem = () => {
  const createTabData = useDynamicItemsTabsStore((state: any) => state.items);
  const deleteTabData = useDynamicItemsTabsStore(
    (state: any) => state.deleteItem
  );
  const createNewItem = useCreateItems((state: any) => state.createNewItem);
  const deleteItem = useCreateItems((state: any) => state.deleteItem);
  const { createId }: any = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!createId) return;

    (() => {
      createNewItem(createId);
    })();
  }, [createId]);

  return (
    <MainLayout
      tabsData={createTabData}
      tabKey='items'
      handleDeleteData={(tabIndex: number) => {
        deleteTabData(tabIndex, navigation);
        deleteItem(createId);
      }}
    >
      <CreateItemContainer createID={createId} />
    </MainLayout>
  );
};

export default CreateItem;
