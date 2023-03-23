import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundView = () => (
  <>
    <h1>Nie znaleziono takiej strony</h1>
    <p>
      <Link to="/flower">Powrót</Link>
    </p>
  </>
);
