import { useNavigate, useParams } from "react-router-dom";
import EditItemContainer from "../../components/items/EditItemContainer";
import MainLayout from "../../components/MainLayout";
import { useDynamicItemsTabsStore } from "../../store";

const EditItem = () => {
  const { itemId } = useParams();
  const createTabData = useDynamicItemsTabsStore((state: any) => state.items);
  const deleteTabData = useDynamicItemsTabsStore(
    (state: any) => state.deleteItem
  );
  const navigation = useNavigate();

  return (
    <MainLayout
      tabsData={createTabData}
      tabKey='items'
      handleDeleteData={(tabIndex: number) => {
        deleteTabData(tabIndex, navigation);
      }}
    >
      <EditItemContainer itemId={itemId || ""} />
    </MainLayout>
  );
};

export default EditItem;
