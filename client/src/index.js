import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import SingleLogPage from './SingleLogPage';
import EditPage from './EditPage';
import LoginPage from './LoginPage';
import { AuthProvider } from './AuthContext';
export const URL = 'https://diet-tracker-rho.vercel.app/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <RegisterPage />
          }/>
          <Route exact path="/login" element={
            <LoginPage />
          }/>
          <Route exact path="/dashboard/:_id" element={
            <Dashboard />
          }/>
          <Route exact path="/log/:logID" element={
              <SingleLogPage/>
          }/>
          <Route exact path="/entry/:logID/:entryID" element={
            <EditPage />
          }/>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
