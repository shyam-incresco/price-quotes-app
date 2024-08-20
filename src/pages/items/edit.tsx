import EditItemContainer from "../../components/items/EditItemContainer";
import MainLayout from "../../components/MainLayout";

const EditItem = () => {
  const pathName = window.location.pathname;
  return (
    <MainLayout>
      <EditItemContainer itemName={pathName?.split("/").pop() || ""} />
    </MainLayout>
  );
};

export default EditItem;
