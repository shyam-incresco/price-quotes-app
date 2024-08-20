import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData } from "./metadata/items-form-schema";
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk";
import { Button } from "@camped-ui/button";
import { useEffect } from "react";

const EditItemContainer = ({ itemName }: { itemName: string }) => {
  const form = useForm();

  const { data } = useFrappeGetDoc("Item", itemName, {}, {});

  const { updateDoc } = useFrappeUpdateDoc();

  useEffect(() => {
    if (!form.formState.isDirty && !data) return;

    (() => {
      metaData?.map((item) => {
        form.setValue(item.fieldName, data?.[item.fieldName] || "");
      });
    })();
  }, [form.formState.isDirty, data]);

  const handleUpdate = async (data: any) => {
    const formattedData = { ...data, item_code: itemName };
    await updateDoc("Item", itemName, formattedData);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-8'>
          <div className=' flex flex-row gap-4'>
            {metaData?.map((item) => {
              return (
                <DynamicFormComponents
                  schemaData={item}
                  handleOnBlur={() => {}}
                  control={form.control}
                  watch={form.watch}
                  key={item?.fieldName}
                />
              );
            })}
          </div>
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditItemContainer;
