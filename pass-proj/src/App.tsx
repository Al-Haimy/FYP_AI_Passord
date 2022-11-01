import React from 'react';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar'
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <NavBar/>
      <Router>
        <Routes>

          <Route path="/signup" element={
            <SignUp />
          } />
        </Routes>
        <Routes>

          <Route path="/" element={
            <HomePage />
          } />
        </Routes>



      </Router>

    </ ChakraProvider>
  );
}

export default App;
