import { BaseLayout } from '../BaseLayout';
import { LeftPanel } from '../LeftPanel';
import { RightPanel } from '../RightPanel';
import { TopPanel } from '../TopPanel';

import { BottomPanel } from './BottomPanel';
import { LayoutContent } from './LayoutContent';

export interface IFullLayoutProps {
  className?: string;
}

export function FullLayout({ className }: IFullLayoutProps): JSX.Element {
  return (
    <BaseLayout
      className={className}
      top={<TopPanel />}
      bottom={<BottomPanel />}
      left={<LeftPanel />}
      right={<RightPanel />}
      content={<LayoutContent />}
    />
  );
}
