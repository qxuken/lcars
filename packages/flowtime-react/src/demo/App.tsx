import React, { useCallback, useState } from 'react';
import { Root, Button, Panel, Text } from '@qxuken/lcars-ui';
import { FullLayout, PinnedLayout, FlowtimeServiceController, FlowtimeUI } from '../main';
import './app.css';

enum Layout {
  UIWithProvider,
  Full,
  Pinned,
}

export function App(): JSX.Element {
  const [layout, setLayout] = useState(Layout.UIWithProvider);
  const onLayoutChange = useCallback((layout: Layout) => () => setLayout(layout), []);
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h2">layout:</Text>
        <Panel minWidth>
          <Button
            bgColor={layout === Layout.UIWithProvider ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.UIWithProvider)}
            width="min10"
          >
            ui with provider
          </Button>
          <Button
            bgColor={layout === Layout.Full ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Full)}
          >
            Full
          </Button>
          <Button
            bgColor={layout === Layout.Pinned ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Pinned)}
          >
            Pinned
          </Button>
        </Panel>
        {layout === Layout.UIWithProvider && (
          <FlowtimeServiceController
            config={{
              minimumActivityDuration: 0,
            }}
          >
            <FlowtimeUI />
          </FlowtimeServiceController>
        )}
        {layout === Layout.Full && <FullLayout />}
        {layout === Layout.Pinned && <PinnedLayout />}
      </div>
    </div>
  );
}
