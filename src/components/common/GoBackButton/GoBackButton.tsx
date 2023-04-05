import React from 'react';
import './GoBackButton.css';
import { Link } from 'react-router-dom';
import { SlArrowLeftCircle } from 'react-icons/sl';

export const GoBackButton = () => {
  return (
    <Link
      to="/"
    >
      <SlArrowLeftCircle /> Powrót
    </Link>
  );
};
