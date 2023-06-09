import React, { MouseEvent, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  SlEnvolopeLetter, SlSettings, SlTrash, SlLogout, SlArrowLeftCircle,
} from 'react-icons/sl';

import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

import './SettingsOptions.css';

export const SettingsOptions = () => {
  const [confirm, setConfirm] = useState(false);

  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setAuth(null);
    await axiosPrivate.delete('sessions');
  };

  const handleDeleteAccount = async (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      if (!confirm) {
        setConfirm(true);
        return;
      }
      await axiosPrivate.delete('session');
      await axiosPrivate.delete(`user/${auth?.id}`);
      localStorage.removeItem('user');
      setAuth(null);
    } catch (err) {
      navigate('/error');
    }
  };

  return (
    <section className="SettingsOptions">
      <h1 className="SettingsOptions__title">Ustawienia </h1>
      <div className="SettingsOptions__links-group">
        <NavLink
          to="email"
          className="SettingsOptions__link"
        >
          <SlEnvolopeLetter /> Zmień adres email
        </NavLink>
        <NavLink
          to="allowMail"
          className="SettingsOptions__link"
        >
          <SlEnvolopeLetter /> Powiadomienia mail
        </NavLink>
        <NavLink
          to="password"
          className="SettingsOptions__link"
        >
          <SlSettings /> Zmień hasło
        </NavLink>

        <Link
          to="/delete-account"
          className={`SettingsOptions__link ${confirm ? 'SettingsOptions__link--delete' : ''}`}
          onClick={handleDeleteAccount}
        >
          { !confirm
            ? <><SlTrash />Usuń konto</>
            : <><SlTrash />Potwierdź</>}
        </Link>

        <Link
          to="/logout"
          className="SettingsOptions__link"
          onClick={handleLogout}
        ><SlLogout /> Wyloguj
        </Link>
        <Link
          to="/"
          className="SettingsOptions__link"
        >
          <SlArrowLeftCircle /> Wróć do strony głównej
        </Link>
      </div>
    </section>
  );
};
