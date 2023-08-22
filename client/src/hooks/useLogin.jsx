import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError({ json, response });
    }
    if (response.ok) {
      // Save the user in a cookie
      setCookie('user', JSON.stringify(json), 1);

      // Update the AuthContext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
  };

  return { error, isLoading, login, };
};