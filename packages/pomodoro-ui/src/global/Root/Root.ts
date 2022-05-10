import { styles } from '@qxuken/react-utils';
import root from './root.module.css';
import './fonts.css';

export const Root: {
  readonly root: string;
} = {
  root: styles.getClassNameFromModule(root, 'pomodoro-ui'),
};
