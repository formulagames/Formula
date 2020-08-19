import React, { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
// import logo from "./logo.svg";
import "./App.css";
import "./Main.css";

import Formula from "./Images/Formula.png";
import KaartIs from "./Images/KaartIs.png";
import KaartDiv from "./Images/KaartDiv.png";
import KaartKeer from "./Images/KaartKeer.png";
import KaartMin from "./Images/KaartMin.png";
import KaartPlus from "./Images/KaartPlus.png";
import Kaart0 from "./Images/Kaart0.png";
import Kaart1 from "./Images/Kaart1.png";
import Kaart2 from "./Images/Kaart2.png";
import Kaart3 from "./Images/Kaart3.png";
import Kaart4 from "./Images/Kaart4.png";
import Kaart5 from "./Images/Kaart5.png";
import Kaart6 from "./Images/Kaart6.png";
import Kaart7 from "./Images/Kaart7.png";
import Kaart8 from "./Images/Kaart8.png";
import Kaart9 from "./Images/Kaart9.png";

function App() {
  const [deck, setDeck] = React.useState([]);
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const players = [1, 2];
  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [player1Cards, setPlayer1Cards] = React.useState(null);
  const [player1CardsStored, setPlayer1CardsStored] = React.useState(null);
  const [player2Cards, setPlayer2Cards] = React.useState(null);
  const [player2CardsStored, setPlayer2CardsStored] = React.useState(null);
  const [formulaCards, setFormulaCards] = React.useState(null);
  const [formulaCardsStored, setFormulaCardsStored] = React.useState(null);
  const [cardsPlayed, setCardsPlayed] = React.useState(0);
  const [dropped, setDropped] = React.useState(false);
  const [isDraggedSameAsDropped, setIsDraggedSameAsDropped] = React.useState(
    true
  );
  console.log(deck);

  async function createDeck() {
    // creates a deck with each number 5 times
    const tempDeck = [];
    for (var j = 0; j < 5; j++) {
      for (var i = 0; i < values.length; i++) {
        var card = { Value: values[i], src: getCardSrc(values[i]) };
        console.log(getCardSrc(values[i]));
        tempDeck.push(card);
      }
    }
    console.log(tempDeck);
    return cloneDeep(tempDeck);
    // setDeck(tempDeck);
  }
  async function shuffle(tempDeck) {
    // for 1000 turns
    // switch the values of two random cards
    console.log(tempDeck);
    // for (let i = 0; i < 1000; i++) {
    //   const location1 = Math.floor(Math.random() * tempDeck.length);
    //   const location2 = Math.floor(Math.random() * tempDeck.length);
    //   const tmp = tempDeck[location1];

    //   tempDeck[location1] = deck[location2];
    //   tempDeck[location2] = tempDeck;
    // }
    tempDeck.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    return cloneDeep(tempDeck);
    // setDeck(deck);
  }
  async function dealHands(shuffledDeck) {
    // alternate handing cards to each player
    // 7 cards each
    console.log(shuffledDeck);
    for (let i = 0; i < 7; i++) {
      for (let x = 1; x <= players.length; x++) {
        const card = shuffledDeck.pop();
        renderCard(card, x);
      }
    }
    // updateCards();
    // draggingCards();
  }
  const updateCards = async function () {
    // const cardsP1 = document.querySelectorAll(".cardplayer1");
    // const cardsP2 = document.querySelectorAll(".cardplayer2");

    const player1Cards = document.getElementsByClassName("cardplayer1");
    const player2Cards = document.getElementsByClassName("cardplayer2");

    for (let i = 0; i < player1Cards.length; i++) {
      const item = player1Cards[i];
      if (item.style.display === "none") {
        //			console.log("during updateCards " +item.Value);
        item.parentNode.removeChild(item);
      } else {
        //			console.log("during updateCards nothing" + item.Value);
      }
    }

    for (let j = 0; j < player2Cards.length; j++) {
      const item = player2Cards[j];
      if (item.style.display === "none") {
        item.parentNode.removeChild(item);
      }
    }
    setPlayer1Cards(player1Cards);
    setPlayer2Cards(player2Cards);
  };
  async function startformula() {
    if (document.getElementById("btnStart").value === "Start") {
      document.getElementById("btnStart").value = "Restart";
    } else if (document.getElementById("btnStart").value === "Restart") {
      deleteCards();
    }

    // deal 7 cards to every player
    // currentPlayer = 1;
    setCurrentPlayer(1);
    const tempDeck = await createDeck();
    const shuffledDeck = await shuffle(tempDeck);
    dealHands(shuffledDeck);
    document.getElementById("player" + currentPlayer).classList.add("active");
    await updateCards();
    draggingCards();
    for (let i = 1; i < 7; i++) {
      const formulaC = document.getElementById("formula" + i);
      formulaC.Value = 0;
      formulaC.src = Formula;
      if (i === 2) {
        const formula2 = document.getElementById("formula2");
        const card = deck.pop();
        formula2.src = getCardSrc(card.Value);
        formula2.Value = card.Value;
      }
      if (i === 4) {
        const formula4 = document.getElementById("formula4");
        const card = deck.pop();
        formula4.src = getCardSrc(card.Value);
        formula4.Value = card.Value;
      }
    }
    storeCards();
  }
  function storeCards() {
    //  const tempCardsP1 = [];
    //console.log("player1Cards during storage = "+ player1Cards.length);
    //console.log("player1Cards[6] during storage = "+ player1Cards[6].Value);
    updateCards();
    // for (const i = 0; i < player1Cards.length; i++) {
    //   const temp = player1Cards[i];
    //   tempCardsP1.push(temp);
    //   //console.log("tempCards during storage = "+ tempCardsP1[i].Value);
    // }
    setPlayer1CardsStored(cloneDeep(player1Cards));

    // const tempCardsP2 = [];
    updateCards();
    // for (var j = 0; j < player2Cards.length; j++) {
    //   var temp = player2Cards[j];
    //   tempCardsP2.push(temp);
    // }
    setPlayer2CardsStored(cloneDeep(player2Cards));

    // const tempCardsF = [];
    updateCards();
    setFormulaCardsStored(cloneDeep(formulaCards));

    //   	for (var k=0; k<formulaCards.length; k++){
    //   		var temp = formulaCards[k];
    //   		tempCardsF.push(temp);
    //   		console.log(formulaCards)
    //   		console.log(tempCardsF)
    //   // console.log("tempCardsF = " + tempCardsF[k].src);
    //   	}
    // tempCardsF = _.cloneDeep([...formulaCards]);
  }
  const draggingCards = function () {
    let draggedItem = null;

    for (let i = 0; i < player1Cards.length; i++) {
      const item = player1Cards[i];

      //add the value to the item
      const txt = item.src;
      const numb = txt.match(/\d/g); //gets rid of all the characters apart from the numbers
      numb = numb.join("") % 10; //returns the last digit which equals the value of the card
      item.Value = numb;

      // dragging formula's
      item.addEventListener("dragstart", function () {
        draggedItem = item;
        // console.log("start tempCardsF[5]" + tempCardsF[5].src);
        setTimeout(function () {
          item.style.display = "none";
        }, 0);
      });

      item.addEventListener("dragend", function () {
        //			console.log("dragend")
        setTimeout(function () {
          if (draggedItem) {
            draggedItem.style.display = "block";
          }
          draggedItem = null;
        }, 0);
      });

      for (let k = 0; k < formulaCards.length; k++) {
        const formulaCard = formulaCards[k];

        formulaCard.addEventListener("dragover", function (e) {
          e.preventDefault();
          //				console.log("dragover")
        });

        formulaCard.addEventListener("dragenter", function (e) {
          e.preventDefault();
          this.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
          //				console.log("dragenter")
        });

        formulaCard.addEventListener("dragleave", function (e) {
          this.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
          //				console.log("dragleave")
        });

        formulaCard.addEventListener("drop", function (e) {
          if (this === draggedItem) {
            setIsDraggedSameAsDropped(false);
          }

          // console.log("drop tempCardsF[5]" + tempCardsF[5].Value);
          if (draggedItem) {
            this.src = draggedItem.src;
            this.Value = draggedItem.Value;
          }
          draggedItem = null;
          this.style.backgroundColor = "rgba(0, 0, 0, 0)";
          setDropped(true);
          cardsPlayed++;
        });
      }
    }

    for (let i = 0; i < player2Cards.length; i++) {
      const item = player2Cards[i];

      //add the value to the item
      var txt = item.src;
      var numb = txt.match(/\d/g);
      numb = numb.join("") % 10;
      item.Value = numb;

      // dragging formula's
      item.addEventListener("dragstart", function () {
        draggedItem = item;
        setTimeout(function () {
          item.style.display = "none";
        }, 0);
      });

      item.addEventListener("dragend", function () {
        //			console.log("dragend")
        setTimeout(function () {
          draggedItem.style.display = "block";
          draggedItem = null;
        }, 0);
      });

      for (let k = 0; k < formulaCards.length; k++) {
        const formulaCard = formulaCards[k];

        formulaCard.addEventListener("dragover", function (e) {
          e.preventDefault();
          //				console.log("dragover")
        });

        formulaCard.addEventListener("dragenter", function (e) {
          e.preventDefault();
          this.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
          //				console.log("dragenter")
        });

        formulaCard.addEventListener("dragleave", function (e) {
          this.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
          //				console.log("dragleave")
        });

        formulaCard.addEventListener("drop", function (e) {
          if (this === draggedItem) {
            setIsDraggedSameAsDropped(false);
          }
          // console.log("drop " + tempCardsF[5].Value);
          if (draggedItem) {
            this.src = draggedItem.src;
            this.Value = draggedItem.Value;
          }
          draggedItem = null;
          this.style.backgroundColor = "rgba(0, 0, 0, 0)";
          setDropped(true);
          setCardsPlayed(cardsPlayed++);
        });
      }
    }

    for (let i = 0; i < formulaCards.length; i++) {
      const item = formulaCards[i];

      item.addEventListener("dragstart", function () {
        setDropped(false);
        setIsDraggedSameAsDropped(true);
        draggedItem = item;
        setTimeout(function () {}, 0);
      });

      item.addEventListener("dragend", function () {
        if (dropped && isDraggedSameAsDropped) {
          item.src = "Formula.png";
          item.Value = 0;
        }
        setTimeout(function () {
          draggedItem = null;
        }, 0);
      });
    }
  };

  function renderCard(card, player) {
    //displays the cards image

    var playerId = "player" + player;
    var hand = document.getElementById(playerId);
    hand.appendChild(getCardUI(card, playerId));
    updateCards();
    draggingCards();
  }

  function getCardUI(card, playerId) {
    console.log(card);
    //creates the card image
    const el = document.createElement("img");
    const src = getCardSrc(card.Value);

    el.className = "card" + playerId;
    el.src = src;
    el.alt = "number " + card.Value;
    el.value = card.Value;
    el.setAttribute("draggable", true);
    return el;
  }
  //deletes the player cards
  function deleteCards() {
    const numCardspl1 = player1Cards.length - 1;

    for (const i = numCardspl1; i >= 0; i--) {
      player1Cards[i].parentNode.removeChild(player1Cards[i]);
    }

    const numCardspl2 = player2Cards.length - 1;

    for (const j = numCardspl2; j >= 0; j--) {
      player2Cards[j].parentNode.removeChild(player2Cards[j]);
    }

    for (const k = 1; k < 7; k++) {
      const idName = "formula" + k;
      const formulaC = document.getElementById(idName);
      //formulaC.Value = 0;
      //formulaC.src = "Formula.png";
      formulaC.parentNode.removeChild(formulaC);
    }
    setPlayer1Cards(player1Cards);
    setPlayer2Cards(player2Cards);
  }
  function getCardSrc(value) {
    let src = "";
    switch (value) {
      case 0:
        src = Kaart0;
        break;
      case 1:
        src = Kaart1;
        break;
      case 2:
        src = Kaart2;
        break;
      case 3:
        src = Kaart3;
        break;
      case 4:
        src = Kaart4;
        break;
      case 5:
        src = Kaart5;
        break;
      case 6:
        src = Kaart6;
        break;
      case 7:
        src = Kaart7;
        break;
      case 8:
        src = Kaart8;
      case 9:
        src = Kaart9;
        break;
      default:
        break;
    }
    return src;
  }
  // function to reset the stored cards
  function resetCards() {
    deleteCards();
    setCardsPlayed(0);

    for (const i = 0; i < player1CardsStored.length; i++) {
      renderCard(player1CardsStored[i], 1);
    }

    for (var j = 0; j < player2CardsStored.length; j++) {
      renderCard(player2CardsStored[j], 2);
    }

    var divNum1 = document.getElementById("num1");
    var formulaReset0 = formulaCardsStored[0];
    var formulaReset1 = formulaCardsStored[1];
    divNum1.appendChild(formulaReset0);
    divNum1.appendChild(formulaReset1);

    var divNum2 = document.getElementById("num2");
    var formulaReset2 = formulaCardsStored[2];
    var formulaReset3 = formulaCardsStored[3];
    divNum2.appendChild(formulaReset2);
    divNum2.appendChild(formulaReset3);

    var Answer = document.getElementById("answer");
    var formulaReset4 = formulaCardsStored[4];
    var formulaReset5 = formulaCardsStored[5];
    Answer.appendChild(formulaReset4);
    Answer.appendChild(formulaReset5);
  }

  return (
    <div className="app">
      <header>
        <h1>Formula</h1>
      </header>
      <div className="game-options">
        <input
          type="button"
          id="btnStart"
          className="btn"
          value="Start"
          onClick={startformula}
        />
        <input
          type="button"
          className="btn"
          value="Draw a card"
          //onClick="drawCard()"
        />
        <input
          type="button"
          className="btn"
          value="Check" //onClick="check()"
        />
        <input
          type="button"
          className="btn"
          value="Reset to beginning of turn"
          //onClick="resetCards()"
        />
      </div>
      <div className="lists">
        <div className="player1" id="player1">
          Player 1 <br />
        </div>
        <div className="formula">
          <p className="fixed">Equation</p>
          <div className="number" id="num1">
            <img
              className="formulaCard"
              alt="formula1"
              id="formula1"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
            <img
              className="formulaCard"
              alt="formula2"
              id="formula2"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
          </div>
          <div className="operator">
            <img
              className="formulaOperator"
              alt="KaartPlus"
              id="formulaPlus"
              // src="KaartPlus.png"
              src={KaartPlus}
            />
            <img
              className="formulaOperator"
              alt="KaartMin"
              id="formulaMinus"
              // src="KaartMin.png"
              src={KaartMin}
            />
            <img
              className="formulaOperator"
              alt="KaartKeer"
              id="formulaKeer"
              // src="KaartKeer.png"
              src={KaartKeer}
            />
            <img
              className="formulaOperator"
              alt="KaartDiv"
              id="formulaDiv"
              // src="KaartDiv.png"
              src={KaartDiv}
            />
          </div>
          <div className="number" id="num2">
            <img
              className="formulaCard"
              alt="formula3"
              id="formula3"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
            <img
              className="formulaCard"
              alt="formula4"
              id="formula4"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
          </div>
          <div className="operator">
            <img
              className="formulaEquals"
              alt="KaartIs"
              id="formulaEquals"
              // src="KaartIs.png"
              src={KaartIs}
              draggable="true"
            />
          </div>
          <div className="number" id="answer">
            <img
              className="formulaCard"
              alt="formula5"
              id="formula5"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
            <img
              className="formulaCard"
              alt="formula6"
              id="formula6"
              // src="Formula.png"
              src={Formula}
              draggable="true"
            />
          </div>
        </div>
        <div className="player2" id="player2">
          Player 2<br />
        </div>
      </div>
    </div>
  );
}

export default App;
