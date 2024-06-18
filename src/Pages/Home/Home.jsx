import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import Header from "../../component/Header/Header";
import AskQuestion from "../Question/AskQuestion";
import Footer from "../../component/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ScrollableComponent from "../../component/ScrollableComponent/scrollableComponent";
import supabase from "../../config/supabaseClient";
function Home() {
	const [questions, setQuestions] = useState([]);
	const [username, setUsername] = useState();
	const token = localStorage.getItem("token");
	const [searchTerm, setSearchTerm] = useState("");
	const loggedinUser = localStorage.getItem("username");
	
	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};
	const { user } = useContext(AppState);
	async function fetchQuestions() {
		try {
			const { data, error } = await supabase
				.from("questions")
				.select("*, users (username)")
				.order("created_at", { ascending: false });

			if (error) {
				// console.log("Error fetching question:", error.message);
			} else {
				setQuestions(data);
			}
			// console.log(data);
		} catch (error) {
			// console.log(error.response);
		}
	}

	useEffect(() => {
		fetchQuestions();
	}, []);
	const navigate = useNavigate();
	async function toQuestions(e) {
		e.preventDefault();
		navigate("/askquestion");
	}
	// console.log(loggedinUser);
	return (
		<>
			<section className={classes.top_container}>
				<Header />
				<div className={classes.Question}>
					<div>
						<button onClick={toQuestions}>Ask Question</button>
					</div>
					<div>
						<h2>Wellcome : {loggedinUser}</h2>
					</div>
				</div>
				<div>
					<input
						type="text"
						name="search"
						className={classes.Question_search}
						placeholder="Search Question"
						onChange={handleSearch}
					/>
				</div>
				<div>
					<div className={classes.questionBox}>
						<h1>Questions</h1>
						<ScrollableComponent>
							{questions
								?.filter((question) =>
									question.title
										.toLowerCase()
										.includes(searchTerm.toLowerCase())
								)
								.map((question, i) => (
									<Link
										to={`/answers/${question.questionid}`}
										className={classes.flexing}
										key={question.questionid}
									>
										<div className={classes.questionList}>
											<div className="avatar">
												<AccountCircleOutlinedIcon
													style={{ fontSize: "100" }}
												/>
												<p>{question.users.username}</p>
											</div>
											<div>
												<h3>{question.title}</h3>
											</div>
										</div>
										<div className={classes.arrow}>
											<ArrowForwardIosSharpIcon />
										</div>
									</Link>
								))}
						</ScrollableComponent>
					</div>

					{/* <div className={classes.questionList}>
						{questions?.map((question, i) => (
							<AccountCircleIcon fontSize="large" />
							
							{question[i].username}
							{question[i].title}
						))}
					</div> */}
					{/* <p>{user.username}</p>
					<p>{questions.title}</p>
					<div>
						<h1>Questions</h1>
						<ul>
							{questions.map((question) => (
								<li key={question.questionid}>{question.title}</li>
							))}
						</ul>
					</div> */}

					{/* <AskQuestion /> */}
				</div>
				<Footer />
			</section>
		</>
	);
}

export default Home;
