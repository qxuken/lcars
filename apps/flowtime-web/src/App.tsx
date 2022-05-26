import { FlowtimeUI, FlowtimeServiceController } from '@qxuken/flowtime-react';
import './App.css';

export let App = () => (
  <FlowtimeServiceController>
    <FlowtimeUI />
  </FlowtimeServiceController>
);
