import { useNavigate, useParams } from "react-router-dom";
import CreateGroupItemContainer from "../../components/item-group/CreateItemGroupContainer";
import MainLayout from "../../components/MainLayout";
import { useCreateItemGroup, useDynamicItemGroupTabsStore } from "../../store";
import { useEffect } from "react";

const CreateItemGroup = () => {
  const createTabData = useDynamicItemGroupTabsStore(
    (state: any) => state.items
  );
  const deleteTabData = useDynamicItemGroupTabsStore(
    (state: any) => state.deleteItem
  );
  const createNewItemGroup = useCreateItemGroup((state: any) => state.createNewItem);
  const deleteItem = useCreateItemGroup((state: any) => state.deleteItem);
  const { createId }: any = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!createId) return;

    (() => {
      createNewItemGroup(createId);
    })();
  }, [createId]);

  return (
    <MainLayout
      tabsData={createTabData}
      tabKey='itemGroup'
      handleDeleteData={(tabIndex: number) => {
        deleteTabData(tabIndex, navigation);
        deleteItem(createId);
      }}
    >
      <CreateGroupItemContainer createID={createId} />
    </MainLayout>
  );
};

export default CreateItemGroup;
