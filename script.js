//"global" variables
var card1, card2, count=0, attempts=0, lives=10, pairs=0, id2;
count = parseInt(count);
attempts = parseInt(attempts);
lives = parseInt(lives);
pairs = parseInt(pairs);

//click event (captures the clicks on the cards)
document.addEventListener ('click', function (event){
    event.preventDefault();
    //get the class and id
    var classe = event.target.className;
    var id = event.target.id;
    //testa se o clique ocorreu em uma das cartas
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
            attempts++;
            document.getElementById(id).src = "assets/"+classe+".png";
            count = 0;
            card2 = classe;
            //changes the number os attempts
            document.getElementById("t2").innerHTML = attempts;
            //opens the test function
            testar(id);
        }
    }
});

//test function (tests if the two cards turned up are the same)
function testar(id){
    if(card1 == card2){
        //if the round pair is correct
        pairs++;
        if (pairs==6){
            //if the 6 pairs are facing up
            document.getElementById("div2").innerText = "VOCÊ GANHOU!";
            document.getElementById("div2").style.color = "green";
            document.getElementById("div2").style.border = "thick dashed green";
            document.getElementById("div2").style.padding = "30px";
        }		
    }else{
        //if the round pair is wrong
        lives--;
        //make the cards face down again
        setTimeout(function(){
            document.getElementById(id).src="assets/background.png";
            document.getElementById(id2).src="assets/background.png";
        }, 750);
        //open the function to count the lives
        countLives();
    }
}

//function to count lives (tests the number of lives and reduces the hearts if needed)
function countLives(){
    if(lives==9){
        document.getElementById("9").style.display="none";
    }
    if(lives==8){
        document.getElementById("8").style.display="none";
    }
    if(lives==7){
        document.getElementById("7").style.display="none";
    }
    if(lives==6){
        document.getElementById("6").style.display="none";
    }
    if(lives==5){
        document.getElementById("5").style.display="none";
    }
    if(lives==4){
        document.getElementById("4").style.display="none";
    }
    if(lives==3){
        document.getElementById("3").style.display="none";
    }
    if(lives==2){
        document.getElementById("2").style.display="none";
    }
    if(lives==1){
        document.getElementById("1").style.display="none";
    }
    if(lives==0){
        document.getElementById("0").style.display="none";
        //if the lives end
        document.getElementById("div2").innerText = "VOCÊ PERDEU!";
        document.getElementById("div2").style.color = "red";
        document.getElementById("div2").style.border = "thick dashed red";
        document.getElementById("div2").style.padding = "30px";
    }
}