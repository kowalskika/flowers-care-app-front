import React from 'react';
import './AddButton.css';

export const AddButton = (props: { confirm: boolean }) => {
  const { confirm } = props;
  if (confirm) {
    return (
      <button className="btn" type="submit">
        <img className="btn-img" src="/assets/styles/icons/add.png" alt="dodaj kwiat" />Dodaj
      </button>
    );
  }
  return (
    <div className="add-btn">
      <a href="/flower/form/add">
        <img className="btn-img" src="/assets/styles/icons/add.png" alt="dodaj kwiat" />
        <p className="add-btn-p">Dodaj następny</p>
      </a>
    </div>
  );
};
