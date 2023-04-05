import React from 'react';
import { AddFlowerForm } from '../components/AddFlowerForm/AddFlowerForm';
import { NavBar } from '../components/common/NavBar/NavBar';

export const AddFlowerView = () => {
  return (
    <>
      <NavBar page="single" />
      <AddFlowerForm />
    </>
  );
};
