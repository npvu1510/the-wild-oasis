import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import useLogin from './useLogin';

function LoginForm() {
  // console.log('LOGIN');
  const { mutate, isLogging } = useLogin();

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    mutate({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLogging}>
          {isLogging ? <SpinnerMini /> : `Login`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
