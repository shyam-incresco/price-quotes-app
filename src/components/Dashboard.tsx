import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching when the tab is loaded
    const fetchData = async () => {
      const result = await new Promise<string>((resolve) => {
        setTimeout(() => resolve('Dashboard data loaded'), 1000);
      });
      setData(result);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only when the component mounts

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? <p>{data}</p> : <p>Loading data...</p>}
      <ItemList />
    </div>
  );
};

export default Dashboard;
