import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { customOverlappingPayload } from './mock/mockData';
import reportWebVitals from './reportWebVitals';

/**
 *  In fact, the [[customOverlappingPayload]] is our mock data,
 *  you can modify the data over here,
 *  and remember to follow the data structure
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App events={customOverlappingPayload} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
