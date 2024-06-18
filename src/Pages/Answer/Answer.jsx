import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import classes from "./Answer.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { fontGrid } from "@mui/material/styles/cssUtils";
import ScrollableComponent from "../../component/ScrollableComponent/scrollableComponent";
import { BeatLoader } from "react-spinners";
import supabase from '../../config/supabaseClient.js'

function Answer() {
	const [answer, setAnswer] = useState("");
	const [questionidForAsking, setQuestionIdForAsking] = useState("");
	const [bringAnswer, setBringAnswer] = useState([]);
	const [bringQuestion, setBringQuestion] = useState([]);
	const token = localStorage.getItem("token");
	const { questionid } = useParams();
	const [answerGiven, setAnswerGiven] = useState(false);
	const [loading, setLoading] = useState(false);
	async function postedAnswer() {
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from("answers")
				.select("answer, users ( username)")
				.eq("questionid", questionid)
				.order("answerid", { ascending: false });

			setLoading(false);
			setBringAnswer(data);

			// console.log(data);
		} catch (error) {
			setLoading(false);
			// console.log(error.response);
		}
	}
	async function postedQuestion() {
		try {

			const { data, error } = await supabase
			.from("questions")
			.select("title, description")
			.eq("questionid", questionid)
			
			

			setBringQuestion(data);
			// console.log(data);
		} catch (error) {}
	}
	useEffect(() => {
		if (questionid) {
			postedAnswer();
			postedQuestion();
		}
	}, [questionid]);
	const navigate = useNavigate();
	async function postAnswer(e) {
		setAnswerGiven(!answerGiven);
		e.preventDefault();
		try {
		const userid = localStorage.getItem("userid");

			if (answer.length === 0) {
				alert("Please enter your answer");
			}
			
			const { data, error } = await supabase.from("answers").insert([
				{
					userid,
					questionid,
					answer,
				},
			]);
			// console.log(data);
			setTimeout(() => {
				window.location.reload();
				// navigate("/home");
			}, 2000);
		} catch (error) {
			// console.log(error);
		}
	}
	return (
		<>
			<Header />
			<section className={classes.answerPage}>
				<div className={classes.border_bottom}>
					<h1>Question</h1>
					<div className={classes.the_question}>
						{bringQuestion.map((question, index) => (
							<div key={index} className={classes.one_question}>
								<p
									style={{
										fontWeight: "bold",
										fontSize: "30px",
										borderBottom: "3px solid #fe8303",
										marginBottom: "2vh",
									}}
								>
									{question.title}
								</p>
								<p
									style={{
										color: "rgb(95, 92, 92);",
										fontSize: "20px",
									}}
								>
									{question.description}
								</p>
							</div>
						))}
					</div>

					<h1 className={classes.top_bottom}>Answers From The Community</h1>
					<div className={classes.answers_list}>
						<ScrollableComponent
							style={{
								height: "350px",
								backgroundcolor: "red",
								display: bringAnswer.length ? "block" : "none",
							}}
						>
							{bringAnswer.map((answer, index) => (
								<div key={index} className={classes.answer}>
									<div>
										<AccountCircleOutlinedIcon style={{ fontSize: "100" }} />
										<p style={{ fontWeight: "bold", textAlign: "center" }}>
											{answer.users.username}
										</p>
									</div>
									<div>
										<p>{answer.answer}</p>
									</div>
								</div>
							))}
						</ScrollableComponent>
					</div>
				</div>
				<div className={classes.middle}>
					<h1>Answer The Top Question</h1>
					<small
						style={{
							display: answerGiven ? "block" : "none",
							color: "green",
						}}
					>
						Answer posted successfully!!
					</small>
					<Link to="/home" style={{ textDecoration: "none", color: "red" }}>
						<small>Go to Question page</small>
					</Link>
					<form action="" onSubmit={postAnswer}>
						<textarea
							value={answer}
							onChange={(e) => setAnswer(e.target.value)} // Updating the state
							rows="10"
							cols="125"
							placeholder="Your Answer..."
						></textarea>
						<button type="submit">Post Your Answer</button>
					</form>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default Answer;
