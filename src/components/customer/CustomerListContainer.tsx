import { useFrappeGetDocCount, useFrappeGetDocList } from "frappe-react-sdk";
import { columns } from "./metadata/customer-columns";
import { DataTable } from "../ui/data-table/data-table";
import { useNavigate, useSearchParams } from "react-router-dom";

const CustomerListContainer = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const { data, error, isValidating, isLoading } = useFrappeGetDocList(
    "Customer",
    {
      fields: ["*"],
      limit: pageSize * page,
      limit_start: 0,
    }
  );

  const { data: CustomerCount }: any = useFrappeGetDocCount("Customer");

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
            // handleCreateItems({ tabData: createTabData, navigation });
          }}
          isLoading={isValidating || isLoading}
          totalItems={CustomerCount}
          pageSize={pageSize || 10}
          page={page}
        />
      </div>
    );
  }

  return null;
};

export default CustomerListContainer;
