import React, { useState } from 'react';
import './App.css';
import { makeShuffledDeck } from './utils.js';

const App = (props) => {
	const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
	const [currCards, setCurrCards] = useState([]);

	const dealCards = () => {
		const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
		setCurrCards(newCurrCards);
	};

	console.log(cardDeck);
	console.log(currCards);

	const currCardElems = currCards.map(({ name, suit }) => (
		// Give each list element a unique key
		<div key={`${name}${suit}`}>
			{name} of {suit}
		</div>
	));

	return (
		<>
			<div className='App'>
				<header className='App-header'>
					<h3>
						High Card{' '}
						<span
							role='image'
							aria-labelledby='rocket emoji for rocket academy'
						>
							🚀
						</span>
					</h3>
					{currCardElems}
					<br />
					<button onClick={dealCards}>Deal</button>
				</header>
			</div>
		</>
	);
};

export default App;
