import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ModularContextProvider } from './model/modular-context-provider';
import { HomePage } from './pages/home';
import { ModularContext } from './pages/modular-context';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/modular-context',
    element: <ModularContextProvider />,
    children: [
      {
        index: true,
        element: <ModularContext />,
      },
    ],
  },
]);
