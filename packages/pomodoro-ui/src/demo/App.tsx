import React, { useCallback, useState } from 'react';
import { Button, Box, Text, Root } from '../ui';
import { BaseLayout, FullLayout, MinimizedLayout } from '../layout';
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
        <Text as="h2">Button:</Text>
        <Box minFlex>
          <Button>Button</Button>
          <Button counter={10}>Button</Button>
        </Box>
        <Box minFlex>
          <Button accentSide="none">Button</Button>
          <Button accentSide="both" width="min10">
            Button
          </Button>
          <Button accentSide="right">Button</Button>
          <Button accentSide="left">Button</Button>
        </Box>
        <Box minFlex>
          <Button accentSide="none" withAccentLine>
            Button
          </Button>
          <Button accentSide="both" withAccentLine>
            Button
          </Button>
          <Button accentSide="right" withAccentLine>
            Button
          </Button>
          <Button accentSide="left" withAccentLine>
            Button
          </Button>
        </Box>
        <Box minFlex>
          <Button accentSide="right" withAccentLine counter={10}>
            Button
          </Button>
          <Button accentSide="left" counter={10}>
            Button
          </Button>
        </Box>
      </div>
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
