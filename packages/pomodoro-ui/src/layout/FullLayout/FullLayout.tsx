import cn from 'classnames';
import { Button, Text, TextSize } from '../../ui';
import styles from './styles.module.css';

export function FullLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles['top-panel']}>
          <div className={cn(styles.pause)}>
            <Button size="small" color="color5">
              pause
            </Button>
          </div>
          <div className={styles.filler} />
          <div className={styles.animated} />
          <div className={cn(styles.pin)}>
            <Button size="small">pin</Button>
          </div>
          <div className={styles.filler} />
          <div className={styles.minimize}>
            <Button size="small" color="color5">
              minimize
            </Button>
          </div>
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
