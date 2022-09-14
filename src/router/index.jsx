import HomePage from 'pages/HomePage';
import { Route, Routes } from 'react-router-dom';

import React from 'react';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} key="home" />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRoutes;
