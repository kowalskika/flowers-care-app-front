import React from 'react';

import './ErrorView.css';
import { GoBackButton } from '../../components/common/GoBackButton/GoBackButton';

export const NotFoundErrorView = () => {
  return (
    <article className="ErrorView">
      <p className="ErrorView__top-paraph">404</p>
      <p className="ErrorView__bottom-paraph">Strona której szukasz nie istnieje.</p>
      <GoBackButton />
    </article>
  );
};
