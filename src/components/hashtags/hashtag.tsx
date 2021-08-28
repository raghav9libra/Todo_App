import React, { Component } from "react";
import "./hashtag.scss";
interface Props {
	hashtagList: Array<string>;
	handleFiltering: (value: string) => void;
}

class Hashtags extends Component<Props> {
	render() {
		return (
			<div className="hastags-container">
				{this.props.hashtagList.map((ele, index) => {
					return (
						<p
							onClick={() => {
								this.props.handleFiltering(ele);
							}}
						>
							#{ele}
						</p>
					);
				})}
			</div>
		);
	}
}
export default Hashtags;
