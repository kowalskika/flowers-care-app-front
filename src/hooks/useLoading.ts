import { useState } from 'react';

export const useLoading = (defaultValue: boolean) => {
  const [loading, setLoading] = useState(defaultValue);

  const toggleLoading = (value?: boolean) => {
    setLoading((currentValue) => (typeof value === 'boolean' ? value : !currentValue));
  };

  return { loading, toggleLoading };
};
