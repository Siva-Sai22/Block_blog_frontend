import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './pages/Homepage.jsx';
import Create from './pages/Create.jsx';
import Blog from './pages/Blog.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },
  {
    path: "/blog/:id",
    element: <Blog/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
