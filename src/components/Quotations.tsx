import React, { useState, useEffect } from 'react';

const Quotations: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await new Promise<string>((resolve) => {
        setTimeout(() => resolve('Quotations data loaded'), 1000);
      });
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Quotations</h2>
      {data ? <p>{data}</p> : <p>Loading data...</p>}
    </div>
  );
};

export default Quotations;
