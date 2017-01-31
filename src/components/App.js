import React from "react";

import AboutMe from './AboutMe';
import Header from './Header';
import Portfolio from './Portfolio';

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<AboutMe />
				<Portfolio />
			</div>
		);
	}
}