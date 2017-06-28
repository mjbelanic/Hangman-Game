// NEED TO IMPLEMENT:
// css styling (review)
// Handle capital letters
// Get all pictures and descriptions


//Word objects
function Word(nameValue, img, descr, hintValue){
	this.name = nameValue;
	this.image = img;
	this.description = descr;
	this.hint = hintValue;
};

// Word  objects
var Eiffel_Tower = new Word("Eiffel Tower", "assets/images/EiffelTower.jpg", "", "Paris, France");
var Big_Ben = new Word("Big Ben", "assets/images/BigBen.jpg", "", "London, England");
var Leaning_Tower_of_Pisa = new Word("Leaning Tower of Pisa", "assets/images/LeaningTower.jpg", "","Tuscany, Italy");
var Pyramids_of_Giza = new Word("Pyramids of Giza", "assets/images/GizaPyramids.jpg", "", "Ancient Egypt");
var Lighthouse_Alexandria = new Word("Lighthouse of Alexandria", "assets/images/LighthouseAlexandria.png", "","Ancient Egypt");
var HagiaSophia = new Word("Hagia Sophia", "assets/images/HagiaSophia.jpg", "" ,"Istanbul, Turkey");
var GreatWall = new Word("Great Wall of China", "assets/images/GreatWall.jpg" ,"" ,"China");
var PorcelainTower = new Word("Porcelain Tower of Nanjing" , "assets/images/PorcelainTower.jpg" , "" , "Nanjing, China");
var Petra = new Word("Petra" , "assets/images/Petra.jpg" , "", "Ma'an Governorate, Jordan");
var ChichenItza = new Word("Chichen Itza" , "assets/images/ChichenItza.jpg", "",  "Yucatan, Mexico");
var MachuPicchu = new Word("Machu Picchu" , "assets/images/MachuPicchu.jpg", "", "Cuzco Region, Peru");
var HimejiCastle = new Word("Himeji Castle", "assets/images/HimejiCastle.jpg", "", "Hyogo, Japan");

//Word arrays
var easyWords = [Eiffel_Tower , Big_Ben, Leaning_Tower_of_Pisa, Pyramids_of_Giza, Lighthouse_Alexandria];
var hardWords = [HagiaSophia, GreatWall, PorcelainTower, Petra, ChichenItza, MachuPicchu, HimejiCastle];

var HangmanObject = {
	//Needed values
	wordChoice: null,
	hiddenWord : [],
	guessedLetters: [],
	guessLimit: null,
	resetButton: document.getElementById("resetButton"),
	hintButton: document.getElementById("hintBtn"),
	hintText: document.getElementById("hintText"),
	
	//Gets word from array and hides it
	StartGame: function(wordArray){
		//Set variables
		this.guessLimit = 6;
		this.guessedLetters = []; 
		this.resetButton.style.display = "none";
		this.hiddenWord = [];
		this.hintButton.style.display = "inline";
		this.hintText.innerHTML ="";
		
		document.getElementById("wordChecker").disabled = false;

		//Get Random word and hide it.
		document.getElementById("usedLetters").innerHTML = this.guessedLetters;
		this.wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];
		for (var i = 0 ; i < this.wordChoice.name.length ; i++) {
			if(this.wordChoice.name[i] !== " "){
				this.hiddenWord[i] = "_";
			}else{
				this.hiddenWord[i] = "&nbsp; &nbsp;";
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
		var regex = /^[a-zA-Z]{1}$/;
		if(regex.test(letter)){
			if(this.guessedLetters.includes(letter)){
				document.getElementById("wrongLetter").innerHTML = "You have already picked this letter."
				document.getElementById("letterChoice").value ="";
			//good char in word
			}else{	
				this.guessedLetters.push(letter);
				document.getElementById("usedLetters").innerHTML = this.guessedLetters;
				if(this.wordChoice.name.includes(letter)){
					for (var j = this.wordChoice.name.length - 1; j >= 0; j--){
						if(this.wordChoice.name[j] === letter){
							this.hiddenWord[j] = letter;
							document.getElementById("wordPlace").innerHTML = this.hiddenWord.join(" ");
							document.getElementById("wrongLetter").innerHTML = "";
							document.getElementById("letterChoice").value = "";
						}
					}
				//good char not in work
				}else{
					this.guessLimit -= 1;
					document.getElementById("wrongLetter").innerHTML = letter + " was not present in word.";
					document.getElementById("letterChoice").value = "";
				}
			}
		// bad char
		}else{
			document.getElementById("wrongLetter").innerHTML = "You have not entered an appropriate character."
			document.getElementById("letterChoice").value = "";
		}
		var gameOver = this.CheckForWin();
		if(gameOver){
			this.resetButton.style.display = "block";
			this.hintButton.style.display = "none";
			this.hintText.innerHTML = "";
			document.getElementById("wordChecker").disabled = true;
		}
	},


	ResetGame: function(){
		var hardMode = confirm("Would you like to play hard mode?")
		if(hardMode){
			var explanation = document.getElementById("outcomeWin")
			explanation.style.display = "none";
			var explanation2 = document.getElementById("outcomeLose");
			explanation2.style.display = "none"
			this.StartGame(hardWords);
		}else{
			var explanation = document.getElementById("outcomeWin")
			explanation.style.display = "none";
			var explanation2 = document.getElementById("outcomeLose");
			explanation2.style.display = "none"
			this.StartGame(easyWords);
		}
	},


	DropHint: function(){
		this.hintButton.style.display = "none";
		this.hintText.innerHTML = "This structure is located in: " + this.wordChoice.hint;
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