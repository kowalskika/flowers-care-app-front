import React from 'react';
import { FlowersList } from '../components/Flowers/FlowersList';
import { AddFlower } from '../components/AddFlower/AddFlower';

export const FlowersView = () => {
  return (
    <>
      <FlowersList />
      <AddFlower />
    </>
  );
};
