import React, { ReactNode, useRef } from 'react';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

import { useScreenBlur } from '../../hooks/useScreenBlur';
import './SettingsMode.css';

interface Props {
  children: ReactNode;
}

export const SettingsMode = ({ children }: Props) => {
  const handleBlur = useScreenBlur('/settings');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/settings');
  };

  return (
    <div className="SettingsMode-shadow">
      <section
        className="SettingsMode"
        onBlur={handleBlur}
        /* eslint-disable-next-line jsx-a11y/tabindex-no-positive */
        tabIndex={2}
      >
        <button
          type="submit"
          ref={useRef<HTMLButtonElement>(null!)}
          className="SettingsMode__close-btn"
          onClick={handleClick}
        ><SlClose className="SettingsMode__close-icon" />
        </button>
        <div className="SettingsMode__content">
          {children}
        </div>
      </section>
    </div>
  );
};
