import React, { useCallback, useState } from 'react';
import { Button } from '../components';
import './app.css';

export function App(): JSX.Element {
  const [value, setValue] = useState(0);
  const onClick = useCallback(() => setValue(value + 1), []);
  return (
    <div className="pomodoro-ui">
      <Button onClick={onClick}>value: {value}</Button>
    </div>
  );
}
