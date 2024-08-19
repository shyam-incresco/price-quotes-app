import React from "react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { columns } from "../items/metadata/item-columns";
import { DataTable } from "../ui/data-table/data-table";
import { useNavigate } from "react-router-dom";

const ItemList: React.FC = () => {
  const navigation = useNavigate();
  const { data, error, isValidating } = useFrappeGetDocList("Item", {
    fields: [
      "item_code",
      "item_name",
      "description",
      "stock_uom",
      "valuation_rate",
    ],
    limit: 10,
  });

  if (isValidating) {
    return <div>Loading items...</div>;
  }

  if (error) {
    return <div>Error loading items: {JSON.stringify(error)}</div>;
  }

  if (data) {
    return (
      <div className='flex flex-col p-4 bg-background pt-10 w-full'>
        <DataTable
          data={data}
          columns={columns}
          title='List of Items'
          ctaLabel='Add new item'
          handleCta={() => {
            navigation("/item/create/1");
          }}
          isLoading={false}
        />
      </div>
    );
  }

  return null;
};

export default ItemList;
