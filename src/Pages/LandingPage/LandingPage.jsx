import React from "react";
import Footer from "../../component/Footer/Footer";
import backGroundPic from "./images/blackLogo.png";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();

	function ToLogIn() {
		navigate("./login");
	}
	return (
		<div>
			<div className={classes.background}>
				<ul className={classes.navList}>
					<li>
						<img src={backGroundPic} alt="Logo" className={classes.logo} />
					</li>
					<li>Home</li>
					<li>Academy</li>
					<li>Scholarship</li>
					<li>Immersive</li>
					<li>Placement</li>
					<li>Contact</li>
					<li>
						<button onClick={ToLogIn} className={classes.mybutton}>
							Sign In
						</button>
					</li>
				</ul>
			</div>
			<div className={classes.my_footer}>
				<Footer />
			</div>
		</div>
	);
}

export default LandingPage;
