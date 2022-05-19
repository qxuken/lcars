import React, { useCallback, useState } from 'react';
import { Root, Button, Box, Text } from '@qxuken/lcars-ui';
import { BaseLayout, FullLayout, MinimizedLayout } from '../components';
import './app.css';

enum Layout {
  Base,
  Full,
  Minimized,
}

export function App(): JSX.Element {
  const [layout, setLayout] = useState(Layout.Full);
  const onLayoutChange = useCallback((layout: Layout) => () => setLayout(layout), []);
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h2">layout:</Text>
        <Box minFlex>
          <Button onClick={onLayoutChange(Layout.Base)}>Base</Button>
          <Button onClick={onLayoutChange(Layout.Full)}>Full</Button>
          <Button onClick={onLayoutChange(Layout.Minimized)}>Minimized</Button>
        </Box>
        {layout === Layout.Base && <BaseLayout />}
        {layout === Layout.Full && <FullLayout />}
        {layout === Layout.Minimized && <MinimizedLayout />}
      </div>
    </div>
  );
}
