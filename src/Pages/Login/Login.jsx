import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import classes from "./Login.module.css";
import Footer from "../../component/Footer/Footer";
import Register from "../Register/Register";
import handleToggle from "../../App";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import supabase from "../../config/supabaseClient";


function Login() {
	const [loginError, setLoginError] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const emailDom = useRef();
	const passwordDom = useRef();
	const [toggle, setToggle] = useState(true);
	async function handleToggle(e) {
		e.preventDefault();
		setToggle(!toggle);
	}
	async function visibliity(e) {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (!emailValue || !passwordValue) {
			alert("Please fill all the fields");
			return;
		}
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: emailValue,
				password: passwordValue,
			});
			if (error) throw error;
			// alert ("user logged in successfully");
			// Store userid in local storage
			const username = data.user.user_metadata.username;
			// console.log(username)
			const userid = (data.user.id);
			localStorage.setItem("username", username)
			localStorage.setItem("userid", userid);
			localStorage.setItem("token", data.access_token);
			navigate("/home");
		} catch (error) {
			// alert(error?.response?.data?.msg);
			// console.log("Login error:", error.message);
			setLoginError(error.message);
		}
	}

	return (
		<div className={classes.full_page}>
			<Header />
			<div className={classes.big_box}>
				<section className={classes.two_boxes}>
					<div
						className={classes.first_box}
						style={{ display: !toggle ? "none" : "block" }}
					>
						{/* {toggle ? ( */}
						<form onSubmit={handleSubmit}>
							<div style={{ fontWeight: "bold" }}>Login to your account</div>
							<div>
								<span>Don't have an account? </span>
								<span className={classes.register_link}>
									<Link onClick={handleToggle}>Create a new account</Link>
								</span>
							</div>
							<div>
								<p style={{ color: "red" }}>{loginError}</p>
							</div>
							<div>
								<input ref={emailDom} type="text" placeholder="email" />
							</div>
							<div className={classes.eyeInpt_container}>
								<input
									ref={passwordDom}
									className={classes.eyeInput}
									type={passwordVisible ? "text" : "password"}
									// type="password"
									placeholder="password"
								/>
								{passwordVisible ? (
									<VisibilityRoundedIcon
										className={classes.togglePassword}
										onClick={visibliity}
									/>
								) : (
									<VisibilityOffRoundedIcon
										className={classes.togglePassword}
										onClick={visibliity}
									/>
								)}
							</div>
							<div className={`${classes.register_link} ${classes.left}`}>
								<Link to="#">Forgot Password?</Link>
							</div>
							<div>
								<button type="submit">Log in</button>
							</div>
						</form>
						{/* ) : ( */}

						<br />
						{/* <Link to={"/register"}>register</Link> */}
					</div>
					<div
						style={{ display: toggle ? "none" : "block" }}
						className={classes.first_box}
					>
						<Register handleToggle={handleToggle} />
					</div>
					{/* )} */}
					<div className={classes.second_box}>
						<small className={classes.small}>About</small>
						<h1>Evangadi Networks Q&A</h1>
						<div>
							<div>
								No matter what stage of life you are in, whether you’re just
								starting elementary school or being promoted to CEO of a Fortune
								500 company, you have much to offer to those who are trying to
								follow in your footsteps.
							</div>
							<div>
								Wheather you are willing to share your knowledge or you are just
								looking to meet mentors of your own, please start by joining the
								network here.
							</div>
						</div>
						<div>
							<button>HOW IT WORKS</button>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</div>
	);
}

export default Login;
