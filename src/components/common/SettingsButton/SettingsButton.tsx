import React from 'react';
import { Link } from 'react-router-dom';
import { SlSettings } from 'react-icons/sl';

export const SettingButton = () => {
  return (
    <Link
      to="/settings"
    ><SlSettings />Ustawienia
    </Link>
  );
};
