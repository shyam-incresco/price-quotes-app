import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData } from "./metadata/item-group-form-schema";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Button } from "@camped-ui/button";
import { useCreateItemGroup, useDynamicItemGroupTabsStore } from "../../store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateGroupItemContainer = ({ createID }: { createID: string }) => {
  const form = useForm();
  const navigation = useNavigate();
  const { createDoc, error } = useFrappeCreateDoc();
  const createItem: any = useCreateItemGroup((state) => state);
  const tabsData: any = useDynamicItemGroupTabsStore((state: any) => state);

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
    const formattedData = { ...data, item_group_name: data?.name };
    const currentTabIndex = tabsData?.items?.findIndex(
      (item: any) => item.path === window.location.pathname
    );
    const response = await createDoc("Item Group", formattedData);

    if (Object.keys(response || {}).length > 0 && !error) {
      toast.success(
        `Item Group: ${response?.name} has been added successfully!`
      );
      createItem.deleteItem(createID);
      tabsData.deleteItem(currentTabIndex, navigation);
    }
  };

  const handleUpdateData = ({ data }: any) => {
    createItem.updateItemGroupName(createID, data);
  };

  return (
    <div className='w-full h-screen bg-secondary px-3 pt-10 pb-6 bg-white flex justify-center items-start'>
      <div className='w-full max-w-5xl h-[80%]'>
        <div className='px-20 justify-center'>
          <h1 className='text-2xl font-semibold text-primary mb-6'>
            Add New Item Group
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
              <Button type='submit'>Add item group</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateGroupItemContainer;
