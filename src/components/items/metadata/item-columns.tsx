import { Checkbox } from "@camped-ui/checkbox";
import { Icon } from "../../icons";

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
    cell: ({ row }: any) => (
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
    cell: ({ row }: any) => <div className='capitalize'>{row.index + 1}</div>,
  },
  {
    accessorKey: "item_code",
    header: "Item Code",
    cell: ({ row }: any) => <div>{row.getValue("item_code")}</div>,
  },
  {
    accessorKey: "item_name",
    header: "Item Name",
    cell: ({ row }: any) => <div>{row.getValue("item_name")}</div>,
  },
  {
    accessorKey: "item_group",
    header: "Item Group",
    cell: ({ row }: any) => <div>{row.getValue("item_group")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: any) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "stock_uom",
    header: "Unit of Measurement",
    cell: ({ row }: any) => <div>{row.getValue("stock_uom")}</div>,
  },
  {
    accessorKey: "valuation_rate",
    header: "Standard Valuation Rate",
    cell: ({ row }: any) => (
      <div className='capitalize'>{row.getValue("valuation_rate")}</div>
    ),
  },
  {
    id: "delete",
    enableHiding: false,
    cell: () => {
      return (
        <div className='cursor-pointer'>
          <Icon.trash className='h-4 w-4 text-destructive' />
        </div>
      );
    },
  },
  {
    id: "edit",
    enableHiding: false,
    cell: () => {
      return (
        <div className='cursor-pointer'>
          <Icon.Pencil className='h-4 w-4 text-secondary-muted' />
        </div>
      );
    },
  },
];
