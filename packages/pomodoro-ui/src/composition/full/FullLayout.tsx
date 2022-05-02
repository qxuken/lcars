import { Text, TextSize } from '../../components';
import styles from './styles.module.css';

export function FullLayout(): JSX.Element {
  return (
    <div className={styles['layout-wrapper']}>
      <div className={styles['layout-container']}>
        <div className={styles['layout-content']}>
          <Text as="h1" size={TextSize.xlarge}>
            stand by
          </Text>
        </div>
      </div>
    </div>
  );
}
