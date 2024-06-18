import React from "react";
import whiteLogo from "./images/whiteLogo.png";
// import "./Footer.css";
import classes from './Footer.module.css'
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
	return (
		<>
			<footer>
				<div className={classes.big_container}>
					<div>
						<div>
							<a href="#">
								<img src={whiteLogo} alt="" />
							</a>
						</div>
						<div className={classes.social_media}>
							<div>
								<a href="#">
									<FacebookRoundedIcon fontSize="large" />
								</a>
							</div>
							<div>
								<a href="#">
									<InstagramIcon fontSize="large" />
								</a>
							</div>
							<div>
								<a href="#">
									<YouTubeIcon fontSize="large" />
								</a>
							</div>
						</div>
					</div>
					<div className={classes.firstList}>
						<h2>Useful Link</h2>
						<ul>
							<li>
								<a href="#">Terms of Service</a>
							</li>
							<li>
								<a href="#">Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div className={classes.secondList}>
						<h2>Contact Info</h2>
						<ul>
							<li>
								<a href="#">support@evangadi.com</a>
							</li>
							<li>
								<a href="#">+1-202-386-2702</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
