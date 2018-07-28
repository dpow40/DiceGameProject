/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, count, winValue;
gamePlaying = true;
count = 0;

newGame();

document.querySelector('.btn-roll').addEventListener('click', () =>{
    
    if (gamePlaying){
        var currentScore =  document.querySelector('#current-' + activePlayer);
        
        //1. random number loaded
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2.Display result
        var diceDOM = document.getElementById('dice-1');
        var diceDOM2 = document.getElementById('dice-2');

        
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice1 +'.png';
        diceDOM2.src = 'dice-' + dice2 +'.png';
        //3.Update round score if roll was not 1 BUT rolled a six.
        
        if((dice1 === 6) || (dice2 === 6)){
          
            count++;
            roundScore += dice1 + dice2;
            currentScore.textContent = roundScore;
            //CASE: if you roll a 6 & 1
            if((dice1 === 1) || (dice2 === 1)){
                changePlayers();
            }
            if ((dice1 === 6) && (dice2 === 6)){
                count = 2;
            }
            if (count === 2) {
                document.getElementById('score-' + activePlayer).textContent = '0';
            
                changePlayers();

            }
            
        }else if ((dice1 !== 1) && (dice2 !== 1))  {
            
            roundScore += dice1 + dice2;
            currentScore.textContent = roundScore;
    
            //document.querySelector('.player-0-panel').classList.remove('.active');
            //document.querySelector('.player-1-panel').classList.add('.active');     
        }  
        else {
            //Next Player
            changePlayers();
    
    
        }


    }
   

});

document.querySelector('.btn-hold').addEventListener('click', () =>{

    if (gamePlaying) {
         //add current score to global score
    var scoreTotal =  parseInt(document.querySelector('#score-'+activePlayer).textContent);
    //console.log(scoreTotal);
    scoreTotal += roundScore;
    //console.log(scoreTotal);
    //update the UI
  
    document.getElementById('score-' + activePlayer).textContent = scoreTotal;



    //check if player won the game
 if (scoreTotal >= winValue){
        var winner = document.querySelector('#name-' + activePlayer);
        winner.classList.toggle('winner');
        winner.textContent = 'W I N N E R !';
        hideDice();
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gamePlaying = false;

    } else{
        //next player
        changePlayers();

    }

    }
   

});

function changePlayers(){
    activePlayer  == 0? activePlayer = 1 : activePlayer = 0;

        count = 0;
        roundScore = 0;
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');           //adds and removes active class
        document.querySelector('.player-1-panel').classList.toggle('active');
        hideDice();

}

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-new').addEventListener('click', () => {
    newGame();
    document.querySelector('.game-input').classList.toggle('hide');

});

document.querySelector('.next-button').addEventListener('click', () =>{

    var instructions = document.querySelector('.pop-up');
    var gameInput = document.querySelector('.game-input');

    instructions.classList.add('hide');
    gameInput.classList.remove('hide');
    gamePlaying = false;
    document.querySelector('.next-button').disabled = true; 
    
    



});

document.querySelector('.start-button').addEventListener('click',(event) =>{
    event.preventDefault();
    var name1 = document.getElementById('input-name-0').value;
    var name2 = document.getElementById('input-name-1').value;
    winValue = document.getElementById('win-value').value;
    //Player's names Set
    document.getElementById('name-0').textContent =  name1;       
    document.getElementById('name-1').textContent =  name2;

    document.querySelector('.game-input').classList.add('hide');
    gamePlaying = true;
    document.querySelector('.wrapper').style.filter = 'none';
});


function newGame(){
    count = 0;
    roundScore = 0;
    activePlayer = 0;
    winValue = 50; //default
    hideDice();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').classList.remove('winner');
    document.getElementById('name-1').classList.remove('winner');
    

}

function hideDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

   



}