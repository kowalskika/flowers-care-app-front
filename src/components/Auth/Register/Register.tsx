import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { useUserValidation } from '../../../hooks/useRegisterValidation';
import { axios } from '../../../api/axios';
import { Spinner } from '../../common/Spinner/Spinner';

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowMail, setAllowMail] = useState('');
  const [passwordRepetition, setPasswordRepetition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const loginLinkRef = useRef<HTMLAnchorElement>(null!);
  const {
    emailError,
    passwordError,
    passwordRepetitionError,
  } = useUserValidation({ email, password, passwordRepetition });

  useEffect(() => {
    setError('');
  }, [email, password, passwordRepetition]);

  useEffect(() => {
    if (success) {
      loginLinkRef.current.focus();
    }
  }, [success]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || !password || !passwordRepetition || emailError || passwordError || passwordRepetitionError) {
        return;
      }
      setLoading(true);
      await axios.post('user', { email, password, allowMail });
      setError('');
      setPassword('');
      setPasswordRepetition('');
      setSuccess(true);
    } catch (err: any) {
      if (err.response.status === 409) {
        const message = 'Podany adres email jest już zajęty, jeśli masz już konto zaloguj się.';
        setError(message);
      } else {
        const message = 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.';
        setError(message);
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Zarejestruj się</h2>
      <label>Adres email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        { emailError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Podany adres email jest nieprawidłowy.</p>
          </>
        ) }
      </label>
      <label>Hasło:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        { passwordError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Hasło musi zawierać conajmniej 8 znaków oraz zawierać 1 zwykłą literę, 1 dużą literę, 1
              cyfrę oraz któryś ze znaków specjalnych - "?", "!", "@", "#", "$", "%"
            </p>
          </>
        ) }
      </label>
      <label>Powtórz hasło:
        <input
          type="password"
          value={passwordRepetition}
          onChange={(e) => setPasswordRepetition(e.target.value)}
          required
        />
        { passwordRepetitionError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Podane hasła nie są jednakowe.</p>
          </>
        ) }
      </label>
      <label> Zaznacz aby otrzymywać powiadomienia email, jeśli zapomnisz podlać swoje kwiaty:
        <input
          className="Register__allowMail-checkbox"
          type="checkbox"
          name="AllowMail"
          value="true"
          onChange={(e) => setAllowMail(e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={!email || !password || !passwordRepetition || emailError || passwordError || passwordRepetitionError || !!error}
      >
        Zarejestruj
      </button>
      { error && <p className="error">{ error }</p> }
      { success && <p className="success">Konto zostało utworzone. Kliknij <Link ref={loginLinkRef} to="/login">tutaj</Link> by się zalogować.</p> }
      { !success && <p className="redirect-paraph">Jeśli masz już konto kliknij <Link to="/login">tutaj</Link> aby przejść do strony logowania.</p> }
    </form>
  );
};
