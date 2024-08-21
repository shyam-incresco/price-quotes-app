import {
  useFrappeDeleteDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { columns } from "./metadata/item-group-columns";
import { DataTable } from "../ui/data-table/data-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleCreateItemGroup,
  handleEditItemGroup,
} from "../../utils/item-group";
import { useDynamicItemGroupTabsStore } from "../../store";

const ItemGroupListContainer = () => {
  const createTabData = useDynamicItemGroupTabsStore((state: any) => state);
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const { data, isValidating, isLoading, mutate } = useFrappeGetDocList(
    "Item Group",
    {
      fields: ["name"],
      limit: pageSize * page,
      limit_start: 0,
    }
  );

  const { data: ItemCount, mutate: mutateCount }: any =
    useFrappeGetDocCount("Item Group");
  const { deleteDoc } = useFrappeDeleteDoc();

  const handleDelete = async (row: any) => {
    const response: any = await deleteDoc("Item Group", row.original.name);
    if (response.data === "ok") {
      mutate();
      mutateCount();
    }
  };

  const handleEditIem = async (row: any) => {
    handleEditItemGroup({
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
          title='List of Item Group'
          ctaLabel='Add new item group'
          handleCta={() => {
            handleCreateItemGroup({ tabData: createTabData, navigation });
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

export default ItemGroupListContainer;
