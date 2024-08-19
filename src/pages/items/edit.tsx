import EditItem from "../../components/items/ItemsEdit";
import MainLayout from "../../components/MainLayout";

const ItemEdit = () => {
  const pathName = window.location.pathname;
  return (
    <MainLayout>
      <EditItem itemName={pathName?.split("/").pop() || ""} />
    </MainLayout>
  );
};

export default ItemEdit;
