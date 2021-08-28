import React from "react";
import { Component } from "react";
import ActiveTodo from "../components/activeTodos";
import CompletedTodo from "../components/completedTodo";
import Hashtags from "../components/hashtags/hashtag";
import "./todoApp.scss";
interface AppState {
	activeList: Array<string>;
	todo: string;

	completedList: Array<string>;
	hastagValue: string;
	hashtagList: Array<string>;
}

export interface AppProps {
	todoList: Array<string>;
	markCompleteHandler: (i: number) => void;
}
class TodoApp extends Component<{}, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			activeList: [],
			todo: "",
			completedList: [],
			hastagValue: "",
			hashtagList: [],
		};
	}

	setToLocal = (data: Array<string>, val: string) => {
		window.localStorage.setItem(val, JSON.stringify(data));
	};
	getFromLocal = (value: string) => {
		let val = window.localStorage.getItem(value);
		if (val !== null) {
			return JSON.parse(val);
		}
	};

	onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		let { name, value } = e.target;

		this.setState((prevState) => {
			return { ...prevState, [name]: value };
		});
	};
	handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (this.state.hastagValue !== "") {
			let hashtagListTemp = [...this.state.hashtagList];
			hashtagListTemp.push(this.state.hastagValue);
			this.setToLocal([...hashtagListTemp], "hashtagList");
			this.setState((prevState: AppState) => {
				return { hashtagList: [...hashtagListTemp] };
			});
		}
		if (this.state.todo !== "") {
			let temp = [...this.state.activeList];
			temp.unshift(this.state.todo);
			this.setToLocal([...temp], "activeList");
			this.setState((prevState: AppState) => {
				return { activeList: [...temp] };
			});
		}

		this.setState({ todo: "" });
		this.setState({ hastagValue: "" });
	};

	markCompleteHandler = (i: number): void => {
		let temp = [...this.state.completedList];
		temp.unshift(this.state.activeList[i]);
		let temp2 = [...this.state.activeList];
		temp2.splice(i, 1);
		this.setState((prevState) => {
			return { activeList: [...temp2], completedList: [...temp] };
		});

		localStorage.clear();
		this.setToLocal([...temp2], "activeList");
		this.setToLocal([...temp], "completedList");
	};
	resetHandler = () => {
		this.setState({
			activeList: [],
			todo: "",
			hashtagList: [],
			completedList: [],
		});
		window.localStorage.clear();
	};

	handleFiltering = (value: string) => {
		let temp = this.getFromLocal("activeList");

		function filtringFucntion(ele: string) {
			return ele.toLowerCase().includes(value.trim().toLocaleLowerCase());
		}

		let filteredValues = temp.filter(filtringFucntion);
		this.setState({ activeList: filteredValues });
	};

	showAllBtn = () => {
		let temp = this.getFromLocal("activeList");
		if (temp) {
			this.setState({ activeList: temp });
		}
	};
	componentDidMount() {
		let active = this.getFromLocal("activeList");
		let completed = this.getFromLocal("completedList");
		let hashtagList = this.getFromLocal("hashtagList");
		if (active) {
			this.setState((prevState) => {
				return { activeList: [...active] };
			});
		}
		if (completed) {
			this.setState((prevState) => {
				return { completedList: [...completed] };
			});
		}
		if (hashtagList) {
			this.setState((prevState) => {
				return { hashtagList: [...hashtagList] };
			});
		}
	}

	render() {
		return (
			<div className="todo-Wrapper">
				<header>
					<h1>Todo App</h1>
					<button onClick={this.resetHandler}>Reset</button>
				</header>
				<div className="input-hashtag-wrapper">
					<div className="forms">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="Add Todo"
								onChange={this.onChangeHandler}
								value={this.state.todo}
								name="todo"
							/>

							<input
								type={this.state.todo === "" ? "number" : "submit"}
								style={{ visibility: "hidden" }}
							/>
							{/* <p>Click on any Active Tasks to mark it as Complete</p> */}
						</form>
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="Add #hashTags"
								onChange={this.onChangeHandler}
								value={this.state.hastagValue}
								name="hastagValue"
							/>

							<input
								// disabled={this.state.validationError}
								type={this.state.hastagValue === "" ? "number" : "submit"}
								style={{ visibility: "hidden" }}
							/>
						</form>
					</div>
					<div className="hashtag-wrapper">
						<div className="hashtag-header">
							<h3>#hastags</h3>
							<button onClick={this.showAllBtn}>Clear</button>
						</div>

						<Hashtags
							handleFiltering={this.handleFiltering}
							hashtagList={this.state.hashtagList}
						/>
					</div>
				</div>

				<div className="list-wrapper">
					<div className="active-todos">
						<ActiveTodo
							markCompleteHandler={this.markCompleteHandler}
							todoList={this.state.activeList}
						/>
					</div>
					<div className="completed-todos">
						<CompletedTodo
							markCompleteHandler={this.markCompleteHandler}
							todoList={this.state.completedList}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default TodoApp;
