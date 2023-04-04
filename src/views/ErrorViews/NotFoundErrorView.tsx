import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorView.css';

export const NotFoundErrorView = () => (
  <article className="ErrorView">
    <p className="ErrorView__top-paraph">404</p>
    <p className="ErrorView__bottom-paraph">Strona której szukasz nie istnieje.</p>
    <Link className="ErrorView__link" to="/">Wróć do strony głównej</Link>
  </article>
);
