import React, {
  FormEvent, useEffect, useState,
} from 'react';

import { SettingsMode } from '../ChangeSettingsMode/SettingsMode';
import { axios } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../common/Spinner/Spinner';

export const AllowMailEditor = () => {
  const [allowMail, setAllowMail] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    setError('');
  }, [allowMail]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.patch(`user/mailAllow/${auth?.id}`, { newAllowMail: allowMail });
      setError('');
      setAllowMail(false);
      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      const message = err.response.data.message || 'Coś poszło nie tak, spróbuj ponownie później.';
      setSuccess(false);
      setError(message);
      setLoading(false);
    }
  };

  return (
    <SettingsMode>
      <form
        className="EmailEditor"
        onSubmit={handleSubmit}
      >
        <h2>Zmień zgodę na otrzymywanie wiadomości email.</h2>
        <label> Zaznacz aby otrzymywać powiadomienia email, jeśli zapomnisz podlać swoje kwiaty:
          <input
            className="Register__allowMail-checkbox"
            type="checkbox"
            name="AllowMail"
            value="true"
            onChange={(e) => setAllowMail(e.target.checked)}
          />
        </label>
        <button disabled={!!error} type="submit">
          Zapisz
          { loading && <Spinner /> }
        </button>
        { error && <p className="error">{ error }</p> }
        { success && <p className="success">Zmiany zostały zapisane.</p> }
      </form>
    </SettingsMode>
  );
};
