import { Table } from "@tanstack/react-table";
import { Button } from "@camped-ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { Icon } from "../../icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  title: string;
  ctaLabel: string | undefined;
  handleCta: any;
}

export function DataTableToolbar<TData>({
  table,
  title,
  ctaLabel,
  handleCta,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-lg font-semibold'>{title}</h1>
      <div className='flex flex-1 items-center space-x-2'>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Icon.X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex gap-3'>
        <DataTableViewOptions table={table} />
        <Button variant='default' onClick={() => handleCta()} size='sm'>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
