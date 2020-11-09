const readline = require('readline-sync');

const RPSGame = {
  player1: createHuman(),
  computer: createComputer(),
  round: 1,

  displayWelcomeMessage() {
    console.log('Welcome');
  },

  displayGoodbyeMessage() {
    console.log('Thank you for playing! See you next time!');
  },

  displayRoundWinner() {
    let winner = "It's a tie";
    let humanMove = this.player1.move;
    let computerMove = this.computer.move;
    console.log(`You have chosen ${this.player1.move}. Computer has chosen ${this.computer.move}`);
    if (humanMove === computerMove) {
      winner = "It's a tie";
    } else if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper') ||
      (humanMove === 'rock' && computerMove === 'lizard') ||
      (humanMove === 'lizard' && computerMove === 'spock') ||
      (humanMove === 'lizard' && computerMove === 'paper') ||
      (humanMove === 'spock' && computerMove === 'rock') ||
      (humanMove === 'spock' && computerMove === 'scissors')) {
      this.player1.points++;
      winner = "You win this round!";
    } else {
      this.computer.points++;
      winner = "Computer wins this round!";
    }
    console.log(`${winner}. You have ${this.player1.points} points. Computer has ${this.computer.points} points.`);
  },
  displayRound() {
    console.log(`Round ${this.round}`);
  },
  displayWinner() {
    let winner = "It's a tie";
    if (this.player1.points > this.computer.points) {
      winner = "You win the game!";
    } else if (this.player1.points < this.computer.points) {
      winner = "Computer wins this game!";
    }
    console.log(`You have ${this.player1.points} points, computer has ${this.player1.points} points. ${winner}`);
  },
  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      while (this.round <= 5) {
        this.displayRound();
        this.player1.choose();
        this.computer.choose();
        this.displayRoundWinner();
        this.round++;
      }
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
      const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
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
      let options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

      while (true) {
        console.log(`Choose ${options.slice(0, options.length - 1).join(' ')} or ${options.slice(-1).join(' ')}`);
        choice = readline.question();
        if (options.includes(choice)) break;
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