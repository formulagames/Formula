This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Have node.js installed

## Available Scripts

In the project directory, you can run:

### `npm i`

This creates the folder node_modules in the directory after this you can run the following commands.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

I am the creator and publisher of the board game Formula.

In the Corona time I decided to start learning some coding myself to be able to make a website where the game Formula can be played.
I learned Javascript and the basics of HTML/CSS through Khan Academy. I also watched tons of youtube movies.

I came up with the code in this project, but now I'm stuck.

This works well:
- Start
- Creating the deck
- Deal 7 cards to each player (random cards)
- Open 2 cards 
- Check whether the equation is correct
- Switch players
- Restart
- Draw a card

This does not work well:
- Reset to beginning of turn. If you dragged a card to the "formula" section and you believe you made a mistake and want to 
  take the card back, you can click the "reset" button. However, when you click this button, the card does go back in your hand, 
  but unfortunately, also stays in the "formula" section. This should not happen, but I do not know why this.

- There are many errors in the Console when dragging. However, it worked, so I left it.

Still to be done:
- Play a maximum of 3 cards during your turn
- You cannot use cards from the other player when it is not your turn
- When you laid down your last card, you won. Make something nice for this
- Add 2 jokers to the deck
- Instead of the "Alerts" have a text field with the information of the alerts.
- Possibility to play against the computer.

When this is done, make a website/app that you can play against each other online.
Create a story line (levels, tournaments, rankings) and add possibility to play with 3, 4 or 5 players.
Add expansion pack (cards with fractions, negative numbers etc.)

Check out video instruction movies of Formula on www.formulagames.eu
