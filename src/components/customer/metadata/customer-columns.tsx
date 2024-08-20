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
    accessorKey: 'name',
    header: 'Company Name',
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('name') || ' - '}</div>;
    }
  },
  {
    accessorKey: 'customer_group',
    header: 'Customer Group',
    cell: ({ row }) => <div className="capitalize">{row.getValue('customer_group') || ' - '}</div>
  },
  {
    accessorKey: 'customer_type',
    header: 'Customer Type',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('customer_type') || ' - '}</div>
    )
  },
  {
    accessorKey: 'customer_primary_contact',
    header: 'Contact Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('customer_primary_contact') || ' - '}</div>
  },

  {
    accessorKey: 'mobile_no',
    header: 'Contact Number',
    cell: ({ row }) => <div className="capitalize">{row.getValue('mobile_no') || ' - '}</div>
  },
  {
    accessorKey: 'email_id',
    header: 'Email',
    cell: ({ row }) => <div className="camelcase">{row.getValue('email_id') || ' - '}</div>
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
            await deleteDoc("Customer", row.original.name);
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
          onClick={() => navigation(`/customer/edit/${row.original.name}`)}
        >
          <Icon.Pencil className='h-4 w-4 text-secondary-muted' />
        </div>
      );
    },
  },
];
