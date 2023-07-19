import React from 'react';
import './App.css';
import { makeShuffledDeck } from './utils.js';

class App extends React.Component {
	constructor(props) {
		// Always call super with props in constructor to initialise parent class
		super(props);
		this.state = {
			// Set default value of card deck to new shuffled deck
			cardDeck: makeShuffledDeck(),
			// currCards holds the cards from the current round
			currCards: [],
		};
	}

	dealCards = () => {
		// this.state.cardDeck.pop() modifies this.state.cardDeck array
		const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
		this.setState({
			currCards: newCurrCards,
		});
	};

	render() {
		// You can write JavaScript here, just don't try and set your state!

		console.log(this.state.cardDeck);
		console.log(this.state.currCards);
		// You can access your current components state here, as indicated below
		const currCardElems = this.state.currCards.map(({ name, suit }) => (
			// Give each list element a unique key
			<div key={`${name}${suit}`}>
				{name} of {suit}
			</div>
		));

		return (
			<div className='App'>
				<header className='App-header'>
					<h3>High Card 🚀</h3>
					{currCardElems}
					<br />
					<button onClick={this.dealCards}>Deal</button>
				</header>
			</div>
		);
	}
}

export default App;
