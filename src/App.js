import React, { useState, useEffect } from 'react';
import './App.css';
import { makeShuffledDeck, shuffleCards } from './utils.js';
import Button from '@mui/material/Button';

const App = (props) => {
	const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
	const [currCards, setCurrCards] = useState([]);
	const [discardPile, setDiscardPile] = useState([]);
	const [scores, setPlayerScores] = useState({ player1: 0, player2: 0 });

	const dealCards = () => {
		const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
		setCurrCards(newCurrCards);
		setDiscardPile(discardPile.concat(newCurrCards));
	};

	const handleStrings = (card1, card2) => {
		const cardValues = { Ace: 14, Jack: 11, Queen: 12, King: 13 };

		if (typeof card1 === 'number' && typeof card2 === 'number') {
			return [card1, card2];
		} else {
			if (typeof card1 === 'string') {
				card1 = cardValues[card1] || parseInt(card1);
			}
			if (typeof card2 === 'string') {
				card2 = cardValues[card2] || parseInt(card2);
			}
			return [card1, card2];
		}
	};

	const determineWinner = () => {
		const player1Elem = document.getElementById('player1');
		const player2Elem = document.getElementById('player2');
		if (player1Elem && player2Elem) {
			const player1Content = player1Elem.textContent;
			const player2Content = player2Elem.textContent;

			console.log(handleStrings(player1Content, player2Content));

			// Update the scores state variable based on the comparison result
			if (player1Content === player2Content) {
				setPlayerScores((scores) => ({
					...scores,
					player1: scores.player1 + 1,
					player2: scores.player2 + 1,
				}));
			} else {
				setPlayerScores((scores) => ({
					...scores,
					player1: scores.player1,
					player2: scores.player2 + 1,
				}));
			}
		}
		console.log(scores);
	};

	useEffect(() => {
		determineWinner(scores);
	}, [currCards]);

	const handleEmptyDeck = () => {
		if (cardDeck.length === 0 && discardPile.length === 52) {
			setCardDeck([...discardPile]);
			setDiscardPile([]);
			shuffleCards(cardDeck);
		}
	};

	const currCardElems = currCards.map(({ name, suit }, index) => (
		// Give each list element a unique key and ID
		<div key={`${name}${suit}`}>
			<span id={`player${index + 1}`}>{name}</span> of {suit}
		</div>
	));

	return (
		<>
			<div className='App'>
				<header className='App-header'>
					<h3>
						High Card
						<span role='img' aria-labelledby='rocket emoji for rocket academy'>
							🚀
						</span>
					</h3>
					{currCardElems}
					<br />
					{cardDeck.length > 0 ? (
						<Button onClick={dealCards} variant='contained'>
							Deal
						</Button>
					) : (
						<button onClick={handleEmptyDeck}>Restart</button>
					)}
				</header>
			</div>
		</>
	);
};

export default App;
