import React, { useState, useEffect } from 'react';
import './App.css';
import { makeShuffledDeck, shuffleCards } from './utils.js';

const App = (props) => {
	const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
	const [currCards, setCurrCards] = useState([]);
	const [discardPile, setDiscardPile] = useState([]);

	const dealCards = () => {
		const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
		setCurrCards(newCurrCards);
		setDiscardPile(discardPile.concat(newCurrCards));
		console.log(` The cardPile length is: ${cardDeck.length}`);
		console.log(` The discardPile length is: ${discardPile.length}`);
	};

	useEffect(() => {
		handleEmptyDeck();
	}, [cardDeck]);

	const handleEmptyDeck = () => {
		if (cardDeck.length === 0 && discardPile.length === 52) {
			setCardDeck([...discardPile]);
			setDiscardPile([]);
			console.log(` The discard Pile length is:${discardPile.length}`);
			shuffleCards(cardDeck);
			console.log(` The Card Pile length is:${cardDeck.length}`);
		}
	};

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
						<span role='img' aria-labelledby='rocket emoji for rocket academy'>
							🚀
						</span>
					</h3>
					{currCardElems}
					<br />
					{cardDeck.length > 0 ? (
						<button onClick={dealCards}>Deal</button>
					) : (
						<button onClick={handleEmptyDeck}>Restart</button>
					)}
				</header>
			</div>
		</>
	);
};

export default App;
