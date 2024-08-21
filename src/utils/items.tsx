import { v4 as uuidv4 } from "uuid";

export const handleCreateItems = ({
  tabData,
  navigation,
}: {
  tabData: any;
  navigation: any;
}) => {
  let newUUId = uuidv4();
  const newPath = `/item/create/${newUUId}`;
  const newData = {
    title: `Create Item`,
    path: newPath,
    isClosable: true,
  };
  console.log({ newUUId });
  tabData.createNewItem(newData);
  navigation(newPath);
};

export const handleViewItems = ({
  id,
  viewItems,
  navigation,
}: {
  id: string;
  viewItems: any;
  navigation: any;
}) => {
  const newPath = `/item/view/${id}`;
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

export const handleEditItems = ({
  id,
  viewItems,
  navigation,
}: {
  id: string;
  viewItems: any;
  navigation: any;
}) => {
  const newPath = `/item/edit/${id}`;
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
