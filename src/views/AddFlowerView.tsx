import React from 'react';
import { AddFlowerForm } from '../components/AddFlowerForm/AddFlowerForm';
import { Header } from '../components/common/Header/Header';

export const AddFlowerView = () => {
  return (
    <>
      <Header goBack />
      <AddFlowerForm />
    </>
  );
};
