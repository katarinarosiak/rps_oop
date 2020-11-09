const readline = require('readline-sync');

const RPSGame = {
  player1: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome');
  },

  displayGoodbyeMessage() {
    console.log('Thank you for playing! See you next time!');
  },

  displayWinner() {
    let humanMove = this.player1.move;
    let computerMove = this.computer.move;

    console.log(`You have chosen ${this.player1.move}`);
    console.log(`Computer has chosen ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
      this.player1.points++;
      console.log(`You win this round! You have ${this.player1.points} points. Compters has ${this.computer.points} points.`);
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'rock')) {
      this.computer.points++;
      console.log(`Computer wins this round! You have ${this.player1.points} points. Compters has ${this.computer.points} points.`);
    } else {
      console.log("it's a tie!");
    }
  },
  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.player1.choose();
      this.computer.choose();
      this.displayWinner();

      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose() {
      const CHOICES = ['rock', 'paper', 'scissors'];
      let randomChoice = Math.floor(Math.random() * CHOICES.length);
      this.move = CHOICES[randomChoice];
    }
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {

    choose() {
      let choice;

      while (true) {
        console.log('Choose rock, paper or scissors');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('sorry, this is invalid choice.');
      }
      this.move = choice;
    }
  };
  return Object.assign(playerObject, humanObject);
}

function createPlayer() {
  return {
    move: null,
    points: 0
  };
}

RPSGame.play();