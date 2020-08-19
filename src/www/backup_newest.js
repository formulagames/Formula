import React, { Component } from "react";
import { shuffle, cloneDeep } from "lodash";

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

export default class Home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      deck: [],
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      players: [1, 2],
      currentPlayer: 1,
      player1Cards: null,
      player1CardsStored: null,
      player2Cards: null,
      player2CardsStored: null,
      formulaCards: null,
      formulaCardsStored: null,
      cardsPlayed: 0,
      dropped: false,
      isDraggedSameAsDropped: true,
    };
  }

  startformula() {
    if (document.getElementById("btnStart").value === "Start") {
      document.getElementById("btnStart").value = "Restart";
    } else if (document.getElementById("btnStart").value === "Restart") {
      // deleteCards();
    }

    // deal 7 cards to every player
    // currentPlayer = 1;
    // setCurrentPlayer(1);
    try {
      this.createDeck();

      for (let i = 1; i < 7; i++) {
        const formulaC = document.getElementById("formula" + i);
        formulaC.Value = 0;
        formulaC.src = Formula;
        if (i === 2) {
          const formula2 = document.getElementById("formula2");
          console.log(this.state.deck);
          const card = this.state.deck.pop();
          formula2.src = this.getCardSrc(card.Value);
          formula2.Value = card.Value;
        }
        if (i === 4) {
          const formula4 = document.getElementById("formula4");
          const card = this.state.deck.pop();
          formula4.src = this.getCardSrc(card.Value);
          formula4.Value = card.Value;
        }
      }
      this.storeCards();
    } catch (error) {
      console.log(error);
    }
  }
  createDeck = () => {
    // creates a deck with each number 5 times
    const tempDeck = [];
    for (var j = 0; j < 5; j++) {
      for (var i = 0; i < this.state.values.length; i++) {
        var card = {
          Value: this.state.values[i],
          src: this.getCardSrc(this.state.values[i]),
        };
        console.log(this.getCardSrc(this.state.values[i]));
        tempDeck.push(card);
      }
    }
    console.log(tempDeck);
    // return cloneDeep(tempDeck);
    // setDeck(tempDeck);
    this.setState({ deck: tempDeck, currentPlayer: 1 }, () => {
      this.shuffleDeck();
    });
  };
  shuffleDeck() {
    // for 1000 turns
    // switch the values of two random cards
    // for (let i = 0; i < 1000; i++) {
    //   const location1 = Math.floor(Math.random() * tempDeck.length);
    //   const location2 = Math.floor(Math.random() * tempDeck.length);
    //   const tmp = tempDeck[location1];

    //   tempDeck[location1] = deck[location2];
    //   tempDeck[location2] = tempDeck;
    // }
    console.log(shuffle(this.state.deck));
    this.setState({ deck: shuffle(this.state.deck) }, () => {
      this.dealHands();
    });

    // setDeck(deck);
  }
  dealHands() {
    // alternate handing cards to each player
    // 7 cards each
    console.log();
    for (let i = 0; i < 7; i++) {
      for (let x = 1; x <= this.state.players.length; x++) {
        const card = this.state.deck.pop();
        this.renderCard(card, x);
      }
    }
    this.updateCards();
    // draggingCards();
  }
  updateCards() {
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
    this.setState(
      {
        player1Cards: player1Cards,
        player2Cards: player2Cards,
      },
      () => {
        this.draggingCards();
      }
    );
    // setPlayer1Cards(player1Cards);
    // setPlayer2Cards(player2Cards);
  }
  draggingCards() {
    let draggedItem = null;

    for (let i = 0; i < this.state.player1Cards.length; i++) {
      const item = this.state.player1Cards[i];

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

      for (let k = 0; k < this.state.formulaCards.length; k++) {
        const formulaCard = this.state.formulaCards[k];

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
            // setIsDraggedSameAsDropped(false);
            this.setState({
              isDraggedSameAsDropped: false,
            });
          }

          // console.log("drop tempCardsF[5]" + tempCardsF[5].Value);
          if (draggedItem) {
            this.src = draggedItem.src;
            this.Value = draggedItem.Value;
          }
          draggedItem = null;
          this.style.backgroundColor = "rgba(0, 0, 0, 0)";
          // setDropped(true);
          this.setState({
            dropped: true,
            cardsPlayed: this.state.cardsPlayed++,
          });
          // cardsPlayed++;
        });
      }
    }

    for (let i = 0; i < this.state.player2Cards.length; i++) {
      const item = this.state.player2Cards[i];

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

      for (let k = 0; k < this.state.formulaCards.length; k++) {
        const formulaCard = this.state.formulaCards[k];

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
            // setIsDraggedSameAsDropped(false);
            this.setState({
              isDraggedSameAsDropped: false,
            });
          }
          // console.log("drop " + tempCardsF[5].Value);
          if (draggedItem) {
            this.src = draggedItem.src;
            this.Value = draggedItem.Value;
          }
          draggedItem = null;
          this.style.backgroundColor = "rgba(0, 0, 0, 0)";
          // setDropped(true);
          this.setState({
            dropped: true,
            cardsPlayed: this.state.cardsPlayed++,
          });
          // setCardsPlayed(cardsPlayed++);
        });
      }
    }

    for (let i = 0; i < this.state.length; i++) {
      const item = this.state.formulaCards[i];

      item.addEventListener("dragstart", function () {
        // setDropped(false);
        // setIsDraggedSameAsDropped(true);
        this.setState({
          isDraggedSameAsDropped: false,
          dropped: false,
        });
        draggedItem = item;
        setTimeout(function () {}, 0);
      });

      item.addEventListener("dragend", function () {
        if (this.state.dropped && this.state.isDraggedSameAsDropped) {
          item.src = "Formula.png";
          item.Value = 0;
        }
        setTimeout(function () {
          draggedItem = null;
        }, 0);
      });
    }
  }

  storeCards() {
    this.setState({
      player1CardsStored: cloneDeep(this.state.player1Cards),
      player2CardsStored: cloneDeep(this.state.player2Cards),
      formulaCardsStored: cloneDeep(this.state.formulaCards),
    });
  }
  getCardSrc(value) {
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
        break;
      case 9:
        src = Kaart9;
        break;
      default:
        break;
    }
    return src;
  }
  render() {
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
            onClick={this.startformula}
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
}
