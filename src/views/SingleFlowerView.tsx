import React from 'react';

import { NavBar } from '../components/common/NavBar/NavBar';
import { OneFlower } from '../components/OneFlower/OneFlower';

export const SingleFlowerView = () => {
  return (
    <>
      <NavBar page="single" />
      <OneFlower />
    </>
  );
};
