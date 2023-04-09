import React from 'react';
import { Link } from 'react-router-dom';
import { SlArrowLeftCircle } from 'react-icons/sl';

export const GoBackButton = () => {
  return (
    <Link to="/flower">
      <SlArrowLeftCircle /> Powrót
    </Link>
  );
};
