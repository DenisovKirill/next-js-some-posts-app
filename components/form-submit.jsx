'use client';

import { useFormStatus } from 'react-dom';

const FormSubmit = () => {
  const status = useFormStatus();

  if (status.pending) {
    return <p>Creating posts...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;
