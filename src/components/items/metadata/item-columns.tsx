import { Checkbox } from "@camped-ui/checkbox";
import { Icon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { useFrappeDeleteDoc } from "frappe-react-sdk";

export const columns = [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
          aria-label='Select all rows'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected(!row.getIsSelected())}
          aria-label='Select row'
        />
      </div>
    ),
  },
  {
    accessorKey: "No",
    header: "No.",
    cell: ({ row }) => <div className='capitalize'>{row.index + 1}</div>,
  },
  {
    accessorKey: "item_code",
    header: "Item Code",
    cell: ({ row }) => <div>{row.getValue("item_code")}</div>,
  },
  {
    accessorKey: "item_name",
    header: "Item Name",
    cell: ({ row }) => <div>{row.getValue("item_name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "stock_uom",
    header: "Unit of Measurement",
    cell: ({ row }) => <div>{row.getValue("stock_uom")}</div>,
  },
  {
    accessorKey: "valuation_rate",
    header: "Standard Valuation Rate",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("valuation_rate")}</div>
    ),
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const { deleteDoc } = useFrappeDeleteDoc();
      return (
        <div
          className='cursor-pointer'
          onClick={async () => {
            await deleteDoc("Item", row.original.item_code);
          }}
        >
          <Icon.trash className='h-4 w-4 text-destructive' />
        </div>
      );
    },
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const navigation = useNavigate();

      return (
        <div
          className='cursor-pointer'
          onClick={() => navigation(`/item/edit/${row.original.item_code}`)}
        >
          <Icon.Pencil className='h-4 w-4 text-secondary-muted' />
        </div>
      );
    },
  },
];
