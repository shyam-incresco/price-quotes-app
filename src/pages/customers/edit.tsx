import EditCustomerContainer from "../../components/customer/EditCustomerContainer";
import MainLayout from "../../components/MainLayout";

const EditCustomer = () => {
  const pathName = window.location.pathname;
  return (
    <MainLayout>
      <EditCustomerContainer itemName={pathName?.split("/").pop() || ""} />
    </MainLayout>
  );
};

export default EditCustomer;
