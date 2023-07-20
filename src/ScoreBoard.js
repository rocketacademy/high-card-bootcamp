import React from 'react';

export const ScoreBoard = ({ scores }) => {
	return (
		<div className='score'>
			<span className='playerScore' id='player1'>
				{' '}
				0{' '}
			</span>
			<span className='playerScore' id='player2'>
				{' '}
				0{' '}
			</span>
		</div>
	);
};
