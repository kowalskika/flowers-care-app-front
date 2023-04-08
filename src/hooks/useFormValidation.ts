import { useEffect, useState } from 'react';

const NAME_REGEX = /^.{3,100}$/;

export const useFlowerValidation = (name?: string) => {
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    if (name && !NAME_REGEX.test(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  return nameError;
};
