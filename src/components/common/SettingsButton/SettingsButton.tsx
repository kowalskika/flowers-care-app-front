import { SlSettings } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import React from 'react';

export const SettingButton = () => {
  return (
    <Link
      to="/settings"
    ><SlSettings />Ustawienia
    </Link>
  );
};
