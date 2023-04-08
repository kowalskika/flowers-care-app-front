import React from 'react';
import { FlowersList } from '../components/FlowersList/FlowersList';
import { NavBar } from '../components/common/NavBar/NavBar';

export const FlowersView = () => {
  return (
    <>
      <NavBar page="main" />
      <FlowersList />
    </>
  );
};
