import React from 'react';
import { Flip, ToastContainer } from 'react-toastify';

import AppRoutes from 'router';

function App() {
  return (
    <>
      <AppRoutes />

      <ToastContainer
        limit={3}
        closeOnClick
        autoClose={2000}
        transition={Flip}
      />

    </>
  );
}

export default App;
