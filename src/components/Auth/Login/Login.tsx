import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import { useAuth } from '../../../hooks/useAuth';
import { useLoading } from '../../../hooks/useLoading';
import { Spinner } from '../../common/Spinner/Spinner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, toggleLoading } = useLoading(false);

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
      toggleLoading(true);
      const { data } = await axiosPrivate.post('session', { email, password }) as { data: { id: string, accessToken: string } };
      localStorage.setItem('user', JSON.stringify({ id: data.id }));
      setAuth(data);
      toggleLoading(false);
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Sorry. Something went wrong. Please try again later.';
      setError(message);
      toggleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to your account</h2>
      <label>Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>Password:
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
        Login
        { loading && <Spinner /> }
      </button>

      { error && <p className="error">{ error }</p> }
      <p className="redirect-paraph">
        Don't have an account?<br />Click <Link to="/register">here</Link> to register new one.
      </p>

    </form>
  );
};
