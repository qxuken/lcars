import React, { useCallback, useState } from 'react';
import { Button, Text } from '../components';
import './app.css';

export function App(): JSX.Element {
  const [value, setValue] = useState(0);
  const onClick = useCallback(() => setValue(value + 1), [value]);
  return (
    <div className="pomodoro-ui">
      <div>
        <Text as="h2">Button:</Text>
        <Button onClick={onClick}>value: {value}</Button>
      </div>
      <div>
        <Text as="h2">Button with counter:</Text>
        <Button onClick={onClick} counter={10}>
          value: {value}
        </Button>
      </div>
    </div>
  );
}
