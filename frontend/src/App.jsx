import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/user/AddUser";
import UserTable from "./pages/user/UserTable";
import UpdateUser from "./pages/user/UpdateUser";
import Login from "./pages/login";
import Register from "./pages/registration";
import VerifyOTP from "./pages/VerifyOTP";
import GetOTP from "./components/GetOTP.JSX";
import ProtectedRoutes from "./components/ProtectedRoutes";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-user" element={<UserTable />} />
          <Route path="/edit-user" element={<UpdateUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/get-otp" element={<GetOTP />} />
      </Routes>
    </Router>
  );
};

export default App;
