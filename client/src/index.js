import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import { Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SingleLogPage from './SingleLogPage';
import EditPage from './EditPage';

export const URL = 'http://localhost:10000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={
          <HomePage />
        }/>
        <Route exact path="/log/:logID" element={
          <SingleLogPage/>
        }/>
        <Route exact path="/entry/:logID/:entryID" element={
          <EditPage/>
        }/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();