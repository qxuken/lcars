import { BaseLayout } from '../BaseLayout';
import { LeftPanel } from '../LeftPanel';
import { RightPanel } from '../RightPanel';
import { TopPanel } from '../TopPanel';
import { LayoutContent } from '../LayoutContent';

import { BottomPanel } from './BottomPanel';

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
