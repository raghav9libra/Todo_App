import React from "react";
import { Component } from "react";
import { AppProps } from "../container/todoApp";
import "./todo-card.scss";
class CompletedTodo extends Component<AppProps, {}> {
	render() {
		return (
			<>
				<h3>Completed Tasks</h3>
				<div className="todo-card-wrapper">
					{this.props.todoList.map((ele) => {
						return <p className="todos-card complete">{ele}</p>;
					})}
				</div>
			</>
		);
	}
}

export default CompletedTodo;
