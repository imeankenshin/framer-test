import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
