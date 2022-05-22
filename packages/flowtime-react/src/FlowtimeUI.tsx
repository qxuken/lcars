import { Root } from '@qxuken/lcars-ui';
import { Maybe } from 'monet';
import { useMemo, useState } from 'react';
import { FullLayout, PinnedLayout } from './components';
import { FlowtimePinController, useFlowtimePin } from './services/FlowtimePin';

function Content(): JSX.Element {
  const [pinned] = useFlowtimePin();
  if (pinned) {
    return <PinnedLayout className={Root.root} />;
  }
  return <FullLayout className={Root.root} />;
}

export function FlowtimeUI(): JSX.Element {
  const [pinned, setPinned] = useState(false);
  const flowtimePinController = useMemo(
    () => Maybe.Some({ value: pinned, toggle: () => setPinned(!pinned) }),
    [pinned]
  );
  return (
    <FlowtimePinController value={flowtimePinController}>
      <Content />
    </FlowtimePinController>
  );
}
