import React, { useCallback, useState } from 'react';
import { Root, Button, Panel, Text } from '@qxuken/lcars-ui';
import {
  FullLayout,
  FlowtimeServiceController,
  FlowtimeUI,
  FlowtimeTopPanelController,
  IFlowtimeTopPanelContextValue,
} from '../main';
import './app.css';
import { CompactLayout } from '../components';
import { Maybe } from 'monet';

enum Layout {
  FlowtimeUI,
  FlowtimeUICompact,
  FlowtimeUIPin,
  Full,
  Compact,
}
const topPanelConfig: IFlowtimeTopPanelContextValue = {
  onPin: Maybe.Some(console.log),
  onMinimize: Maybe.Some(console.log),
  onExit: Maybe.Some(console.log),
};

const storageKey: string = 'flowtime-demo:layout';

const getLayoutValue = (): Layout =>
  Maybe.fromEmpty(localStorage.getItem(storageKey)).map(parseInt).orSome(Layout.FlowtimeUI);

export function App(): JSX.Element {
  const [layout, setLayout] = useState(getLayoutValue);
  const onLayoutChange = useCallback(
    (layout: Layout) => () => {
      localStorage.setItem(storageKey, layout.toString());
      setLayout(layout);
    },
    []
  );
  return (
    <div className={Root.root}>
      <div className="demo-card">
        <Text as="h2">layout:</Text>
        <Panel minWidth>
          <Button
            bgColor={layout === Layout.FlowtimeUI ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.FlowtimeUI)}
            width="min10"
          >
            Flowtime UI
          </Button>
          <Button
            bgColor={layout === Layout.FlowtimeUI ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.FlowtimeUICompact)}
            width="min10"
          >
            Provided Compact
          </Button>
          <Button
            bgColor={layout === Layout.FlowtimeUI ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.FlowtimeUIPin)}
            width="min10"
          >
            Provided Pin
          </Button>
          <Button
            bgColor={layout === Layout.Full ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Full)}
          >
            Full
          </Button>
          <Button
            bgColor={layout === Layout.Compact ? 'color4' : undefined}
            onClick={onLayoutChange(Layout.Compact)}
          >
            Compact
          </Button>
        </Panel>
        {layout === Layout.FlowtimeUI && (
          <FlowtimeServiceController
            config={{
              minimumActivityDurationMinutes: 0,
            }}
          >
            <FlowtimeUI />
          </FlowtimeServiceController>
        )}
        {layout === Layout.FlowtimeUICompact && (
          <FlowtimeServiceController>
            <FlowtimeUI defaultCompact />
          </FlowtimeServiceController>
        )}
        {layout === Layout.FlowtimeUIPin && (
          <FlowtimeServiceController>
            <FlowtimeTopPanelController config={topPanelConfig}>
              <FlowtimeUI />
            </FlowtimeTopPanelController>
          </FlowtimeServiceController>
        )}
        {layout === Layout.Full && <FullLayout />}
        {layout === Layout.Compact && <CompactLayout />}
      </div>
    </div>
  );
}
