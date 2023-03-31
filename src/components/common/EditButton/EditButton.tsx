import React from 'react';

export const EditButton = () => {
  return (
    <div className="add-btn">
      <a href="/flower/form/edit">
        <img className="btn-img" src="/assets/styles/icons/edit.png" alt="Edytuj kwiat" />
        <p className="add-btn-p">Edytuj</p>
      </a>
    </div>
  );
};
