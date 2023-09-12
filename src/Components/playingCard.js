// Code has been adapted from https://bernieslearnings.com/creating-a-component-in-react/

import { useState, useEffect, useRef } from "react";
import {
  BsFillSuitHeartFill,
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitDiamondFill,
} from "react-icons/bs";
import { GiCardJoker } from "react-icons/gi";
// import CardBack from "../images/card-back.jpeg";

function SuitIcon({ suit, style }) {
  if (suit === "Hearts") {
    return <BsFillSuitHeartFill style={style} />;
  } else if (suit === "Diamonds") {
    return <BsFillSuitDiamondFill style={style} />;
  } else if (suit === "Spades") {
    return <BsFillSuitSpadeFill style={style} />;
  } else if (suit === "Clubs") {
    return <BsFillSuitClubFill style={style} />;
  } else {
    // If no suit is given then we can just put out little joker faces
    return <GiCardJoker style={style} />;
  }
}

function PlayingCard({ suit, value }) {
  const myRef = useRef(null);
  const iconSize = "40px";
  const [suitColor, setSuitColor] = useState("red");

  function flipCard() {
    if (myRef.current.style.transform) {
      myRef.current.style.transform = "";
    } else {
      myRef.current.style.transform = "rotateY(180deg)";
    }
  }

  useEffect(() => {
    suit === "Hearts" || suit === "Diamonds"
      ? setSuitColor("red")
      : setSuitColor("black");
  }, [suit]);

  return (
    <div
      ref={myRef}
      onClick={flipCard}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.5s ease",
        transform: "rotateY(180deg)",
        width: "240px",
        height: "336px",
        border: "2px solid transparent",
        position: "relative",
        backgroundColor: "#F2F2F2",
        borderRadius: "10px",
        boxShadow:
          "3px 3px 3px rgba(0,0,0,0.2), 8px 8px 10px rgba(0,0,0,0.2), 0px 0px 20px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ backfaceVisibility: "hidden" }}>
        <h1
          style={{
            fontSize: "50px",
            color: suitColor,
            position: "absolute",
            top: "0px",
            left: "5px",
            margin: "0px",
          }}
        >
          {value}
        </h1>
        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            top: "50px",
            left: "50px",
            color: suitColor,
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            top: "75px",
            left: "100px",
            color: suitColor,
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            top: "50px",
            left: "150px",
            color: suitColor,
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            top: "100px",
            left: "50px",
            color: suitColor,
          }}
        />
        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            top: "100px",
            left: "150px",
            color: suitColor,
          }}
        />

        <h1
          style={{
            fontSize: "50px",
            color: suitColor,
            position: "absolute",
            right: "5px",
            bottom: "0px",
            margin: "0px",
            transform: "rotate(180deg)",
          }}
        >
          {value}
        </h1>
        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            bottom: "50px",
            left: "50px",
            color: suitColor,
            transform: "rotate(180deg)",
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            bottom: "100px",
            left: "50px",
            color: suitColor,
            transform: "rotate(180deg)",
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            bottom: "75px",
            left: "100px",
            color: suitColor,
            transform: "rotate(180deg)",
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            bottom: "50px",
            left: "150px",
            color: suitColor,
            transform: "rotate(180deg)",
          }}
        />

        <SuitIcon
          suit={suit}
          style={{
            fontSize: iconSize,
            position: "absolute",
            margin: "0px",
            bottom: "100px",
            left: "150px",
            color: suitColor,
            transform: "rotate(180deg)",
          }}
        />
      </div>

      <div
        style={{
          width: "216px",
          height: "312px",
          margin: "10px",
          border: "2px solid red",
          borderRadius: "12px",
          backgroundColor: "red",
          // backgroundImage: "url(" + CardBack + ")",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      ></div>
    </div>
  );
}

export default PlayingCard;
