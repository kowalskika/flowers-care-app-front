import React from 'react';
import { AddButton } from '../components/common/AddButton/AddButton';
import { FlowersList } from '../components/FlowersList/FlowersList';
import { Header } from '../components/common/Header/Header';

export const FlowersView = () => {
  return (
    <>
      <Header goBack={false} />
      <FlowersList />
      <AddButton confirm={false} />
    </>
  );
};
