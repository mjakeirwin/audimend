import React, { Component } from 'react';
import { Route } from 'react-router-dom';




export default class CustomLink extends Component {

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(history, e) {	
	
		history.push(this.props.to);

	}

	render() {
		let { to, children, exact = true } = this.props;

		return (
			<Route exact={exact} path={to} children={({ match, history }) => children({
				isActive: match,
				onClick: this.handleClick.bind(this, history)
			})} />
		);
	}
}
