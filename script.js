//contants
const livesFile = "assets/heart.png";
const livesClass = "lives";
const lifeClass = "life";
const livesNumber = 10;

//"global" variables
var card1, card2, count=0, attempts=0, lives=10, pairs=0, id2;
count = parseInt(count);
attempts = parseInt(attempts);
lives = parseInt(lives);
pairs = parseInt(pairs);

window.onload = function initializeGameBoard(){
    setLives();
}

function setLives(){
    //creates and positions the lives images on the screen
    for(i=0; i<livesNumber; i++){
        var life = document.createElement("img");
        life.src = livesFile;
        life.id = String(i);
        life.className = lifeClass;
        document.getElementById(livesClass).appendChild(life);
    }
}

function setCards(){

}

function randomizeCardPositions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//click event (captures the clicks on the cards)
document.addEventListener ('click', function (event){
    event.preventDefault();

    //get the class and id
    var classe = event.target.className;
    var id = event.target.id;

    //checks if the click happened within the are of one of the cards
    if ((classe=='a'||classe=='b'||classe=='c'||classe=='d'||classe=='e'||classe=='f')&&(id!=id2)){
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

function finishRound(id){
    count = 0;

    //changes the number os attempts
    attempts++;
    document.getElementById("t2").innerHTML = attempts;

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

//function to increase number of attempts
function increaseCorrectPairs(){
    pairs++;

    if (pairs==6){
        //if the 6 pairs are facing up
        document.getElementById("div2").innerText = "YOU WIN!";
        document.getElementById("div2").style.color = "green";
        document.getElementById("div2").style.border = "thick dashed green";
        document.getElementById("div2").style.padding = "30px";
    }	
}

//function to increase the number of correct pairs
function increaseCorrectPairs(){
    pairs++;

    if (pairs==6){
        //if the 6 pairs are facing up
        document.getElementById("div2").innerText = "YOU WIN!";
        document.getElementById("div2").style.color = "green";
        document.getElementById("div2").style.border = "thick dashed green";
        document.getElementById("div2").style.padding = "30px";
    }
}

//function to count lives (tests the number of lives and reduces the hearts)
function reduceLives(){
    lives--;

    document.getElementById(String(lives)).style.display="none";

    if(lives==0){
        document.getElementById("0").style.display="none";
        //if the lives end
        document.getElementById("div2").innerText = "GAME OVER!";
        document.getElementById("div2").style.color = "red";
        document.getElementById("div2").style.border = "thick dashed red";
        document.getElementById("div2").style.padding = "30px";
    }
}
