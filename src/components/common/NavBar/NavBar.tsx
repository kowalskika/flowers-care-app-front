import React from 'react';
import { Link } from 'react-router-dom';
import { SlSocialGithub } from 'react-icons/sl';

import './NavBar.css';
import { SettingButton } from '../SettingsButton/SettingsButton';
import { AddButton } from '../AddButton/AddButton';
import { GoBackButton } from '../GoBackButton/GoBackButton';

export function NavBar(props: { page: string }) {
  const { page } = props;
  return (
    <header className="NavBar__header">
      <p className="NavBar__p-mobile-disable">Your Flowers Care</p>
      <nav>
        <ul className="NavBar__links">
          {page === 'main' && (<li><AddButton confirm={false} /></li>)}
          {page === 'single' && (<li><GoBackButton /></li>)}
          <li>
            <SettingButton />
          </li>
          <li>
            <Link
              className="cta"
              target="_blank"
              to="https://github.com/kowalskika"
              rel="noreferrer"
            ><SlSocialGithub />Github
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
