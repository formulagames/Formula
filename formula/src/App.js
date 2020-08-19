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

import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

export default class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      deck: [],
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      players: [1, 2],
      currentPlayer: 1,
      player1Cards: [],
      player1CardsStored: null,
      player2Cards: [],
      player2CardsStored: null,
      formulaCards: [],
      formulaCardsStored: null,
      cardsPlayed: 0,
      operator: null,
      operators: [
        { value: "+", src: KaartPlus },
        { value: "-", src: KaartMin },
        { value: "*", src: KaartKeer },
        { value: "/", src: KaartDiv },
      ],
      gameStarted: false,
    };
  }

  componentDidMount = () => {
    const formulaCards = [];
    for (let i = 1; i < 7; i++) {
      formulaCards.push({
        value: 0,
        src: this.getCardSrc("Formula"),
      });
    }
    this.setState({ formulaCards });
  };
  startFormula = () => {
    let player1Cards = [];
    let player2Cards = [];
    let formulaCards = [];

    // createDeck
    const tempDeck = [];
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < this.state.values.length; i++) {
        let card = {
          value: this.state.values[i],
          src: this.getCardSrc(this.state.values[i]),
        };
        tempDeck.push(card);
      }
    }
    // this.shuffleCards();
    const shuffledDeck = shuffle(tempDeck);
    // dealhands
    for (let i = 0; i < 7; i++) {
      for (let x = 1; x <= this.state.players.length; x++) {
        const card = shuffledDeck.pop();
        if (x === 1) {
          player1Cards.push({
            value: card.value,
            playerId: "player" + x,
            src: this.getCardSrc(card.value),
          });
        }
        if (x === 2) {
          player2Cards.push({
            value: card.value,
            playerId: "player" + x,
            src: this.getCardSrc(card.value),
          });
        }
      }
    }
    const currentPlayer = 1;
    document.getElementById("player" + currentPlayer).classList.add("active");

    // add 2 formula cards
    for (let i = 1; i < 7; i++) {
      if (i === 2 || i === 4) {
        const card = shuffledDeck.pop();
        formulaCards.push({
          value: card.value,
          src: this.getCardSrc(card.value),
        });
      } else {
        formulaCards.push({
          value: 0,
          src: this.getCardSrc("Formula"),
        });
      }
    }
    // set state once
    this.setState({
      player1Cards,
      player2Cards,
      formulaCards,
      deck: shuffledDeck,
      currentPlayer,
      player1CardsStored: cloneDeep(player1Cards),
      player2CardsStored: cloneDeep(player2Cards),
      formulaCardsStored: cloneDeep(formulaCards),
      gameStarted: true,
    });
  };
  // updateCards = () => {
  //   const player1Cards = document.getElementsByClassName("cardplayer1");
  //   const player2Cards = document.getElementsByClassName("cardplayer2");
  //   for (let i = 0; i < player1Cards.length; i++) {
  //     const item = player1Cards[i];
  //     if (item.style.display === "none") {
  //       item.parentNode.removeChild(item);
  //     }
  //   }
  //   for (let j = 0; j < player2Cards.length; j++) {
  //     const item = player2Cards[j];
  //     if (item.style.display === "none") {
  //       item.parentNode.removeChild(item);
  //     }
  //   }
  //   this.setState({
  //     player1Cards: player1Cards,
  //     player2Cards: player2Cards,
  //   });
  // };
  // getCardUI = (card, playerId) => {
  //   console.log(card);
  //   //creates the card image
  //   // const el = document.createElement("img");
  //   const src = this.getCardSrc(card.value);

  //   // el.className = "card" + playerId;
  //   // el.src = src;
  //   // el.alt = "number " + card.value;
  //   // el.value = card.value;
  //   // el.setAttribute("draggable", true);
  //   return (
  //     <Draggable draggableId="draggable-1" index={0}>
  //       {(provided, snapshot) => (
  //         <img
  //           className={"card" + playerId}
  //           src={src}
  //           alt={"number" + card.value}
  //           value={card.value}
  //           ref={provided.innerRef}
  //           {...provided.draggableProps}
  //           {...provided.dragHandleProps}
  //         />
  //       )}
  //     </Draggable>
  //   );
  // };
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
      case "Formula":
        src = Formula;
        break;
      default:
        break;
    }
    return src;
  }
  drawCard = () => {
    const card = shuffle(this.state.deck).pop();
    let currentPlayer = this.state.currentPlayer;
    document
      .getElementById("player" + currentPlayer)
      .classList.remove("active");
    if (this.state.currentPlayer === this.state.players.length) {
      currentPlayer = 1;
      this.state.player2Cards.push({
        value: card.value,
        playerId: "player" + this.state.players.length,
        src: this.getCardSrc(card.value),
      });
    } else {
      currentPlayer++;
      this.state.player1Cards.push({
        value: card.value,
        playerId: "player" + 1,
        src: this.getCardSrc(card.value),
      });
    }
    // renderCard(card, currentPlayer);
    // this.changePlayer();
    document.getElementById("player" + currentPlayer).classList.add("active");
    this.setState({
      player1Cards: this.state.player1Cards,
      player2Cards: this.state.player2Cards,
      player1CardsStored: cloneDeep(this.state.player1Cards),
      player2CardsStored: cloneDeep(this.state.player2Cards),
      formulaCardsStored: cloneDeep(this.state.formulaCards),
      currentPlayer,
    });
  };
  changePlayer = () => {
    // cardsPlayed = 0; // reset the number of cards played
    let currentPlayer = this.state.currentPlayer;
    document
      .getElementById("player" + currentPlayer)
      .classList.remove("active");
    if (this.state.currentPlayer === this.state.players.length) {
      currentPlayer = 1;
      document.getElementById("player" + currentPlayer).classList.add("active");
    } else {
      currentPlayer++;
      document.getElementById("player" + currentPlayer).classList.add("active");
    }
    this.setState({
      currentPlayer,
    });
  };
  resetCards = () => {
    if (this.state.currentPlayer === 1) {
      this.setState({
        player1Cards: cloneDeep(this.state.player1CardsStored),
        formulaCards: cloneDeep(this.state.formulaCardsStored),
      });
    } else if (this.state.currentPlayer === 2) {
      this.setState({
        player2Cards: cloneDeep(this.state.player2CardsStored),
        formulaCards: cloneDeep(this.state.formulaCardsStored),
      });
    }
  };

  onBeforeDragStart = () => {};
  onDragStart = () => {};
  onDragUpdate = () => {};
  onDragEnd = (event) => {
    console.log(event);
    console.log(
      event.source.droppableId === "droppable-player1" &&
        event.destination.droppableId !== "droppable-player2"
    );
    if (
      (event.source.droppableId !== event.destination.droppableId &&
        event.source.droppableId === "droppable-player1" &&
        event.destination.droppableId !== "droppable-player2") ||
      (event.source.droppableId !== event.destination.droppableId &&
        event.source.droppableId === "droppable-player2" &&
        event.destination.droppableId !== "droppable-player1")
    ) {
      const id = event.draggableId.split("-");
      const playerString = id[1];
      const player = parseInt(playerString.split("_")[1]);
      const indexInPlayer = parseInt(id[2]);
      const destinationId = event.destination.droppableId.split("-");
      const indexInFormula = parseInt(destinationId[2]);
      if (this.state.currentPlayer === player) {
        if (player === 1) {
          const card = this.state.player1Cards.find(
            (x, index) => index === indexInPlayer
          );
          const filtered = this.state.player1Cards.filter(
            (x, index) => index !== indexInPlayer
          );
          const match = this.state.formulaCards.find(
            (x, index) => index === indexInFormula
          );
          match.src = card.src;
          match.value = card.value;
          this.setState({
            player1Cards: filtered,
            formulaCards: this.state.formulaCards,
          });
        }
        if (player === 2) {
          const card = this.state.player2Cards.find(
            (x, index) => index === indexInPlayer
          );
          const filtered = this.state.player2Cards.filter(
            (x, index) => index !== indexInPlayer
          );
          const match = this.state.formulaCards.find(
            (x, index) => index === indexInFormula
          );
          match.src = card.src;
          match.value = card.value;
          this.setState({
            player2Cards: filtered,
            formulaCards: this.state.formulaCards,
          });
        }
      }
    }
  };
  check = () => {
    const currentPlayer = this.state.currentPlayer;
    // check if Formula is correct
    // get the properties of the cards in a variable so we can check the equations
    const formula1 = this.state.formulaCards[0];
    const formula2 = this.state.formulaCards[1];
    const formula3 = this.state.formulaCards[2];
    const formula4 = this.state.formulaCards[3];
    const formula5 = this.state.formulaCards[4];
    const formula6 = this.state.formulaCards[5];

    let formulaDigit1 = formula1.value;
    let formulaDigit2 = formula2.value;
    let formulaDigit3 = formula3.value;
    let formulaDigit4 = formula4.value;
    let formulaDigit5 = formula5.value;
    let formulaDigit6 = formula6.value;
    formulaDigit1 = formulaDigit1.toString();
    formulaDigit2 = formulaDigit2.toString();
    formulaDigit3 = formulaDigit3.toString();
    formulaDigit4 = formulaDigit4.toString();
    formulaDigit5 = formulaDigit5.toString();
    formulaDigit6 = formulaDigit6.toString();

    const num1 = parseFloat(formulaDigit1 + formulaDigit2);
    const num2 = parseFloat(formulaDigit3 + formulaDigit4);
    const num3 = parseFloat(formulaDigit5 + formulaDigit6);

    if (this.state.operator === null) {
      alert("You forgot to select an operator. Please click an operator.");
    }
    if (this.state.operator === "+") {
      if (num1 + num2 === num3) {
        this.changePlayer();
        alert(
          "good job! " +
            num1 +
            " + " +
            num2 +
            " = " +
            num3 +
            ". It is now the turn of player " +
            parseFloat(currentPlayer === 1 ? 2 : 1)
        );
      } else {
        alert(num1 + "+" + num2 + " does not equal " + num3);
      }
    } else if (this.state.operator === "-") {
      if (num1 - num2 === num3) {
        this.changePlayer();
        alert(
          "good job! " +
            num1 +
            " - " +
            num2 +
            " = " +
            num3 +
            ". It is now the turn of player " +
            parseFloat(currentPlayer === 1 ? 2 : 1)
        );
      } else {
        alert(num1 + "-" + num2 + " does not equal " + num3);
      }
    } else if (this.state.operator === "/") {
      if (num1 / num2 === num3) {
        this.changePlayer();
        alert(
          "good job! " +
            num1 +
            " / " +
            num2 +
            " = " +
            num3 +
            ". It is now the turn of player " +
            parseFloat(currentPlayer === 1 ? 2 : 1)
        );
      } else {
        alert(num1 + "/" + num2 + " does not equal " + num3);
      }
    } else if (this.state.operator === "*") {
      if (num1 * num2 === num3) {
        this.changePlayer();
        alert(
          "good job! " +
            num1 +
            " * " +
            num2 +
            " = " +
            num3 +
            ". It is now the turn of player " +
            parseFloat(currentPlayer === 1 ? 2 : 1)
        );
      } else {
        alert(num1 + "*" + num2 + " does not equal " + num3);
      }
    }
  };
  render() {
    return (
      <DragDropContext
        onBeforeDragStart={this.onBeforeDragStart}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <div className="app">
          <header>
            <h1>Formula</h1>
          </header>
          <div className="game-options">
            <input
              type="button"
              id="btnStart"
              className="btn"
              value={!this.state.gameStarted ? "Start" : "Restart"}
              onClick={() => this.startFormula(this.state.gameStarted)}
            />
            <input
              type="button"
              className="btn"
              value="Draw a card"
              onClick={() => this.drawCard()}
            />
            <input
              type="button"
              className="btn"
              value="Check"
              onClick={() => this.check()}
            />
            <input
              type="button"
              className="btn"
              value="Reset to beginning of turn"
              onClick={() => this.resetCards()}
            />
          </div>
          <div className="lists">
            <Droppable droppableId="droppable-player1">
              {(provided, snapshot) => (
                <div
                  className="player1"
                  id="player1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  Player 1 <br />
                  {this.state.player1Cards.map((card, index) => {
                    return (
                      <Draggable
                        draggableId={`draggable-player_1-${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <img
                            className={"card" + card.playerId}
                            src={card.src}
                            alt={"number" + card.value}
                            value={card.value}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {/* {provided.placeholder} */}
                </div>
              )}
            </Droppable>
            <div className="formula">
              <p className="fixed">Equation</p>
              <div className="number" id="num1">
                {this.state.formulaCards.map((card, index) => {
                  if (index === 0 || index === 1) {
                    return (
                      <Droppable
                        droppableId={`droppable-formula-${index}`}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <img
                              className="formulaCard"
                              alt={`formula${index + 1}`}
                              id={`formula${index + 1}`}
                              // src="Formula.png"
                              value={card.value}
                              src={card.src}
                              draggable="true"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            />
                            {/* {provided.placeholder} */}
                          </>
                        )}
                      </Droppable>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className="operator">
                {this.state.operators.map((x) => {
                  return (
                    <img
                      key={x.value}
                      className="formulaOperator"
                      id={x.value}
                      alt={x.value}
                      src={x.src}
                      onClick={() => {
                        if (
                          this.state.operator !== null ||
                          this.state.operator === x.value
                        ) {
                          const cardToRemove = document.getElementById(
                            this.state.operator
                          );
                          cardToRemove.classList.remove("operatorSelect");
                          this.setState({ operator: null });
                        }
                        if (
                          this.state.operator === null ||
                          this.state.operator !== x.value
                        ) {
                          const cardToAdd = document.getElementById(x.value);
                          cardToAdd.classList.add("operatorSelect");
                          this.setState({ operator: x.value });
                        }
                      }}
                    />
                  );
                })}
              </div>
              <div className="number" id="num2">
                {this.state.formulaCards.map((card, index) => {
                  if (index === 2 || index === 3) {
                    return (
                      <Droppable
                        droppableId={`droppable-formula-${index}`}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <img
                              className="formulaCard"
                              alt={`formula${index + 1}`}
                              id={`formula${index + 1}`}
                              // src="Formula.png"
                              value={card.value}
                              src={card.src}
                              draggable="true"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            />
                            {/* {provided.placeholder} */}
                          </>
                        )}
                      </Droppable>
                    );
                  } else {
                    return null;
                  }
                })}
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
                {this.state.formulaCards.map((card, index) => {
                  if (index === 4 || index === 5) {
                    return (
                      <Droppable
                        droppableId={`droppable-formula-${index}`}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <img
                              className="formulaCard"
                              alt={`formula${index + 1}`}
                              id={`formula${index + 1}`}
                              // src="Formula.png"
                              value={card.value}
                              src={card.src}
                              draggable="true"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            />
                            {/* {provided.placeholder} */}
                          </>
                        )}
                      </Droppable>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <Droppable droppableId="droppable-player2">
              {(provided, snapshot) => (
                <div
                  className="player2"
                  id="player2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  Player 2<br />
                  {this.state.player2Cards.map((card, index) => {
                    return (
                      <Draggable
                        draggableId={`draggable-player_2-${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <img
                            className={"card" + card.playerId}
                            src={card.src}
                            alt={"number" + card.value}
                            value={card.value}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {/* {provided.placeholder} */}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
