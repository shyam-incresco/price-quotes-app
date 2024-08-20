import { useFrappeGetDocList } from "frappe-react-sdk";
import { columns } from "./metadata/customer-columns";
import { DataTable } from "../ui/data-table/data-table";
import { useNavigate } from "react-router-dom";

const CustomerListContainer = () => {
  const navigation = useNavigate();
  const { data, error, isValidating } = useFrappeGetDocList("Customer", {
    fields: ["*"],
    limit: 10,
  });

  if (isValidating) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error loading customers: {JSON.stringify(error)}</div>;
  }

  if (data) {
    return (
      <div className='flex flex-col p-4 bg-background pt-10 w-full'>
        <DataTable
          data={data}
          columns={columns}
          title='List of Customers'
          ctaLabel='Add new customer'
          handleCta={() => {
            navigation("/customer/create/1");
          }}
          isLoading={false}
        />
      </div>
    );
  }

  return null;
};

export default CustomerListContainer;
