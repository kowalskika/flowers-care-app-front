import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsOptions } from '../../components/SettingsOptions/SettingsOptions';

import './SettingsView.css';

export const SettingsView = () => {
  return (
    <article className="SettingsView">
      <SettingsOptions />
      <Outlet />
    </article>
  );
};
