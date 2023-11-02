import './styles/app.css';
import './styles/calendar.css';

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Router provider fallback</div>}
    />
  );
}

export default App;
