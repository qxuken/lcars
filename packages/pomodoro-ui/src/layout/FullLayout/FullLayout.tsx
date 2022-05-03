import cn from 'classnames';
import { Button, Text, TextSize } from '../../ui';
import styles from './styles.module.css';

export function FullLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={cn(styles.pause, styles['horizontal-outline'])}>
          <Button size="small" color="color5">
            pause
          </Button>
        </div>
        <div className={cn(styles.filler, styles['t-filler-1'], styles['horizontal-outline'])} />
        <div className={cn(styles.animated, styles['t-animated'], styles['horizontal-outline'])} />
        <div className={cn(styles.pin, styles['horizontal-outline'])}>
          <Button size="small">pin</Button>
        </div>
        <div className={cn(styles.filler, styles['t-filler-2'], styles['horizontal-outline'])} />
        <div className={cn(styles.minimize, styles['horizontal-outline'])}>
          <Button size="small" color="color5">
            minimize
          </Button>
        </div>
        <div className={styles.content}>
          <Text as="h1" size={TextSize.xlarge}>
            stand by
          </Text>
        </div>
      </div>
    </div>
  );
}
