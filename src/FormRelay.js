import React from 'react';
import createArrayWithNumbers from './createArrayWithNumbers';

import { useFormSubmit, useFormSetValue } from 'relay-forms-nodeps';

const validate = value => {

  if (!value) {
    return 'Required';
  } else if (value !== 'admin') {
    return 'Nice try!';
  }
  return undefined;
};

const validateEmail = value => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return undefined
};

const Field = ({ key, fieldKey, validate }) => {

  const [{ error, value }, setValue] = useFormSetValue({
      key: fieldKey,
      validate,
  });

  const setValueCallback = React.useCallback(
      (event) => {
          const value = event.target.value;
          setValue(value)
      },
      [fieldKey],
  );
  return (
    <>
    {error && <div data-testid={fieldKey + '-error'}>{error}</div>}
      <input
      key={key}
      name={fieldKey}
      value = {value}
      onChange={setValueCallback}
    />
    </>
    
  );
};

export default function Form() {
  
  const onSubmit = React.useCallback(values => {
    console.log(values);
  });
  const { submit } = useFormSubmit({onSubmit});

  return (
    <div>
      <h1>Relay Form No Deps</h1>
      <form onSubmit={submit}>
        {createArrayWithNumbers(1000).map(key => {
          return (
            <Field
              key={key}
              fieldKey={`email${key}`}
              validate={validateEmail}
            />
          );
        })}

        <Field
          name="username"
          validate={validate}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
