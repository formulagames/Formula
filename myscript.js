
//---------------------------------------------------------------------


var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var deck = new Array();
var players = [1, 2];
var currentPlayer = 1;
var player1Cards = null;
var cardsPlayed = 0;

function createDeck()
        {
            //creates a deck with each number 5 times
            deck = new Array();
            for (var j = 0 ; j < 5; j++)
            {
                for (var i = 0 ; i < values.length; i++)
                {
                
					var card = { Value: values[i] , 
						src: "Kaart"+values[i]+".png" };
					
                    deck.push(card);
                }
			}  
	}

		function shuffle()
        {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }

function startformula()
{
    if(document.getElementById('btnStart').value == "Start"){

		document.getElementById('btnStart').value = 'Restart';
	}

	else if (document.getElementById('btnStart').value == "Restart"){
		deleteCards();
	}
		
        // deal 7 cards to every player 
        currentPlayer = 1;
        createDeck();
        shuffle();
 		dealHands();
		document.getElementById('player' + (currentPlayer)).classList.add('active');
		updateCards();
		draggingCards();
		for (var i =1; i<7; i++) {
			var formulaC = document.getElementById("formula"+i);	
			formulaC.Value = 0;
			formulaC.src = "Formula.png";
			if(i == 2){
				var card = deck.pop();
				formula2.src = "Kaart"+card.Value+".png";
				formula2.Value = card.Value;
			}
			if(i == 4){
				var card = deck.pop();
				formula4.src = "Kaart"+card.Value+".png";
				formula4.Value = card.Value;
			}
		}
		storeCards();
}


var player1Cards = document.getElementsByClassName("cardplayer1");
var player2Cards = document.getElementsByClassName("cardplayer2");
var formulaCards = document.getElementsByClassName("formulaCard");
var tempCardsP1 = new Array();
var tempCardsP2 = new Array();
var tempCardsF = new Array();

// function to store cards
function storeCards()
{
	tempCardsP1 = [];
//console.log("player1Cards during storage = "+ player1Cards.length);
//console.log("player1Cards[6] during storage = "+ player1Cards[6].Value);
	updateCards();
	for (var i=0; i<player1Cards.length; i++){
		var temp = player1Cards[i];
		tempCardsP1.push(temp);
//console.log("tempCards during storage = "+ tempCardsP1[i].Value);
	}

	tempCardsP2 = [];
	updateCards();
	for (var j=0; j<player2Cards.length; j++){
		var temp = player2Cards[j];
		tempCardsP2.push(temp);
		
	}

	tempCardsF = [];
	updateCards();
	for (var k=0; k<formulaCards.length; k++){
		var temp = formulaCards[k];
		tempCardsF.push(temp);
console.log("tempCardsF = " + tempCardsF[k].src);
	}

}

// function to reset the stored cards
function resetCards()
{
	deleteCards();
	cardsPlayed = 0;

	for (var i=0; i<tempCardsP1.length; i++){
		renderCard(tempCardsP1[i], 1);
	}

	for (var j=0; j<tempCardsP2.length; j++){
		renderCard(tempCardsP2[j], 2);
	}

		var divNum1 = document.getElementById("num1");	
		var formulaReset0 = tempCardsF[0];
		var formulaReset1 = tempCardsF[1];
		divNum1.appendChild(formulaReset0);
		divNum1.appendChild(formulaReset1);

		var divNum2 = document.getElementById("num2");	
		var formulaReset2 = tempCardsF[2];
		var formulaReset3 = tempCardsF[3];
		divNum2.appendChild(formulaReset2);
		divNum2.appendChild(formulaReset3);

		var Answer = document.getElementById("answer");	
		var formulaReset4 = tempCardsF[4];
		var formulaReset5 = tempCardsF[5];
		Answer.appendChild(formulaReset4);
		Answer.appendChild(formulaReset5);


}

//deletes the player cards
function deleteCards()
{
//console.log(tempCards);
//console.log(tempCards.length);
	var numCards = player1Cards.length -1;
			
	for (var i = numCards; i >= 0; i--){
				
		player1Cards[i].parentNode.removeChild(player1Cards[i]);
	}

	var numCards = player2Cards.length -1;
			
	for (var j = numCards; j >= 0; j--){
				
		player2Cards[j].parentNode.removeChild(player2Cards[j]);
	}

	for (var k = 1; k<7; k++){
		var idName = "formula"+k;
		var formulaC = document.getElementById(idName);
		//formulaC.Value = 0;
		//formulaC.src = "Formula.png";
		formulaC.parentNode.removeChild(formulaC);
	}

}
		


function dealHands()
{
	// alternate handing cards to each player
	// 7 cards each
	for(var i = 0; i < 7; i++)
	{
		for (var x = 1; x <= players.length; x++)
		{
			var card = deck.pop();

			renderCard(card, x);
		}
	}
	
	updateCards();
	draggingCards();
}

function renderCard(card, player)
{
	//displays the cards image

	var playerId = "player"+player;
	var hand = document.getElementById(playerId);
	hand.appendChild(getCardUI(card, playerId));
	updateCards();
	draggingCards();
}

function getCardUI(card, playerId)
{
	//creates the card image
	var el = document.createElement('img');
								
	el.className = 'card' + playerId;
	el.src = "Kaart"+card.Value+".png";
	el.alt = "number "+card.Value;
	el.value = card.Value;
	el.setAttribute('draggable', true);
	return el;
}


function drawCard()
{
	// pop a card from the deck to the current player
	
	var card = deck.pop();
	renderCard(card, currentPlayer);
	changePlayer();
	
}            

function changePlayer()
{
	cardsPlayed = 0; // reset the number of cards played
	document.getElementById('player' + currentPlayer).classList.remove('active');
	if (currentPlayer == players.length){
		currentPlayer = 1;
		document.getElementById('player' + currentPlayer).classList.add('active');
	} else {
		currentPlayer ++;
		document.getElementById('player' + currentPlayer).classList.add('active');
	}
}

function check()
{
	storeCards();
// check if Formula is correct
// get the properties of the cards in a variable so we can check the equations
var formula1 = document.getElementById("formula1");
var formula2 = document.getElementById("formula2");
var formula3 = document.getElementById("formula3");
var formula4 = document.getElementById("formula4");
var formula5 = document.getElementById("formula5");
var formula6 = document.getElementById("formula6");

var formulaDigit1 = formula1.Value;
var formulaDigit2 = formula2.Value;
var formulaDigit3 = formula3.Value;
var formulaDigit4 = formula4.Value;
var formulaDigit5 = formula5.Value;
var formulaDigit6 = formula6.Value;
formulaDigit1 = formulaDigit1.toString();
formulaDigit2 = formulaDigit2.toString();
formulaDigit3 = formulaDigit3.toString();
formulaDigit4 = formulaDigit4.toString();
formulaDigit5 = formulaDigit5.toString();
formulaDigit6 = formulaDigit6.toString();

var num1 = parseFloat(formulaDigit1+formulaDigit2);
var num2 = parseFloat(formulaDigit3+formulaDigit4);
var num3 = parseFloat(formulaDigit5+formulaDigit6);

if(operator == null){
	alert("You forgot to select an operator. Please click an operator.")
} 
if (operator == "+"){
			if(num1 + num2 == num3) {
				changePlayer();
				alert("good job! "+num1 +" + " + num2 + " = " + num3 + ". It is now the turn of player "+(parseFloat(currentPlayer)));
				cardsPlayed = 0;
				storeCards();
//console.log(tempCardsP1.length);
//console.log(cardsP1.length);
				
			} 
			else {
				alert(num1+"+"+num2+" does not equal " + num3);
			}
	} else if (operator == "-"){			
		if(num1 - num2 == num3) {
				changePlayer();
				alert("good job! "+num1 +" - " + num2 + " = " + num3 + ". It is now the turn of player "+(parseFloat(currentPlayer)));
				cardsPlayed = 0;
				storeCards();
		} 
			else {
				alert(num1+"-"+num2+" does not equal " + num3);
			}
	} else if (operator == "/"){			
			if(num1 / num2 == num3) {
					changePlayer();
					alert("good job! "+num1 +" / " + num2 + " = " + num3 + ". It is now the turn of player "+(parseFloat(currentPlayer)));
					cardsPlayed = 0;
					storeCards();
			} 
				else {
					alert(num1+"/"+num2+" does not equal " + num3);
				} 
	} else if (operator == "*"){			
				if(num1 * num2 == num3) {
						changePlayer();
						alert("good job! "+num1 +" * " + num2 + " = " + num3 + ". It is now the turn of player "+(parseFloat(currentPlayer)));
						cardsPlayed = 0;
						storeCards();
				} 
					else {
						alert(num1+"*"+num2+" does not equal " + num3);
					}
	} 
}

window.addEventListener('load', function()
{
	createDeck();
	shuffle();
	updateCards();
	draggingCards();
	
});


// this section lets you click on an operator to use in the equation

var formulaOperators = document.getElementsByClassName("formulaOperator");
var formulaPlus = document.getElementById("formulaPlus");
var formulaMinus = document.getElementById("formulaMinus");
var formulaKeer = document.getElementById("formulaKeer");
var formulaDiv = document.getElementById("formulaDiv");
var operator = null;


formulaPlus.addEventListener("click", function(){
	resetOperator();
	operator = "+";
	formulaPlus.classList.add('operatorSelect');
})

formulaMinus.addEventListener("click", function(){
	resetOperator();
	operator = "-";
	formulaMinus.classList.add('operatorSelect');
})

formulaKeer.addEventListener("click", function(){
	resetOperator();
	operator = "*";
	formulaKeer.classList.add('operatorSelect');
})

formulaDiv.addEventListener("click", function(){
	resetOperator();
	operator = "/";
	formulaDiv.classList.add('operatorSelect');
})


var resetOperator = function() {
	for (i=0; i < formulaOperators.length;i++){
		var item = formulaOperators[i];
		item.classList.remove('operatorSelect');
	}
}


// Below is code enabling the dragging of cards to the Formula section [there are errors in the console, but it works...]
var cardsP1 = document.querySelectorAll('.cardplayer1');
var cardsP2 = document.querySelectorAll('.cardplayer2');
var formulaC = document.querySelectorAll('.formulaCard');

updateFCards = function()
{
	formulaC = document.querySelectorAll('.formulaCard');
	formulaCards = document.getElementsByClassName("formulaCard");
}

var updateCards = function() {
	cardsP1 = document.querySelectorAll('.cardplayer1');
	cardsP2 = document.querySelectorAll('.cardplayer2');
	
	player1Cards = document.getElementsByClassName("cardplayer1");
	player2Cards = document.getElementsByClassName("cardplayer2");
	

	for (var i = 0; i<player1Cards.length;i++){
		item = player1Cards[i];
		if(item.style.display == "none"){
//			console.log("during updateCards " +item.Value);
			item.parentNode.removeChild(item);
		}
		else{
//			console.log("during updateCards nothing" + item.Value);
		}
	}

	for (var j = 0; j<player2Cards.length;j++){
		item = player2Cards[j];
		if(item.style.display == "none"){
			item.parentNode.removeChild(item);
		}
	}

} 

let draggedItem = null;
let previousDraggedItem = null;
let copyDraggedItem = null;
		
var dropped = false;
var isDraggedSameAsDropped = true;

var draggingCards = function(){

	for (let i = 0; i < cardsP1.length; i++) {
		
		const item = cardsP1[i];
		
		//add the value to the item
		var txt = item.src;
		var numb = txt.match(/\d/g); //gets rid of all the characters apart from the numbers 
		numb = numb.join("") %10; //returns the last digit which equals the value of the card
		item.Value = numb;
		
		// dragging formula's
		item.addEventListener('dragstart', function () {
			draggedItem = item;
console.log("start tempCardsF[5]" + tempCardsF[5].src);
			setTimeout(function () {
				item.style.display = 'none';
			}, 0)
		});

		item.addEventListener('dragend', function () {
//			console.log("dragend")
			setTimeout(function () {
				draggedItem.style.display = 'block';
				draggedItem = null;

			}, 0);
		})

		for (let k = 0; k < formulaC.length; k++) {
			const formulaCard = formulaC[k];

			formulaCard.addEventListener('dragover', function (e) {
				e.preventDefault();
//				console.log("dragover")
			});

			formulaCard.addEventListener('dragenter', function (e) {
				e.preventDefault();
				this.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
//				console.log("dragenter")
			});

			formulaCard.addEventListener('dragleave', function (e) {
				this.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
//				console.log("dragleave")
			});

			formulaCard.addEventListener('drop', function (e) {
				if(this === draggedItem){
					isDraggedSameAsDropped = false;
				}

console.log("drop tempCardsF[5]" + tempCardsF[5].Value);

				this.src = draggedItem.src;
				this.Value = draggedItem.Value;
				draggedItem = null;
				this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
				dropped = true;
				cardsPlayed++;
				
			});

		}
	}

	for (let i = 0; i < cardsP2.length; i++) {
		
		const item = cardsP2[i];
		
		//add the value to the item
		var txt = item.src;
		var numb = txt.match(/\d/g);
		numb = numb.join("") %10;
		item.Value = numb;
		
		// dragging formula's
		item.addEventListener('dragstart', function () {
			draggedItem = item;
			setTimeout(function () {
				item.style.display = 'none';
			}, 0)
		});

		item.addEventListener('dragend', function () {
//			console.log("dragend")
			setTimeout(function () {
				draggedItem.style.display = 'block';
				draggedItem = null;
			}, 0);
		})

		for (let k = 0; k < formulaC.length; k++) {
			const formulaCard = formulaC[k];

			formulaCard.addEventListener('dragover', function (e) {
				e.preventDefault();
//				console.log("dragover")
			});

			formulaCard.addEventListener('dragenter', function (e) {
				e.preventDefault();
				this.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
//				console.log("dragenter")
			});

			formulaCard.addEventListener('dragleave', function (e) {
				this.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
//				console.log("dragleave")
			});

			formulaCard.addEventListener('drop', function (e) {
				if(this === draggedItem){
					isDraggedSameAsDropped = false;
				}
console.log("drop " + tempCardsF[5].Value);
//				console.log(draggedItem.src);
				this.src = draggedItem.src;
				this.Value = draggedItem.Value;
				draggedItem = null;
				this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
				dropped = true;
				cardsPlayed++;
			});

		}
	}



	for (let i = 0; i < formulaC.length; i++) {

		const item = formulaC[i];

		item.addEventListener('dragstart', function () {
			dropped = false;
			isDraggedSameAsDropped = true;
			draggedItem = item;
			setTimeout(function () {
			}, 0)
		});

		item.addEventListener('dragend', function () {
			if(dropped && isDraggedSameAsDropped){
				item.src = "Formula.png";
				item.Value = 0;
			}
			setTimeout(function () {
				draggedItem = null;
			}, 0);
		})

	}
}