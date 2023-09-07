import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Auth() {
	const user = localStorage.getItem("user");
	return user ? <Outlet /> : <Navigate to={"/login"} replace />;
}

export default Auth;
