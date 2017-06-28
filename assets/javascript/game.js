// NEED TO IMPLEMENT:
// add sound


//Word object constructor
function Word(nameValue, img, descr, hintValue){
	this.name = nameValue;
	this.image = img;
	this.description = descr;
	this.hint = hintValue;
};

// Word  objects
var Eiffel_Tower = new Word("Eiffel Tower", "assets/images/EiffelTower.jpg", "https://en.wikipedia.org/wiki/Eiffel_Tower", "Paris, France");
var Big_Ben = new Word("Big Ben", "assets/images/BigBen.jpg", "https://en.wikipedia.org/wiki/Big_Ben", "London, England");
var Leaning_Tower_of_Pisa = new Word("Leaning Tower of Pisa", "assets/images/LeaningTower.jpg", "https://en.wikipedia.org/wiki/Leaning_Tower_of_Pisa","Tuscany, Italy");
var Pyramids_of_Giza = new Word("Pyramids of Giza", "assets/images/GizaPyramids.jpg", "https://en.wikipedia.org/wiki/Giza_pyramid_complex", "Ancient Egypt");
var Lighthouse_Alexandria = new Word("Pharos of Alexandria", "assets/images/LighthouseAlexandria.png", "https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria","Ancient Egypt");
var HagiaSophia = new Word("Hagia Sophia", "assets/images/HagiaSophia.jpg", "https://en.wikipedia.org/wiki/Hagia_Sophia" ,"Istanbul, Turkey");
var GreatWall = new Word("Great Wall of China", "assets/images/GreatWall.jpg" ,"https://en.wikipedia.org/wiki/Great_Wall_of_China" ,"China");
var PorcelainTower = new Word("Porcelain Tower of Nanjing" , "assets/images/PorcelainTower.jpg" , "https://en.wikipedia.org/wiki/Porcelain_Tower_of_Nanjing" , "Nanjing, China");
var Petra = new Word("Petra" , "assets/images/Petra.jpg" , "https://en.wikipedia.org/wiki/Petra", "Ma'an Governorate, Jordan");
var ChichenItza = new Word("Chichen Itza" , "assets/images/ChichenItza.jpg", "https://en.wikipedia.org/wiki/Chichen_Itza",  "Yucatan, Mexico");
var MachuPicchu = new Word("Machu Picchu" , "assets/images/MacchuPicchu.jpg" , "https://en.wikipedia.org/wiki/Machu_Picchu", "Cuzco Region, Peru");
var HimejiCastle = new Word("Himeji Castle", "assets/images/HimejiCastle.jpg", "https://en.wikipedia.org/wiki/Himeji_Castle", "Hyogo, Japan");
var OperaHouse = new Word("Sydney Opera House", "assets/images/OperaHouse.jpg" , "https://en.wikipedia.org/wiki/Sydney_Opera_House", "the most populated city in Australia")
var BurjKhalifa = new Word("Burj Khalifa", "assets/images/Burj_Khalifa.jpg" , "https://en.wikipedia.org/wiki/Burj_Khalifa", "Dubai, United Arab Emirates")
var EmpireStateBuilding = new Word("Empire State Building" , "assets/images/EmpireStateBuilding.jpg" , "https://en.wikipedia.org/wiki/Empire_State_Building", "New York, USA")
var GermanCastle = new Word("Neuschwanstein Castle" , "assets/images/GermanCastle.jpg" , "https://en.wikipedia.org/wiki/Neuschwanstein_Castle" , "Bavaria, Germany");
var CNTower = new Word("CN Tower", "assets/images/CNTower.jpg" , "https://en.wikipedia.org/wiki/CN_Tower", "Toronto, Canada");
var GoldenGate = new Word("The Golden Gate Bridge" , "assets/images/GoldenGateBridge.jpg", "https://en.wikipedia.org/wiki/Golden_Gate_Bridge", "San Francisco, USA")
var Alhambra = new Word("Alhambra","assets/images/Alhambra.jpg","https://en.wikipedia.org/wiki/Alhambra","Granada, Spain");
var Venice = new Word("Piazza San Marco", "assets/images/Venice.JPG" , "https://en.wikipedia.org/wiki/Piazza_San_Marco", "Venice, Italy");
var Louvre = new Word("The Louvre", "assets/images/Louvre.jpg" , "https://en.wikipedia.org/wiki/Louvre" , "Paris, France");

//Word arrays
var easyWords = [Eiffel_Tower, CNTower, Big_Ben, Leaning_Tower_of_Pisa, Pyramids_of_Giza, OperaHouse ,Lighthouse_Alexandria, EmpireStateBuilding, Alhambra, GoldenGate];
var hardWords = [HagiaSophia, GreatWall, PorcelainTower, Petra, ChichenItza, MachuPicchu, HimejiCastle, BurjKhalifa, GermanCastle, Louvre, Venice];

//Hangman Object- handles game logic
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
		this.hintButton.style.display = "block";
		this.hintText.innerHTML ="";
		
		document.getElementById("wordChecker").disabled = false;
		document.getElementById("guesses").innerHTML = this.guessLimit;
		//Get Random word and hide it.
		document.getElementById("usedLetters").innerHTML = this.guessedLetters;
		document.getElementById("wrongLetter").innerHTML = "";
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
		var imageLink = document.getElementById(param5)
		imageLink.href = this.wordChoice.description;
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
		var upperCaseLetter = document.getElementById("letterChoice").value.toUpperCase();
		var regex = /^[a-z]{1}$/;
		if(regex.test(letter)){
			if(this.guessedLetters.includes(letter)){
				document.getElementById("wrongLetter").innerHTML = "You have already picked this letter."
				document.getElementById("letterChoice").value ="";
			//good char in word
			}else{	
				this.guessedLetters.push(letter);
				document.getElementById("usedLetters").innerHTML = this.guessedLetters;
				if(this.wordChoice.name.includes(letter)  || this.wordChoice.name.includes(upperCaseLetter)){
					for (var j = this.wordChoice.name.length - 1; j >= 0; j--){
						if(this.wordChoice.name[j] === letter){
							this.hiddenWord[j] = letter;
							document.getElementById("wordPlace").innerHTML = this.hiddenWord.join(" ");
							document.getElementById("wrongLetter").innerHTML = "";
							document.getElementById("letterChoice").value = "";
						}else if(this.wordChoice.name[j] === upperCaseLetter){
							this.hiddenWord[j] = upperCaseLetter;
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
			document.getElementById("wrongLetter").innerHTML = "You have not entered an appropriate character. (Note: Only lower case characters work.)"
			document.getElementById("letterChoice").value = "";
		}
		var gameOver = this.CheckForWin();
		document.getElementById("guesses").innerHTML = this.guessLimit;
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
			document.getElementById("ansHeader").innerHTML = "Previous Answer";
			this.StartGame(hardWords);
		}else{
			var explanation = document.getElementById("outcomeWin")
			explanation.style.display = "none";
			var explanation2 = document.getElementById("outcomeLose");
			explanation2.style.display = "none"
			document.getElementById("ansHeader").innerHTML = "Previous Answer";
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