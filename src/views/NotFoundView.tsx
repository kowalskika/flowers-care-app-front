import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header/Header';

export const NotFoundView = () => (
  <>
    <Header goBack />
    <h1>Nie znaleziono takiej strony</h1>
    <p>
      <Link to="/flower">Powrót</Link>
    </p>
  </>
);
