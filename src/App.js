import React, { useState } from 'react';
import './App.css';
import { makeShuffledDeck, shuffleCards } from './utils.js';
import Button from '@mui/material/Button';

const App = () => {
	const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
	const [currCards, setCurrCards] = useState([]);
	const [discardPile, setDiscardPile] = useState([]);
	const [scores, setPlayerScores] = useState({ player1: 0, player2: 0 });
	const [rounds, setRounds] = useState(0);
	const [winner, setWinner] = useState('');
	const [game, setGame] = useState({ player1: 0, player2: 0 });

	const dealCards = () => {
		const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
		setCurrCards(newCurrCards);
		setDiscardPile(discardPile.concat(newCurrCards));
		setRounds(rounds + 1);

		setTimeout(() => {
			const player1Elem = document.getElementById('player1');
			const player2Elem = document.getElementById('player2');

			if (player1Elem && player2Elem) {
				const player1Content = player1Elem.textContent;
				const player2Content = player2Elem.textContent;

				const [card1, card2] = handleStrings(player1Content, player2Content);
				awardScores(card1, card2);
			}
		}, 0);
	};

	const handleStrings = (card1, card2) => {
		const cardValues = { A: 14, J: 11, Q: 12, K: 13 };
		console.log(card1, card2);

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

	const manageGameScore = () => {
		const player1FinalScore = document
			.querySelector('.scores :first-child')
			.textContent.slice(-2);
		const player2FinalScore = document
			.querySelector('.scores :last-child')
			.textContent.slice(-2);
		if (Number(player1FinalScore) > Number(player2FinalScore)) {
			setGame((game) => ({
				...game,
				player1: game.player1 + 1,
			}));
		} else {
			setGame((game) => ({
				...game,
				player2: game.player2 + 1,
			}));
		}

		setPlayerScores({ player1: 0, player2: 0 });
	};

	const awardScores = (score1, score2) => {
		if (score1 > score2) {
			setWinner('Player 1 won this round');
			setPlayerScores((scores) => ({
				...scores,
				player1: scores.player1 + 1,
			}));
		} else if (score1 < score2) {
			setWinner('Player 2 won this round');
			setPlayerScores((scores) => ({
				...scores,
				player2: scores.player2 + 1,
			}));
		} else {
			setWinner('Its a draw');
		}

		return winner;
	};

	const handleEmptyDeck = () => {
		if (cardDeck.length === 0 && discardPile.length === 52) {
			setCardDeck([...discardPile]);
			setDiscardPile([]);
			shuffleCards(cardDeck);
			manageGameScore();
			setRounds(0);
		}
	};

	const currCardElems = currCards.map(({ name, suit }, index) => (
		<div className='cardContainer' key={`${name}${suit}`}>
			<img
				className='card'
				src={`./img/${name}${suit}.svg`}
				alt={`${name} of ${suit}`}
			/>

			<span id={`player${index + 1}`}>{name}</span>
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

					<h4> Round {rounds}</h4>
					<div className='playingCards'>{currCardElems}</div>

					<br />
					{cardDeck.length > 0 ? (
						<Button variant='contained' className='btn' onClick={dealCards}>
							Deal
						</Button>
					) : (
						<Button variant='' onClick={handleEmptyDeck}>
							Restart
						</Button>
					)}

					{cardDeck.length === 52 ? (
						<p className='readyState'>Get ready to play!</p>
					) : (
						<p>{`${winner}`}</p>
					)}
					<div className='scores'>
						<p> Player 1 score: {scores.player1}</p>
						<p>Player 2 score: {scores.player2}</p>
					</div>

					<div>
						<p>Player 1 games won: {game.player1}</p>
						<p>Player 2 games won: {game.player2}</p>
					</div>
				</header>
			</div>
		</>
	);
};

export default App;
