let name;
let turn;
let marbleCount;
let gameOver = false;
let comFirst = false;
let playerScore = 0;
let compScore = 0;
let answered = false;
let mode;
let amount = 0;

//Creates all the local storage for the scores
function initialize(){
    if(localStorage.getItem('compScore') == undefined){
        localStorage.setItem('compScore',compScore)
    }else{
        compScore = localStorage.getItem('compScore')
        compScore = parseInt(compScore)
    }
    if(localStorage.getItem('playerScore') == undefined){
        localStorage.setItem('playerScore',playerScore)
    }else{
        playerScore = localStorage.getItem('playerScore')
        playerScore = parseInt(playerScore)
    }
    document.getElementById('playerScore').innerHTML = 'Player Wins: ' + playerScore
    document.getElementById('compScore').innerHTML = 'Computer Wins: ' + compScore
}

function chooseAmount(val){
    if(val == 'little'){
        document.getElementById('modeDiv').hidden = true;
        document.getElementById('submit').disabled = false
        document.getElementById('little').style.backgroundColor = '#37d461'
        document.getElementById('more').style.backgroundColor = ''
        document.getElementById('lot').style.backgroundColor = ''
        amount = 1;
    }else if(val == 'more'){
        document.getElementById('modeDiv').hidden = false;
        document.getElementById('submit').disabled = true;
        document.getElementById('little').style.backgroundColor = ''
        document.getElementById('more').style.backgroundColor = '#37d461'
        document.getElementById('lot').style.backgroundColor = ''
        amount = 2;
    }else if(val == 'lot'){
        document.getElementById('modeDiv').hidden = true;
        document.getElementById('submit').disabled = false
        document.getElementById('lot').style.backgroundColor = '#37d461'
        document.getElementById('more').style.backgroundColor = ''
        document.getElementById('little').style.backgroundColor = ''
        amount = 3;
    }
}
function chooseMode(val){
    if(val == 'easy'){
        document.getElementById('easy').style.backgroundColor = '#37d461'
        document.getElementById('hard').style.backgroundColor = ''
    }else{
        document.getElementById('easy').style.backgroundColor = ''
        document.getElementById('hard').style.backgroundColor = '#f5625b'
    }
    mode = val
    document.getElementById('submit').disabled = false
}
function start(){
    name = document.getElementById('name').value
    if(amount == 3){
        localStorage.setItem('name',name)
        window.location.href = 'multiple.html'
    }else{
        game()
    }
}

function game(){
    gameOver = false;
    turn = Math.floor(Math.random()*2 ) + 1
    if(turn === 2) comFirst = true
    if(amount == 1){
        marbleCount = Math.floor(Math.random()*10 ) + 10
    }else if(amount == 2){
        marbleCount = Math.floor(Math.random()*20 ) + 10
    }
    
    while(!gameOver){
        if(turn === 1){
            console.log(turn)
            playerTurn()
        }else{
            computerTurn()
        }
   }
    document.getElementById('playerScore').innerHTML = 'Player Wins: ' + playerScore
    document.getElementById('compScore').innerHTML = 'Computer Wins: ' + compScore
}

function playerTurn(){
        let answer = 0;
        
        if(amount == 1){
            while(answer != 1 && answer != 2 || answer === undefined || answer === 0){
                if(answered){
                    if(marbleCount != 1){
                        answer = prompt(name + ', YOU NEED TO CHOOSE EITHER 1 OR 2. THERE ARE '+ marbleCount + ' MARBLES LEFT. PLS TRY AGAIN!')
                    }else{
                        answer = prompt(name + ', YOU NEED TO CHOOSE EITHER 1 OR 2. THERE IS '+ marbleCount + ' MARBLE LEFT. PLS TRY AGAIN!')
                    }
                }else{
                    if(marbleCount != 1){
                        answer = prompt(name + ', there are ' + marbleCount + ' marbles remaining. Choose how many marbles you want to take below. You may choose either 1 or 2.')
                        answered = true;
                    }else{
                        answer = prompt(name + ', there is ' + marbleCount + ' marble remaining. Choose how many marbles you want to take below. You may choose either 1 or 2.')
                        answered = true;
                    }
                }
                answer = parseInt(answer)
                console.log()
            }
        }else{
            if(marbleCount === 1){
                while(answer != 1){
                    if(answered){
                        if(marbleCount != 1){
                            answer = prompt(name + ', YOU NEED TO CHOOSE UPTO HALF. THERE ARE '+ marbleCount + ' MARBLES LEFT. PLS TRY AGAIN!')
                        }else{
                            answer = prompt(name + ', YOU NEED TO CHOOSE UPTO HALF. THERE IS '+ marbleCount + ' MARBLE LEFT. PLS TRY AGAIN!')
                        }
                    }else{
                        if(marbleCount != 1){
                            answer = prompt(name + ', there are ' + marbleCount + ' marbles remaining. Choose how many marbles you want to take below. You may choose upto half.')
                            answered = true;
                        }else{
                            answer = prompt(name + ', there is ' + marbleCount + ' marble remaining. Choose how many marbles you want to take below. You may choose upto half.')
                            answered = true;
                        }
                    }
                    answer = parseInt(answer)
                    console.log()
                }
            }else{
                while(answer > marbleCount/2 || answer === undefined || answer === 0){
                    if(answered){
                        if(marbleCount != 1){
                            answer = prompt(name + ', YOU NEED TO CHOOSE UPTO HALF. THERE ARE '+ marbleCount + ' MARBLES LEFT. PLS TRY AGAIN!')
                        }else{
                            answer = prompt(name + ', YOU NEED TO CHOOSE UPTO HALF. THERE IS '+ marbleCount + ' MARBLE LEFT. PLS TRY AGAIN!')
                        }
                    }else{
                        if(marbleCount != 1){
                            answer = prompt(name + ', there are ' + marbleCount + ' marbles remaining. Choose how many marbles you want to take below. You may choose upto half.')
                            answered = true;
                        }else{
                            answer = prompt(name + ', there is ' + marbleCount + ' marble remaining. Choose how many marbles you want to take below. You may choose upto half.')
                            answered = true;
                        }
                    }
                    answer = parseInt(answer)
                    console.log()
                }
            }
        }

        marbleCount -= answer
        alert('You took ' + answer + ' marbles. There are ' + marbleCount + ' marbles left.')
        answered = false
        turn = 2;
        if (marbleCount < 1){
            alert('You Won!')
            playerScore++;
            localStorage.setItem('playerScore',playerScore)
            gameOver = true;
        }
}


function computerTurn(){
    if(amount == 1){
        let marblesTaken = Math.floor(Math.random()*2 ) + 1
        if(comFirst) alert('There are ' + marbleCount + ' marbles in the pile.')
        comFirst = false
        marbleCount -= marblesTaken
        alert('The computer took ' + marblesTaken + ' marbles.')
        turn = 1;
        if (marbleCount < 1){
            alert('Computer Won! You Lost.')
            compScore++;
            localStorage.setItem('compScore',compScore)
            gameOver = true;
        }
    }else{
        if(mode == 'easy'){
            let possibleMarbles = marbleCount/2
            let marblesTaken = Math.floor(Math.random()* possibleMarbles) + 1
            if(comFirst) alert('There are ' + marbleCount + ' marbles in the pile.')
            comFirst = false
            marbleCount -= marblesTaken
            alert('The computer took ' + marblesTaken + ' marbles.')
            turn = 1;
            if (marbleCount < 1){
                alert('Computer Won! You Lost.')
                compScore++;
                localStorage.setItem('compScore',compScore)
                gameOver = true;
            }
        }else if(mode == 'hard'){
            let marblesTaken = marbleCount
            let counter = 1;
            if(comFirst) alert('There are ' + marbleCount + ' marbles in the pile.')
            comFirst = false
            while(2**counter < marbleCount){
                counter++
            }
            counter--;
            if(marbleCount !== 1){
                marblesTaken -= 2**counter
                marbleCount = 2**counter
            }else{
                marblesTaken = 1;
                marbleCount = 0;
            }
    
            alert('The computer took ' + marblesTaken + ' marbles.')
            turn = 1;
            if (marbleCount < 1){
                alert('Computer Won! You Lost.')
                compScore++;
                localStorage.setItem('compScore',compScore)
                gameOver = true;
            }
        }
    }
}
