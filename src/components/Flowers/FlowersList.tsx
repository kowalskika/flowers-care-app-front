import React, { useEffect, useState } from 'react';
import { FlowerEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { FlowersTable } from './FlowersTable';
import './FlowersList.css';
import { Header } from '../common/Header/Header';

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
      <Header />
      <FlowersTable
        flowersList={data}
        onFlowerChange={refreshFlowerList}
      />
    </div>
  );
};
