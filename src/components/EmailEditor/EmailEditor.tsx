import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { SlClose } from 'react-icons/sl';

import { SettingsMode } from '../ChangeSettingsMode/SettingsMode';
import { useUserValidation } from '../../hooks/useRegisterValidation';
import { axios } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../common/Spinner/Spinner';

export const EmailEditor = () => {
  const [email, setEmail] = useState('');
  const [emailRep, setEmailRep] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const {
    emailError,
    emailRepetitionError,
  } = useUserValidation({ email, emailRepetition: emailRep });

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [email, emailRep, password]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || emailError || !emailRep || emailRepetitionError || !password) {
        return;
      }
      setLoading(true);
      await axios.patch(`user/${auth?.id}`, { newEmail: email, password });
      setError('');
      setPassword('');
      setEmailRep('');
      setEmail('');
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
        <h2>Zmień adres email</h2>
        <label>Podaj nowy adres email
          <input
            ref={inputRef}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          { emailError && (
            <>
              <span><SlClose /></span>
              <p>Nieprawidłowy adres email.</p>
            </>
          ) }
        </label>
        <label>Powtórz adres email
          <input
            type="email"
            required
            value={emailRep}
            onChange={(e) => setEmailRep(e.target.value)}
          />
          { emailRepetitionError && (
            <>
              <span><SlClose /></span>
              <p>Podane adresy różnią się.</p>
            </>
          ) }
        </label>
        <label>Hasło
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button disabled={!email || emailError || !emailRep || emailRepetitionError || !password || !!error} type="submit">
          Zapisz
          { loading && <Spinner /> }
        </button>

        { error && <p className="error">{ error }</p> }
        { success && <p className="success">Zmiany zostały zapisane.</p> }
      </form>
    </SettingsMode>
  );
};
