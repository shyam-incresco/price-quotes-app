import {
  useFrappeDeleteDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { columns } from "./metadata/item-columns";
import { DataTable } from "../ui/data-table/data-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleCreateItems, handleEditItems } from "../../utils/items";
import { useDynamicItemsTabsStore } from "../../store";

const ItemListContainer = () => {
  const createTabData = useDynamicItemsTabsStore((state: any) => state);
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const { data, isValidating, isLoading, mutate } = useFrappeGetDocList(
    "Item",
    {
      fields: [
        "name",
        "item_code",
        "item_name",
        "item_group",
        "description",
        "stock_uom",
        "valuation_rate",
      ],
      limit: pageSize * page,
      limit_start: 0,
    }
  );

  const { data: ItemCount, mutate: mutateCount }: any =
    useFrappeGetDocCount("Item");
  const { deleteDoc } = useFrappeDeleteDoc();

  const handleDelete = async (row: any) => {
    const response: any = await deleteDoc("Item", row.original.name);
    if (response.data === "ok") {
      mutate();
      mutateCount();
    }
  };

  const handleEditIem = async (row: any) => {
    handleEditItems({
      id: row.original.name,
      viewItems: createTabData,
      navigation,
    });
  };

  if (data) {
    return (
      <div
        className='flex flex-col px-4 bg-background pt-10 w-full h-full mb-10 rounded-b-md'
        style={{ overflow: "scroll" }}
      >
        <DataTable
          data={data}
          columns={columns}
          title='List of Items'
          ctaLabel='Add new item'
          handleCta={() => {
            handleCreateItems({ tabData: createTabData, navigation });
          }}
          isLoading={isValidating || isLoading}
          totalItems={ItemCount}
          pageSize={pageSize || 10}
          page={page}
          handleDelete={handleDelete}
          handleEdit={handleEditIem}
        />
      </div>
    );
  }

  return null;
};

export default ItemListContainer;
