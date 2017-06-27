// NEED TO IMPLEMENT:
// Game Restart
// Hints
// Img getter and setter



//Word arrays
// var easyWords = ["word", "thanks" , "computer" , "class", "Mississippi", Placeholder];



//Word objects
function Word(nameValue, img, descr, hintValue){
	this.name = nameValue;
	this.image = img;
	this.description = descr;
	this.hint = hintValue;
};

// var Placeholder = new Word("Placeholder" , "assets/images/EiffelTower.jpg", "This is a placeholder", "You added this to test");
var Eiffel_Tower = new Word("Eiffel Tower", "assets/images/EiffelTower.jpg", "Paris, France", "Currently located in Paris");
var Big_Ben = new Word("Big Ben", "assets/images/BigBen.jpg", "London, England" , "Famous Clock");
var Berlin_Wall = new Word("Berlin Wall", null, "Berlin, Germany" , "Wall in Germany");
var Leaning_Tower_of_Pisa = new Word("Leaning Tower of Pisa", "assets/images/LeaningTower.jpg", "Pisa, Italy", "A Crooked Tower")
var hardWords = [Eiffel_Tower , Big_Ben, Berlin_Wall, Leaning_Tower_of_Pisa];

var HangmanObject = {
	//Needed values
	wordChoice: null,
	hiddenWord : [],
	guessedLetters: [],
	guessLimit: null,
	resetButton: document.getElementById("resetButton"),
	
	//Gets word from array and hides it
	StartGame: function(wordArray){
		//Set variables
		this.guessLimit = 6;
		this.guessedLetters = []; 
		this.resetButton.style.display = "none";
		this.hiddenWord = [];
		document.getElementById("wordChecker").disabled = false;

		document.getElementById("usedLetters").innerHTML = this.guessedLetters;
		this.wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];
		for (var i = 0 ; i < this.wordChoice.name.length ; i++) {
			if(this.wordChoice.name[i] !== " "){
				this.hiddenWord[i] = "_";
			}
		}
		document.getElementById("wordPlace").innerHTML = this.hiddenWord.join(" ");
	},

	UpdateAnsDiv: function(param1, param2, param3, param4, param5){
		document.getElementById(param1).innerHTML = "Answer";
		var explanation = document.getElementById(param2)
		explanation.style.display = "block";
		document.getElementById(param3).innerHTML = this.wordChoice.name;
		var imageSrc = document.getElementById(param4);
		imageSrc.src = this.wordChoice.image;
		imageSrc.style.display = "block";
		document.getElementById(param5).innerHTML = this.wordChoice.description;
		this.resetButton.style.display = "block";

	},

	//Checks if player has won the game
	CheckForWin: function(){
		var winScore = parseInt(document.getElementById("numWin").innerHTML);
		var loseScore = parseInt(document.getElementById("numLose").innerHTML);
		//If there are no hidden spaces remaining players wins, else loses
		if(!this.hiddenWord.includes("_")){
			winScore += 1;
			document.getElementById("numWin").innerHTML = winScore;
			this.UpdateAnsDiv("ansHeader", "outcomeWin", "wordAns" , "ansImg", "ansDescription");
			return true;
		}else{
			if(this.guessLimit === 0){
				console.log("Game Over");
				loseScore += 1;
				document.getElementById("numLose").innerHTML = loseScore;
				this.UpdateAnsDiv("ansHeader", "outcomeLose", "wordAns" , "ansImg", "ansDescription");
				return	true;
			}else{
				return false;
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
			if(this.wordChoice.name.includes(letter)){
				for (var j = this.wordChoice.name.length - 1; j >= 0; j--) {
					if(this.wordChoice.name[j] === letter){
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
		var gameOver = this.CheckForWin();
		if(gameOver){
			this.resetButton.style.display = "block";
			document.getElementById("wordChecker").disabled = true;
		}
	},


	ResetGame: function(){
		var hardMode = confirm("Would you like to play hard mode?")
		if(hardMode){
			var explanation = document.getElementById("outcomeWin")
			explanation.style.display = "none";
			var explanation2 = document.getElementById("outcomeLose");
			explanation.style.display = "none"
			this.StartGame(hardWords);
		}else{
			var explanation = document.getElementById("outcomeWin")
			explanation.style.display = "none";
			var explanation2 = document.getElementById("outcomeLose");
			explanation.style.display = "none"
			this.StartGame(easyWords);
		}
	}
};

//Menu
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