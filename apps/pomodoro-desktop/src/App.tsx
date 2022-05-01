import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';

export let App = () => (
  <div>
    <button>hello</button>
  </div>
);

let root = ReactDom.createRoot(document.getElementById('app'));
root.render(<App />);
