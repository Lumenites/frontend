import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import UserDashboard from "./Pages/UserDashboard";
import PlansPage from "./Pages/PlansPage";
import HomePage from "./Pages/HomePage";
import AdminPlans from "./Pages/AdminPlans";
import AdminDiscounts from "./Pages/AdminDiscounts";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/user-dashboard" element={<UserDashboard />} />
				<Route path="/plans" element={<PlansPage />} />
				<Route path="/AdminPlans" element={<AdminPlans />} />
        <Route path="/AdminDiscounts" element={<AdminDiscounts />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
			</Routes>
		</Router>
  );
};

export default App;
