import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useUserValidation } from '../../../hooks/useRegisterValidation';
import { axios } from '../../../api/axios';
import { useLoading } from '../../../hooks/useLoading';
import { Spinner } from '../../common/Spinner/Spinner';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepetition, setPasswordRepetition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const loginLinkRef = useRef<HTMLAnchorElement>(null!);
  const { loading, toggleLoading } = useLoading(false);
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
      toggleLoading(true);
      await axios.post('user', { email, password });
      setError('');
      setPassword('');
      setPasswordRepetition('');
      setSuccess(true);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Sorry. Something went wrong. Please try again later.';
      setSuccess(false);
      setError(message);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register new account</h2>
      <label>Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        { emailError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Email is not valid.</p>
          </>
        ) }
      </label>

      <label>Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        { passwordError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Password must be at least 8 characters long and has to contain 1 normal letter, 1 capital letter, 1
              number, and any of special character - "?", "!", "@", "#", "$", "%"
            </p>
          </>
        ) }
      </label>

      <label>Repeat password:
        <input
          type="password"
          value={passwordRepetition}
          onChange={(e) => setPasswordRepetition(e.target.value)}
          required
        />
        { passwordRepetitionError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Passwords don't match.</p>
          </>
        ) }
      </label>

      <button
        type="submit"
        disabled={!email || !password || !passwordRepetition || emailError || passwordError || passwordRepetitionError || !!error}
      >
        Register
        { loading && <Spinner /> }
      </button>

      { error && <p className="error">{ error }</p> }
      { success && <p className="success">Success! <Link ref={loginLinkRef} to="/login">Click</Link> to login.</p> }
      { !success && <p className="redirect-paraph">If you have an account click <Link to="/login">here</Link> to go to the login page.</p> }

    </form>
  );
};
