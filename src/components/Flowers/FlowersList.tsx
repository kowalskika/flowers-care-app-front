import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { FlowersTable } from './FlowersTable';

export const FlowersList = () => {
  const [data, setData] = useState<FlowerEntity[] | null>(null);

  const refreshFlowerList = async () => {
    setData(null);

    const res = await fetch('http://localhost:3001/flower');
    setData(await res.json());
  };

  useEffect(() => {
    refreshFlowerList();
  }, []);

  if (data === null) return <Spinner />;

  return (
    <div>
      <h1>Flowers :</h1>
      <FlowersTable
        flowersList={data}
        onFlowerChange={refreshFlowerList}
      />
    </div>
  );
};
