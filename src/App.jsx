import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "*",
      element: <Error />
    }
  ])
  return (
    <AuthWrapper>
      <RouterProvider router={route} />
    </AuthWrapper>
  );
}

export default App;
