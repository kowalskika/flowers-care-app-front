import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { SlClose } from 'react-icons/sl';

import { SettingsMode } from '../ChangeSettingsMode/SettingsMode';
import { useAuth } from '../../hooks/useAuth';
import { useUserValidation } from '../../hooks/useRegisterValidation';
import { axios } from '../../api/axios';
import { Spinner } from '../common/Spinner/Spinner';

export const PasswordEditor = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { auth } = useAuth();

  const {
    passwordError,
    passwordRepetitionError,
  } = useUserValidation({ password: newPassword, passwordRepetition: passwordRep });

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [oldPassword, passwordRep, newPassword]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!newPassword || passwordError || !passwordRep || passwordRepetitionError || !oldPassword) {
        return;
      }
      setLoading(true);
      await axios.patch(`user/${auth?.id}`, { newPassword, password: oldPassword });
      setError('');
      setNewPassword('');
      setPasswordRep('');
      setOldPassword('');
      setLoading(false);
      setSuccess(true);
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
        <h2>Zmień hasło</h2>
        <label>Nowe hasło
          <input
            ref={inputRef}
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
          />
          { passwordError && (
            <>
              <span><SlClose /></span>
              <p>Hasło musi się składać z conajmniej 8 znaków oraz musi zawierać conajmniej jedną małą literę, jedną wielką literę, jedeną liczbę oraz któryś ze znaków specjalnych:  "?", "!", "@", "#", "$", "%".
              </p>
            </>
          ) }
        </label>
        <label>Powtórz hasło
          <input
            type="password"
            required
            value={passwordRep}
            onChange={(e) => setPasswordRep(e.target.value)}
          />
          { passwordRepetitionError && (
            <>
              <span><SlClose /></span>
              <p>Podane hasła nie są takie same.</p>
            </>
          ) }
        </label>
        <label>Podaj stare hasło
          <input
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!newPassword || passwordError || !passwordRep || passwordRepetitionError || !oldPassword || !!error}>
          Zapisz
          { loading && <Spinner /> }
        </button>
        { error && <p className="error">{ error }</p> }
        { success && <p className="success">Zmiany zostały zapisane.</p> }
      </form>
    </SettingsMode>
  );
};
