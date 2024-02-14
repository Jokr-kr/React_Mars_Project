import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function test()
{
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello,</h1>
      <p>If you see this message, the test is working!</p>
    </div>
  );
}

export default test;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    root.render(<test />)
  </React.StrictMode>
);



