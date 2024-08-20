import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData } from "./metadata/customer-form-schema";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Button } from "@camped-ui/button";

const CreateCustomerContainer = () => {
  const form = useForm();

  const { createDoc } = useFrappeCreateDoc();

  const handleCreate = async (data: any) => {
    let formattedData = { ...data, customer_name: data?.name };
    await createDoc("Contact", {
      customer_primary_contact: formattedData?.customer_primary_contact,
      customer_primary_address: formattedData?.customer_primary_address,
      phone: formattedData?.mobile_no,
      company_name: data?.name,
    });
    delete formattedData["customer_primary_contact"];
    delete formattedData["customer_primary_address"];
    delete formattedData["phone"];
    await createDoc("Customer", formattedData);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-8'>
          <div className='flex flex-row gap-4'>
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

export default CreateCustomerContainer;
