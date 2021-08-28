import React from "react";
import { Component } from "react";
import { AppProps } from "../container/todoApp";
import "./todo-card.scss";
class ActiveTodo extends Component<AppProps, {}> {
	render() {
		return (
			<>
				<h3>Active Tasks</h3>
				<div className="todo-card-wrapper">
					{this.props.todoList.map((ele, index) => {
						return (
							<p
								onClick={() => this.props.markCompleteHandler(index)}
								className="todos-card active"
							>
								{ele}
							</p>
						);
					})}
				</div>
			</>
		);
	}
}

export default ActiveTodo;
