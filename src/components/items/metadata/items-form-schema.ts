export const metaData = [
  {
    label: "Item Code",
    fieldName: "name",
    inputType: "textInput",
    rules: { required: true },
    placeholder: "",
  },
  {
    label: "Item Name",
    fieldName: "item_name",
    inputType: "textInput",
    placeholder: "",
  },
  {
    label: "Item Group",
    fieldName: "item_group",
    inputType: "dropDown",
    items: [],
    rules: { required: true },
    placeholder: "",
  },
  {
    label: "Description",
    fieldName: "description",
    inputType: "textInput",
    placeholder: "",
  },
  {
    label: "Unit of Measurement",
    fieldName: "stock_uom",
    inputType: "dropDown",
    items: [],
    rules: { required: true },
    placeholder: "",
  },
  {
    label: "Standard Valuation Rate",
    fieldName: "valuation_rate",
    inputType: "textInput",
    rules: { required: true },
    placeholder: "",
  },
];
