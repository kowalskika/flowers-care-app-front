import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorView.css';

export const ErrorView = () => {
  return (
    <article className="ErrorView">
      <p className="ErrorView__top-paraph">Ups!</p>
      <p className="ErrorView__bottom-paraph">Coś poszło nie tak. Spróbuj ponownie później!</p>
      <Link className="ErrorView__link" to="/">Wróć do strony głównej</Link>
    </article>
  );
};
