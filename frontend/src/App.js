import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Room from './pages/Room.tsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
  );
}

export default App;
