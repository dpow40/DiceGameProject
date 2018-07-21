/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;
gamePlaying = true;

swal('Hey');
newGame();

document.querySelector('.btn-roll').addEventListener('click', () =>{
    
    if (gamePlaying){
        var currentScore =  document.querySelector('#current-' + activePlayer);
        dice = document.querySelector('#current-' + activePlayer).textContent;
        
    
        //1. random number loaded
        dice = Math.floor(Math.random() * 6) + 1;
        //2.Display result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice +'.png'
        //3.Update round score if roll was not 1.
        if (dice !== 1)  {
            
            roundScore += dice;
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
 if (scoreTotal >=30){
        var winner = document.querySelector('#name-' + activePlayer);
        winner.classList.toggle('winner');
        winner.textContent = 'W I N N E R !';
        document.querySelector('.dice').style.display = 'none';
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

        roundScore = 0;
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');           //adds and removes active class
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';

}

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-new').addEventListener('click', newGame);


function newGame(){
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
   
    
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').classList.remove('winner');
    document.getElementById('name-1').classList.remove('winner');
    

}