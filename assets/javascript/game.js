// NEED TO IMPLEMENT:
// Game Restart

//Word Lists
var easyWords = ["word", "thanks" , "computer" , "class", "Mississippi"];
var hardWords = ["blizzard" , "jazz" , "crypt" , "bagpipes" , "banjo" , "beekeeper"];

//Menu


var HangmanObject = {
	//Needed values
	wordChoice: null,
	hiddenWord : [],
	guessedLetters: [],
	guessLimit: 6,
	
	//Gets word from array and hides it
	StartGame: function(wordArray){
		this.wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];
		for (var i = 0 ; i < this.wordChoice.length ; i++) {
			this.hiddenWord[i] = "_";
		}
		document.getElementById("wordPlace").innerHTML = this.hiddenWord.join(" ");
	},

	//Checks if player has won the game
	CheckForWin: function(){
		var winScore = parseInt(document.getElementById("numWin").innerHTML);
		var loseScore = parseInt(document.getElementById("numLose").innerHTML);
		//If there are no hidden spaces remaining players wins, else loses
		if(!this.hiddenWord.includes("_")){
			winScore += 1;
			document.getElementById("numWin").innerHTML = winScore;
			return true;
		}else{
			if(this.guessLimit === 0){
				console.log("Game Over");
				loseScore += 1;
				document.getElementById("numLose").innerHTML = loseScore;
			}
		}
	},


	// Guess
	checkLetter: function(){
		var letter = document.getElementById("letterChoice").value;
		document.getElementById("wrongLetter").innerHTML = "";
		if(letter.length > 1){
			document.getElementById("wrongLetter").innerHTML = "Please enter only 1 letter.";
			document.getElementById("letterChoice").value = "";
		}else if(letter.length <= 0){
			document.getElementById("wrongLetter").innerHTML = "You did not enter anything.";
		}else if(!isNaN(letter)){
			document.getElementById("wrongLetter").innerHTML = "You entered a number. Enter a letter."
			document.getElementById("letterChoice").value = "";
		}else if(this.guessedLetters.includes(letter)){
			document.getElementById("wrongLetter").innerHTML = "You have already picked this letter."
			document.getElementById("letterChoice").value ="";
		}else{	
			this.guessedLetters.push(letter);
			document.getElementById("usedLetters").innerHTML = this.guessedLetters;
			if(this.wordChoice.includes(letter)){
				for (var j = this.wordChoice.length - 1; j >= 0; j--) {
					if(this.wordChoice[j] === letter){
						this.hiddenWord[j] = letter;
						document.getElementById("wordPlace").innerHTML = this.hiddenWord.join(" ");
						document.getElementById("letterChoice").value = "";
					}
				}
			}else{
				this.guessLimit -= 1;
				document.getElementById("wrongLetter").innerHTML = letter + " was not present in word.";
				document.getElementById("letterChoice").value = "";
			}
		}
		this.CheckForWin();
	}
};


var menuAns = confirm("Would you like to play hangman?");
if(menuAns){
	var hardMode = confirm("Would you like to play hard mode?")
	if(hardMode){
		HangmanObject.StartGame(hardWords);
	}else{
		HangmanObject.StartGame(easyWords);
	}
}else{
	document.getElementById("wordChecker").disabled = true;
}