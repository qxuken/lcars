import { Root } from '@qxuken/lcars-ui';
import { Maybe } from 'monet';
import { useMemo, useState } from 'react';
import { FullLayout, CompactLayout } from './components';
import { FlowtimeCompactController, useFlowtimeCompact } from './services/FlowtimeCompact';
import { FlowtimePinController } from './services/FlowtimePin';

function Content(): JSX.Element {
  const [compact] = useFlowtimeCompact();
  if (compact) {
    return <CompactLayout className={Root.root} />;
  }
  return <FullLayout className={Root.root} />;
}

export interface IFlowtimeUIProp {
  defaultCompact?: boolean;
  defaultPin?: boolean;
}

export function FlowtimeUI(props: IFlowtimeUIProp): JSX.Element {
  const [pinned, setPinned] = useState(props.defaultPin ?? false);
  const flowtimePinController = useMemo(
    () => Maybe.Some({ value: pinned, toggle: () => setPinned(!pinned) }),
    [pinned]
  );

  const [compact, setCompact] = useState(props.defaultCompact ?? false);
  const flowtimeCompactController = useMemo(
    () => Maybe.Some({ value: compact, toggle: () => setCompact(!compact) }),
    [compact]
  );

  return (
    <FlowtimePinController value={flowtimePinController}>
      <FlowtimeCompactController value={flowtimeCompactController}>
        <Content />
      </FlowtimeCompactController>
    </FlowtimePinController>
  );
}
