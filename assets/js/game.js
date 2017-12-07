//game object

var computerPick ;

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
		// console.log(this.guesses);
	},

	updateStatus: function(status, txtColor){
		getEl('status').innerHTML = status ;
		getEl('status').style.color = txtColor;	
		// console.log('updateStatus', status, txtColor);	
	},

	resetGame: function(){
		console.log("resetting game.....");
		this.guesses = [];
		this.chances = 9;
		getEl('chances').innerHTML = this.chances;
		getEl('guesses').innerHTML = this.guesses ;

		this.resetStatus();
		// console.log('wins=', this.wins, 'losses=',this.losses, 'guesses=',this.guesses, 'chances=',this.chances);				
	},

	resetStatus: function(){
		setTimeout('getEl("status").innerHTML = \"Guess a letter between (a-z)!\"', 2000);
		setTimeout('getEl("status").style.color= \"yellow\"', 2000);
	},

	beginGame: function(){
		// console.log("Begin game...pick a character");
		return this.pickRandomCharacter();
	}
}


var computerPick;

function init(){
	console.log("initializing new game....init()");
	computerPick = psychicGame.beginGame();
	console.log("computerPick = ", computerPick)
}

function getEl(id){
	return document.getElementById(id);
}

window.addEventListener('keyup', function(event) {

	let userPick = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("You typed - ", (event.key).toLowerCase());
		
		if(userPick === computerPick){
			psychicGame.updateWins();
			psychicGame.resetGame();
			psychicGame.updateStatus('You win! Play again!', 'green');
			init();
		}else if(psychicGame.chances >= 0 && userPick != computerPick){
			psychicGame.updateChancesLeft();
			psychicGame.updateGuesses(userPick);
			psychicGame.updateStatus('Wrong! Guess again!', 'red');

			if(psychicGame.chances == 0 ){
				psychicGame.updateLosses();
				psychicGame.resetGame();
				init();
			}
		}
});


//Begin Game

init();