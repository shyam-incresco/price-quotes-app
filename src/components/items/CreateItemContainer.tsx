import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData as initialMetaData } from "./metadata/items-form-schema";
import { useFrappeCreateDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { Button } from "@camped-ui/button";
import { useEffect, useState } from "react";
import { useCreateItems, useDynamicItemsTabsStore } from "../../store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateItemContainer = ({ createID }: { createID: string }) => {
  const form = useForm();
  const navigation = useNavigate();
  const { createDoc, error } = useFrappeCreateDoc();
  const [itemGroups, setItemGroups] = useState<any[]>([]);
  const [uomOptions, setUomOptions] = useState<any[]>([]);
  const [metaData, setMetaData] = useState(initialMetaData);
  const createItem: any = useCreateItems((state) => state);
  const tabsData: any = useDynamicItemsTabsStore((state: any) => state);

  const { data: itemGroupsData } = useFrappeGetDocList("Item Group", {
    fields: ["name", "item_group_name"],
  });

  const { data: uomData } = useFrappeGetDocList("UOM", {
    filters: [["enabled", "=", "1"]],
    fields: ["name", "uom_name"],
  });

  useEffect(() => {
    if (itemGroupsData) {
      const groups = itemGroupsData.map((group: any) => ({
        value: group.name,
        label: group.item_group_name,
      }));
      setItemGroups(groups);
    }

    if (uomData) {
      const uoms = uomData.map((uom: any) => ({
        value: uom.name,
        label: uom.uom_name,
      }));
      setUomOptions(uoms);
    }
  }, [itemGroupsData, uomData]);

  useEffect(() => {
    const updatedMetaData: any = initialMetaData.map((item) => {
      if (item.fieldName === "item_group") {
        return { ...item, items: itemGroups };
      }
      if (item.fieldName === "stock_uom") {
        return { ...item, items: uomOptions };
      }
      return item;
    });
    setMetaData(updatedMetaData);
  }, [itemGroups, uomOptions]);

  useEffect(() => {
    if (!createID) return;

    metaData?.map((item) => {
      form.setValue(
        item.fieldName,
        createItem.data?.[createID]?.[item.fieldName] || ""
      );
    });
  }, [createID]);

  const handleCreate = async (data: any) => {
    const formattedData = { ...data, item_code: data?.name };
    const currentTabIndex = tabsData?.items?.findIndex(
      (item: any) => item.path === window.location.pathname
    );
    const response = await createDoc("Item", formattedData);
    if (Object.keys(response || {}).length > 0 && !error) {
      toast.success(
        `Item: ${response?.item_code}) has been added successfully!`
      );
      createItem.deleteItem(createID);
      tabsData.deleteItem(currentTabIndex, navigation);
    }
  };

  const handleUpdateData = ({ type, data }: any) => {
    if (type === "name") {
      createItem.updateItemId(createID, data);
    } else if (type === "item_name") {
      createItem.updateItemName(createID, data);
    } else if (type === "item_group") {
      createItem.updateItemGroup(createID, data);
    } else if (type === "description") {
      createItem.updateItemDescription(createID, data);
    } else if (type === "stock_uom") {
      createItem.updateItemStockUom(createID, data);
    } else if (type === "valuation_rate") {
      createItem.updateItemValuationRate(createID, data);
    }
  };

  return (
    <div className='w-full h-screen bg-secondary px-3 pt-10 pb-6 bg-white flex justify-center items-start overflow-scroll'>
      <div className='w-full max-w-5xl h-[80%]'>
        <div className='px-20 justify-center'>
          <h1 className='text-2xl font-semibold text-primary mb-6'>
            Add New Item
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
            className='space-y-8'
          >
            <div className='flex flex-wrap gap-10 justify-center pt-12 pb-12'>
              {metaData?.map((item) => (
                <div
                  key={item?.fieldName}
                  className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                >
                  <DynamicFormComponents
                    schemaData={item}
                    handleOnBlur={(data: any) => {
                      handleUpdateData(data);
                    }}
                    control={form.control}
                    watch={form.watch}
                    error={!!form.formState.errors?.[item?.fieldName]}
                  />
                </div>
              ))}
            </div>

            <div className='flex justify-center gap-4 mt-8'>
              <Button
                variant='outline'
                type='button'
                className='border-primary text-primary'
              >
                Cancel
              </Button>
              <Button type='submit'>Add item</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateItemContainer;
