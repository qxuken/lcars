import React, { useCallback, useState } from 'react';
import { Button, Text } from '../ui';
import { FullLayout } from '../layout';
import './app.css';

export function App(): JSX.Element {
  const [value, setValue] = useState(0);
  const onClick = useCallback(() => setValue(value + 1), [value]);
  return (
    <div className="pomodoro-ui">
      <div className="demo-card">
        <Text as="h2">Button:</Text>
        <Button onClick={onClick}>value: {value}</Button>
      </div>
      <div className="demo-card">
        <Text as="h2">Button with counter:</Text>
        <Button onClick={onClick} counter={10}>
          value: {value}
        </Button>
      </div>
      <div className="demo-card">
        <Text as="h2">Full layout:</Text>
        <FullLayout />
      </div>
    </div>
  );
}
