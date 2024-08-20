import { useForm } from "react-hook-form";
import { Form } from "@camped-ui/form";
import DynamicFormComponents from "../ui/dynamicFormComponents";
import { metaData } from "./metadata/customer-form-schema";
import {
  useFrappeGetDoc,
  useFrappeGetDocList,
  useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { Button } from "@camped-ui/button";
import { useEffect } from "react";

const EditCustomerContainer = ({ itemName }: { itemName: string }) => {
  const form = useForm();
  const formMattedItemsName = itemName?.replaceAll("%20", " ");
  const { data } = useFrappeGetDoc("Customer", formMattedItemsName, {}, {});
  const { data: contactData }: any = useFrappeGetDocList("Contact", {}, {});

  const { updateDoc } = useFrappeUpdateDoc();

  useEffect(() => {
    if (!form.formState.isDirty && !data && !contactData) return;

    (() => {
      metaData?.map((item) => {
        form.setValue(
          item.fieldName,
          data?.[item.fieldName] || contactData?.[item.fieldName] || ""
        );
      });
    })();
  }, [form.formState.isDirty, data, contactData]);

  const handleUpdate = async (data: any) => {
    const formattedData = {
      ...data,
      customer_name: formMattedItemsName,
    };

    await updateDoc("Contact", contactData?.customer_primary_contact, {
      customer_primary_contact: formattedData?.customer_primary_contact,
      customer_primary_address: formattedData?.customer_primary_address,
      phone: formattedData?.mobile_no,
      company_name: data?.name,
    });
    delete formattedData["customer_primary_contact"];
    delete formattedData["customer_primary_address"];
    delete formattedData["phone"];
    await updateDoc("Customer", formMattedItemsName, formattedData);
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

export default EditCustomerContainer;
