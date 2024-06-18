import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { useEffect, useState, createContext, useCallback } from "react";
import AskQuestion from "./Pages/Question/AskQuestion.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";

export const AppState = createContext();

function App() {
	const [user, setUser] = useState({});
	const [toggle, setToggle] = useState(true);
	async function handleToggle(e) {
		e.preventDefault();
		setToggle(!toggle);
	}

	function Logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("questionid");
		localStorage.removeItem("userid");
		localStorage.removeItem("username");
		setUser(null);
		navigate("/");
		// window.location.reload();
	}



	const token = localStorage.getItem("token");
	const currentPath = window.location.pathname;
	const navigate = useNavigate();


	return (
		<AppState.Provider value={{ user, setUser, handleToggle, Logout }}>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/answers/:questionid" element={<Answer />} />
				{/* <Route path="/register" element={<Register />} /> */}
				<Route path="/askquestion" element={<AskQuestion />} />
			</Routes>
		</AppState.Provider>
	);
}

export default App;
