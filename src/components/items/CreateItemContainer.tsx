import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData } from "./metadata/items-form-schema";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Button } from "@camped-ui/button";

const CreateItemContainer = () => {
  const form = useForm();

  const { createDoc } = useFrappeCreateDoc();

  const handleCreate = async (data: any) => {
    const formattedData = { ...data, item_code: data?.name };
    await createDoc("Item", formattedData);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-8'>
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

export default CreateItemContainer;
