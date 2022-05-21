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
  const [layout, setLayout] = useState(Layout.FullWithProvider);
  const onLayoutChange = useCallback((layout: Layout) => () => setLayout(layout), []);
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h2">layout:</Text>
        <Panel minWidth>
          <Button
            bgColor={layout === Layout.Base ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Base)}
          >
            Base
          </Button>
          <Button
            bgColor={layout === Layout.Full ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Full)}
          >
            Full
          </Button>
          <Button
            bgColor={layout === Layout.FullWithProvider ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.FullWithProvider)}
            width="min10"
          >
            with provider
          </Button>
          <Button
            bgColor={layout === Layout.Minimized ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Minimized)}
          >
            Minimized
          </Button>
        </Panel>
        {layout === Layout.Base && <BaseLayout />}
        {layout === Layout.Full && <FullLayout />}
        {layout === Layout.FullWithProvider && (
          <FlowtimeServiceController
            config={{
              minimumActivityDuration: 0,
            }}
          >
            <FullLayout />
          </FlowtimeServiceController>
        )}
        {layout === Layout.Minimized && <MinimizedLayout />}
      </div>
    </div>
  );
}
