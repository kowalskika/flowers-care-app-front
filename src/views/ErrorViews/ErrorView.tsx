import React from 'react';

import './ErrorView.css';
import { GoBackButton } from '../../components/common/GoBackButton/GoBackButton';

export const ErrorView = () => {
  return (
    <article className="ErrorView">
      <p className="ErrorView__top-paraph">Ups!</p>
      <p className="ErrorView__bottom-paraph">Coś poszło nie tak. Spróbuj ponownie później!</p>
      <GoBackButton />
    </article>
  );
};
