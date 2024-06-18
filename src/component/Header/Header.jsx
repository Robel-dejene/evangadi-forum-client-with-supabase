import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import evangadi from "./images/blackLogo.png";
import classes from "./Header.module.css";
import { AppState } from "../../App";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


function Header() {
	const navigate = useNavigate();
	const { user, setUser, handleToggle, Logout } = useContext(AppState);
	const [showMenu, setShowMenu] = useState(false);
const username = localStorage.getItem("username");

	function toggleMenu() {
		setShowMenu(!showMenu);
	}

	function closeMenu() {
		setShowMenu(false);
	}

	function SignIn(e) {
		e.preventDefault();
		navigate("/");
	}
	return (
		<>
			<div className={classes.outer_container}>
				<div className={classes.two}>
					<div className={`${classes.header}`}>
						<div onClick={closeMenu}>
							<Link to={"/home"}>
								<img src={evangadi} alt="" />
							</Link>
						</div>

						<div
							className={`${classes.inside_container} ${
								showMenu ? classes.show_menu : ""
							}`}
						>
							<div onClick={closeMenu}>
								<Link
									to="/home"
									style={{ textDecoration: "none", color: "black" }}
								>
									Home
								</Link>
							</div>
							<div onClick={closeMenu}>
								<Link to="#" style={{ textDecoration: "none", color: "black" }}>
									How it works
								</Link>
							</div>
							<div>
								{!username ? (
									<button onClick={Logout}>SIGN IN</button>
								) : (
									<button onClick={Logout}>LogOut</button>
								)}
							</div>
						</div>
					</div>
				<div className={classes.menu_icon} onClick={toggleMenu}>
					{showMenu ? <CloseIcon /> : <MenuIcon />}
				</div>
				</div>
			</div>
		</>
	);
}

export default Header;
