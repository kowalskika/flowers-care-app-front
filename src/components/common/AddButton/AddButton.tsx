import React from 'react';
import { SlPlus, SlRocket } from 'react-icons/sl';

import './AddButton.css';

export const AddButton = (props: { confirm: boolean }) => {
  const { confirm } = props;
  if (confirm) {
    return (
      <button className="AddButton__a" type="submit">
        <SlRocket />Zapisz
      </button>
    );
  }
  return (
    <a className="AddButton__a" href="/flower/form/add">
      <SlPlus />Dodaj
    </a>
  );
};
