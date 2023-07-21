import {GiClubs, GiDiamonds, GiHearts, GiSpades} from "react-icons/gi";

export default function PlayerElem({currCards}) {
  const listItems = currCards.map((card, index) => 
    <div className="PlayerElem" key={`Player ${index}`}>
      <h3>Player {index+1}</h3>
      <div className='CardElem'>
        {!card ? <br/> : card.rank < 11 ? `${card.name}` : `${card.name.charAt()}`}
        {!card ? <br/> : card.suit === 'Clubs' ? <GiClubs size={40} color='black'/> : card.suit === 'Diamonds' ? <GiDiamonds size={40} color='red'/> : card.suit === 'Hearts' ? <GiHearts size={40} color='red'/> : card.suit === 'Spades' && <GiSpades size={40} color='black'/>}
      </div>
      {card ? `${card.name} of ${card.suit}` : "Press Deal to start"}
    </div>
  )
  
  return (
    <div className="PlayerContainer">{listItems}</div>
  )
}
