import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyChart from './components/Chart.js';
function Test()
{
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello!</h1>
      <div></div>
      <p>If you see this message, your test is working!</p>
    </div>
  );
}

export default Test;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test />
    <MyChart />
  </React.StrictMode>
);
