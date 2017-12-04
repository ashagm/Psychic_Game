







//game object

var psychicGame =  {
	characters : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
	wins : 0,
	losses : 0,
	chances : 9,
	guesses : [],

	pickRandomCharacter: function(){
		return this.characters[Math.floor(Math.random() * this.characters.length)];	
	},

	updateWins: function(){
		getEl('wins').innerHTML = ++this.wins;
	},

	updateLosses: function(){
		getEl('losses').innerHTML = ++this.losses;
	},

	updateChancesLeft: function(){
		getEl('chances').innerHTML = --this.chances;
	},

	updateGuesses: function(char){
		this.guesses.push(char);
		getEl('guesses').innerHTML = this.guesses ;
		console.log(this.guesses);
	},

	updateStatus: function(status){
		getEl('status').innerHTML = status ;
		console.log(status);
	},

	resetGame: function(){
		console.log("resetting game.....");
		this.guesses = [];
		this.chances = 9;
		getEl('chances').innerHTML = this.chances;
		getEl('guesses').innerHTML = this.guesses ;
		getEl('status').innerHTML = "Play again!";
		console.log("In psychicGame.resetGame()," + 'wins=', this.wins, 'losses=',this.losses, 'guesses=',this.guesses, 'chances=',this.chances);				
	},

	beginGame: function(){
		console.log("In psychicGame.beginGame(), ...pick a character");
		return this.pickRandomCharacter();
	}
}

var computerPick;

function startGame(){
	console.log("Game begins....");
	computerPick = psychicGame.beginGame();
	console.log("computerPick =", computerPick)
}

function getEl(idName){
	return document.getElementById(idName);
}

document.onkeyup = function(event){
	console.log("you typed", (event.key).toLowerCase());

	var userPick = (event.key).toLowerCase();
		
		if(userPick === computerPick){
			psychicGame.updateWins();
			psychicGame.updateStatus('You win! Play again!');
			psychicGame.resetGame();
			startGame();
		}else if(psychicGame.chances >= 0 && userPick != computerPick){
			psychicGame.updateChancesLeft();
			psychicGame.updateGuesses(userPick);
			psychicGame.updateStatus('Wrong! Guess again!');

			if(psychicGame.chances == 0 ){
				psychicGame.updateLosses();
				psychicGame.resetGame();
				startGame();
			}
		}
}


//Begin Game
window.onload = function(){
	startGame();
}

