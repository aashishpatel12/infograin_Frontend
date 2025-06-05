import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";

import SignIn from "./pages/signIn";

import MainLayout from "./pages/mainLayout/MainLayout";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navebar";
import AllProduct from "./pages/AllProduct";

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/addProduct" />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<AddProduct />} />
          <Route path="allProduct" element={<AllProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
