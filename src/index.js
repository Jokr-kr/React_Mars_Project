import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Showimage from './components/showImage';
import { CustomLabel, NamedLabel } from './components/Label';
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
    <Showimage />
    <CustomLabel value="Custom Label test 1" />
    <CustomLabel value="Custom Label test 2" height='120px' width='120px' fontSize='xx-large' />
    <NamedLabel value="Named Label test" className="standard" />
  </React.StrictMode>
);



