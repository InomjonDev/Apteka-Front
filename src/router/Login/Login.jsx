import React, { useState } from "react";
import "./Login.css";
import axios from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleLogin = e => {
		e.preventDefault();

		axios
			.post("/post/sign-in", { username, password })
			.then(res => {
				localStorage.setItem("user", JSON.stringify(res.data.innerData));
				toast.success("Welcome");
				navigate("/");
			})
			.catch(err => console.log(err));
	};
	return (
		<div className="login">
			<form action="#" className="login__form" onSubmit={handleLogin}>
				<input
					type="text"
					required
					value={username}
					onChange={e => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					type="text"
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
