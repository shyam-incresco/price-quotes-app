import { v4 as uuidv4 } from "uuid";

export const handleCreateItemGroup = ({
  tabData,
  navigation,
}: {
  tabData: any;
  navigation: any;
}) => {
  let newUUId = uuidv4();
  const newPath = `/item-group/create/${newUUId}`;
  const newData = {
    title: `Create Item Group`,
    path: newPath,
    isClosable: true,
  };
  tabData.createNewItem(newData);
  navigation(newPath);
};

export const handleEditItemGroup = ({
  id,
  viewItems,
  navigation,
}: {
  id: string;
  viewItems: any;
  navigation: any;
}) => {
  const newPath = `/item-group/edit/${id}`;
  const existingItems = viewItems.items?.find((item: any) =>
    item?.path?.includes(id)
  );
  if (existingItems) {
    navigation(newPath);
  } else {
    const newData = {
      title: id,
      path: newPath,
      queryKey: newPath.replace("/", ""),
      isClosable: true,
    };
    viewItems.createNewItem(newData);
    navigation(newPath);
  }
};
