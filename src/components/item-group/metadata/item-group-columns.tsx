import { Checkbox } from "@camped-ui/checkbox";
import { Icon } from "../../icons";
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
    accessorKey: "name",
    header: "Item Group Name",
    cell: ({ row }: any) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }: any) => {
      const { deleteDoc } = useFrappeDeleteDoc();
      return (
        <div
          className='cursor-pointer'
          onClick={async () => {
            await deleteDoc("Item Group", row.original.name);
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
    cell: () => {
      return (
        <div className='cursor-pointer'>
          <Icon.Pencil className='h-4 w-4 text-secondary-muted' />
        </div>
      );
    },
  },
];
