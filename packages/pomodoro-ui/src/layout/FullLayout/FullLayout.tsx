import cn from 'classnames';
import { Button, Text, TextSize } from '../../ui';
import styles from './styles.module.css';

export function FullLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={cn(styles.panel, styles.horizontal, styles.top)}>
          <div className={styles.button}>
            <Button size="small" color="color5">
              pause
            </Button>
          </div>
          <div className={styles.filler} />
          <div className={cn(styles.animated, 'bounce-x_after')} />
          <div className={styles.button}>
            <Button size="small">pin</Button>
          </div>
          <div className={styles.filler} />
          <div className={styles.button}>
            <Button size="small" color="color5">
              minimize
            </Button>
          </div>
        </div>
        <div className={cn(styles.panel, styles.horizontal, styles.bottom)}>
          <div className={styles.filler} />
          <div className={cn(styles.animated, styles.wide, 'bounce-x_after')} />
          <div className={styles['wide-filler']} />
          <div className={styles.filler} />
        </div>
        <div className={cn(styles.panel, styles.vertical, styles.left)}>
          <Button color="color5">short</Button>
          <Button color="color3">long</Button>
        </div>
        <div className={cn(styles.panel, styles.vertical, styles.right)}>
          <Button color="color5">exit</Button>
        </div>
        <div className={styles.content}>
          <Text as="h1" size={TextSize.xlarge} className="blink-predefined">
            stand by
          </Text>
        </div>
      </div>
    </div>
  );
}
