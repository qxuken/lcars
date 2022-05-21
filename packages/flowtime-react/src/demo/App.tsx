import React, { useCallback, useState } from 'react';
import { Root, Button, Panel, Text } from '@qxuken/lcars-ui';
import { BaseLayout, FullLayout, MinimizedLayout, FlowtimeServiceController } from '../main';
import './app.css';

enum Layout {
  Base,
  Full,
  FullWithProvider,
  Minimized,
}

export function App(): JSX.Element {
  const [layout, setLayout] = useState(Layout.Full);
  const onLayoutChange = useCallback((layout: Layout) => () => setLayout(layout), []);
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h2">layout:</Text>
        <Panel minWidth>
          <Button onClick={onLayoutChange(Layout.Base)}>Base</Button>
          <Button onClick={onLayoutChange(Layout.Full)}>Full</Button>
          <Button onClick={onLayoutChange(Layout.FullWithProvider)} width="min10">
            with provider
          </Button>
          <Button onClick={onLayoutChange(Layout.Minimized)}>Minimized</Button>
        </Panel>
        {layout === Layout.Base && <BaseLayout />}
        {layout === Layout.Full && <FullLayout />}
        {layout === Layout.FullWithProvider && (
          <FlowtimeServiceController>
            <FullLayout />
          </FlowtimeServiceController>
        )}
        {layout === Layout.Minimized && <MinimizedLayout />}
      </div>
    </div>
  );
}
