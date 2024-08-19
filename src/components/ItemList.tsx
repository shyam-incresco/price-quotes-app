import React from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';

const ItemList: React.FC = () => {
  const { data, error, isValidating, mutate } = useFrappeGetDocList('Item', {
    fields: ['name', 'item_name', 'item_group', 'stock_uom'],
    limit: 10,
  });

  if (isValidating) {
    return <div>Loading items...</div>;
  }

  if (error) {
    return <div>Error loading items: {JSON.stringify(error)}</div>;
  }

  if (data) {
    return (
      <div>
        <h2>Item List</h2>
        <ul>
          {data.map((item: any) => (
            <li key={item.name}>
              {item.item_name} - {item.item_group} - {item.stock_uom}
            </li>
          ))}
        </ul>
        <button onClick={() => mutate()}>Reload</button>
      </div>
    );
  }

  return null;
};

export default ItemList;
