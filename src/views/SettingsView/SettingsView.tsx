import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsOptions } from '../../components/SettingsOptions/SettingsOptions';

import './SettingsView.css';
import { NavBar } from '../../components/common/NavBar/NavBar';

export const SettingsView = () => {
  return (
    <>
      <NavBar page="single" />
      <article className="SettingsView">
        <SettingsOptions />
        <Outlet />
      </article>
    </>
  );
};
