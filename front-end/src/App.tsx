import React from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import PortectedRoute from './Auth/PortectedRoute'
import Private from './pages/Priavte'
import './App.css';
import Home from './pages/Home';
import AuthProvider, { useAuth } from './Auth/AuthProvider'
import Training from './pages/Training';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { state, dispatch } = useAuth()


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>

        <Routes>



          <Route path='/login' element={
            <Login handler={dispatch} {...state} />
          } />
          <Route path='/sign-up' element={
            <SignUp />
          } />
          <Route path='/private' element={
            <PortectedRoute {...state}>
              <Private {...state} handler={dispatch} />
            </PortectedRoute>
          } />

          <Route path='/' element={
            <PortectedRoute {...state}>
              <Home {...state} handler={dispatch} />
            </PortectedRoute>
          } />


          <Route path='/Traine' element={

            <Training {...state} handler={dispatch} />

          } />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
