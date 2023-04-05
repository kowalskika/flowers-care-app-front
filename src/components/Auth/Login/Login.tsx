import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import { useAuth } from '../../../hooks/useAuth';

import { Spinner } from '../../common/Spinner/Spinner';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location?.state as { from: string })?.from || '/';

  useEffect(() => {
    setError('');
  }, [email, password]);

  useEffect(() => {
    if (auth) {
      navigate(from);
    }
  }, [auth, from, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      setLoading(true);
      const { data } = await axiosPrivate.post('session', { email, password }) as { data: { id: string, accessToken: string } };
      localStorage.setItem('user', JSON.stringify({ id: data.id }));
      setAuth(data);
      setLoading(false);
      navigate('/');
    } catch (err: any) {
      const message = 'Nieprawidłowy email lub hasło.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Zaloguj się do swojego konta</h2>
      <label>Adres email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>Hasło:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button
        type="submit"
        disabled={!email || !password || !!error}
      >
        Zaloguj
        { loading && <Spinner /> }
      </button>

      { error && <p className="error">{ error }</p> }
      <p className="redirect-paraph">
        Nie masz jeszcze konta na naszej stronie?<br />Kliknij <Link to="/register">tutaj</Link> aby się zarejestrować.
      </p>

    </form>
  );
};
