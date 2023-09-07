import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./router/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Create from "./router/Create/Create";
import Delete from "./router/Delete/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Update from "./router/Update/Update";
import Debt from "./router/Debt/Debt";
import Login from "./router/Login/Login";
import Auth from "./router/Auth/Auth";
import Admin from "./router/Admin/Admin";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { pathname } = useLocation();

	const handleSidebarToggle = isOpen => {
		setIsSidebarOpen(isOpen);
	};

	return (
		<div className="app">
			{pathname === "/login" ? (
				<></>
			) : (
				<div className={`app__sidebar ${isSidebarOpen ? "short" : ""}`}>
					<Sidebar onToggle={handleSidebarToggle} />
				</div>
			)}

			<div className={`app__content ${isSidebarOpen ? "long" : ""}`}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Auth />}>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<Create />} />
						<Route path="/delete" element={<Delete />} />
						<Route path="/update" element={<Update />} />
						<Route path="/debt" element={<Debt />} />
						<Route path="/admin" element={<Admin />} />
					</Route>
				</Routes>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
