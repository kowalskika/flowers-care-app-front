import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { SlSocialGithub } from 'react-icons/sl';
import { SettingButton } from '../SettingsButton/SettingsButton';
import { AddButton } from '../AddButton/AddButton';
import { GoBackButton } from '../GoBackButton/GoBackButton';

export function NavBar(props: { page: string }) {
  const { page } = props;
  return (
    <header className="nav-bar__header">
      <p>Your Flowers Care</p>

      <nav>
        <ul className="nav-bar__links">
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
