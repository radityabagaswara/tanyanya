import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { useEffect, useState } from 'react';

const useErrorShake = (formErrors: any) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (formErrors && Object.keys(formErrors).length > 0) {
      setShake(true);
      const timeout = setTimeout(() => {
        setShake(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [formErrors]);

  return shake;
};

export default useErrorShake;
