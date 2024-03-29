//contants
const livesFile = "assets/heart.png";
const livesClass = "lives";
const livesId = "lives";
const lifeClass = "life";
const lifeId = "life";
const livesNumber = 10;
const backgroundFile = "assets/background.png";
const cardsClass = "cards";
const cardsId = "cards";
const cardsNumber = 12;
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//"global" variables
var card1, card2, count=0, attempts=0, lives=10, pairs=0, id2;
count = parseInt(count);
attempts = parseInt(attempts);
lives = parseInt(lives);
pairs = parseInt(pairs);

window.onload = function initializeGameBoard(){
    setLives();
    cardsArray = numbersArray;
    randomizeCardPositions(cardsArray);
    setCards(cardsArray);
}

function setLives(){
    //creates and positions the lives images on the screen
    for(i=0; i<livesNumber; i++){
        var life = document.createElement("img");
        life.src = livesFile;
        life.id = lifeId+String(i);
        life.className = lifeClass;
        document.getElementById(livesId).appendChild(life);
    }
}

function setCards(cardsArray){
    for(i=0; i<cardsNumber; i++){
        value = cardsArray[i];
        halfCards =  cardsNumber/2;

        card = document.createElement("img");
        card.src = backgroundFile;

        card.className = value <= halfCards
            ? String(value)
            : String(value-halfCards)
        ;

        card.id = value <= halfCards
            ? String(value)
            : String(value-halfCards)+"2"
        ;

        document.getElementById(cardsId).appendChild(card);
    }
}

function randomizeCardPositions(cardsArray) {
    for (i=cardsArray.length-1; i>0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
}

//click event (captures the clicks on the cards)
document.addEventListener ('click', function (event){
    event.preventDefault();

    //get the class and id
    var classe = event.target.className;
    var id = event.target.id;

    //checks if the click happened within the are of one of the cards
    if (parseInt(classe)>=1 && parseInt(classe)<=cardsNumber/2 && id!=id2){
        //counter to check if it's the first or second card of the round
        count++;

        if (count==1){
            //first card of the round
            card1 = classe;
            id2 = id;
            document.getElementById(id).src= "assets/"+classe+".png";
        }else if(count==2){
            //second card of the round
            card2 = classe;
            document.getElementById(id).src = "assets/"+classe+".png";
            finishRound(id);
        }
    }
});

//function to do necessary operations at the end of each round
function finishRound(id){
    count = 0;

    //changes the number os attempts
    attempts++;
    document.getElementById("attempts-number").innerHTML = attempts;

    //opens the check function
    checkCards(id);
}

//check function (checks if the two cards turned up are the same)
function checkCards(id){
    if(card1 == card2){
        //if the round pair is correct, open the function to increase the correct pairs number
        increaseCorrectPairs();
    }else{
        //if the round pair is wrong, make the cards face down again
        setTimeout(function(){
            document.getElementById(id).src="assets/background.png";
            document.getElementById(id2).src="assets/background.png";
        }, 750);
        //and open the function to reduce the number of lives
        reduceLives();
    }
}

//function to increase the number of correct pairs
function increaseCorrectPairs(){
    pairs++;

    if (pairs==6){
        //if the 6 pairs are facing up
        document.getElementById("end-game").innerText = "YOU WIN!";
        document.getElementById("end-game").style.color = "green";
        document.getElementById("end-game").style.border = "thick dashed green";
    }
}

//function to count lives (tests the number of lives and reduces the hearts)
function reduceLives(){
    lives--;

    document.getElementById(lifeId+String(lives)).style.display="none";

    if(lives==0){
        document.getElementById(lifeId+"0").style.display="none";
        //if the lives end
        document.getElementById("end-game").innerText = "GAME OVER!";
        document.getElementById("end-game").style.color = "red";
        document.getElementById("end-game").style.border = "thick dashed red";
    }
}
