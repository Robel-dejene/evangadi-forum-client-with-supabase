import React, { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import handleToggle from "../../App";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import supabase from "../../config/supabaseClient";

function Register({ handleToggle }) {
	const [error1, setError1] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const userNameDom = useRef();
	const firstNameDom = useRef();
	const lastNameDom = useRef();
	const emailDom = useRef();
	const passwordDom = useRef();

	async function visibliity(e) {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const userNameValue = userNameDom.current.value;
		const firstNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (
			!userNameValue ||
			!firstNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passwordValue
		) {
			alert("Please fill all the fields");
			return;
		}
		try {
			const { data: usernameData, error: usernameError } = await supabase
				.from("users")
				.select("*")
				.eq("username", userNameValue);

			if (usernameError) throw usernameError;
			if (usernameData.length > 0) {
				throw new Error("Username already exists. Please choose another one.");
			}

			//Register the user with Supabase Auth
			const { data, error } = await supabase.auth.signUp({
				email: emailValue,
				password: passwordValue,
				options: {
					data: {
						username: userNameValue,
						firstname: firstNameValue,
						lastname: lastNameValue,
					},
				},
			});
			if (error) throw error;

			//Insert users profile into the users table
			const { error: insertError } = await supabase.from("users").insert([
				{
					userid: data.user.id,
					username: userNameValue,
					firstname: firstNameValue,
					lastname: lastNameValue,
					email: emailValue,
					password: passwordValue,
				},
			]);
			if (insertError) {
				// console.log("Error inserting user:", insertError);
				alert("Failed to register user");
				return;
			}
			// console.log(data);
			alert("Please verify your email. We have sent you a link.");
			window.location.reload(navigate("/login"));
		} catch (error) {
			alert("Error registering user");
			// alert(error?.response?.data?.msg);
			setError1(error.message || "An unexpected error occurred");
			// console.log("Error registering user:", error);
		}
	}
	return (
		<section className={classes.large_box}>
			<div>
				<h3>Join the network</h3>
			</div>
			<div>
				<p className={classes.smalla}>
					Already have an account? <Link onClick={handleToggle}>Sign in</Link>
				</p>
			</div>
			<div>
				<form onSubmit={handleSubmit} className={classes.form_box}>
					<input ref={emailDom} type="text" placeholder="email" />

					<div className={classes.first_last}>
						<input ref={firstNameDom} type="text" placeholder="first name" />
						<input ref={lastNameDom} type="text" placeholder="last name" />
					</div>

					<input ref={userNameDom} type="text" placeholder="username" />

					<input
						ref={passwordDom}
						className={classes.eyeInput}
						type={passwordVisible ? "text" : "password"}
						placeholder="password"
					/>
					{passwordVisible ? (
						<VisibilityRoundedIcon
							onClick={visibliity}
							className={classes.signin_toggle}
						/>
					) : (
						<VisibilityOffRoundedIcon
							onClick={visibliity}
							className={classes.signin_toggle}
						/>
					)}

					<button type="submit">Agree and Join</button>
					<div>
						<div className={classes.smalla}>
							I agree to the <Link to={"#"}>Privacy policy</Link> and{" "}
							<Link to={"#"}>terms of service.</Link>
						</div>

						<div className={classes.smalla}>
							<a href={"/login"}>Already have an account?</a>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Register;
