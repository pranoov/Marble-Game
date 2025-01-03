//Sets the amount of marbles
let marbles1 = Math.floor(Math.random() * 14) + 2
let marbles2 = Math.floor(Math.random() * 14) + 2
let marbles3 = Math.floor(Math.random() * 14) + 2
let turn;
let gameOver = false;
let name = localStorage.getItem('name')
let compScore = 0;
let playerScore = 0;

function start(){
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
    document.getElementById('playerStuff').hidden = true
    document.getElementById('next').hidden = true
    document.getElementById('back').hidden = true
    displayMarbles()
    document.getElementById('m1').innerHTML = 'Marble Set 1: ' + marbles1 + ' Marbles'
    document.getElementById('m2').innerHTML = 'Marble Set 2: ' + marbles2 + ' Marbles'
    document.getElementById('m3').innerHTML = 'Marble Set 3: ' + marbles3 + ' Marbles'
    turn = Math.floor(Math.random()*2 ) + 1
    game()
}

function game(){
    document.getElementById('playerStuff').hidden = true
    document.getElementById('next').hidden = true
    if(turn == 1 && gameOver == false){
        playerTurn()
    }else if(!gameOver){
        computerTurn()
    }
}

function playerTurn(){
 
    document.getElementById('playerStuff').hidden = false;
    document.getElementById('display').innerHTML = name + ' choose what pile you want to take marbles from.'
    updateMarbles()
}

function updateMarbles(){
    let pile = document.getElementById('piles').value
    let e = document.getElementById('marbles')
    let count = 0;
    while(e.firstChild){
        e.removeChild(e.lastChild)
    }
    console.log(pile)
    if(pile == 1){
        count = marbles1
    }else if(pile == 2){
        count = marbles2
    }else{
        count = marbles3
    }
    if(count == 1){
        var option = new Option
            option.value = 1;
            option.innerHTML = 1;
            document.getElementById('marbles').appendChild(option)
    }else{
        for(var i = 1; i < count; i++){
            var option = new Option
            option.value = i;
            option.innerHTML = i;
            document.getElementById('marbles').appendChild(option)
        }
    }
}

function computerTurn(){
    document.getElementById('playerStuff').hidden = true
    var pile = Math.floor(Math.random() * 3) + 1
    var maxAmount = 0;
    if(pile === 1) maxAmount = marbles1 -1
    if(pile === 2) maxAmount = marbles2 -1
    if(pile === 3) maxAmount = marbles3 -1
    var marblesTaken = Math.floor(Math.random() * maxAmount) + 1
    document.getElementById('display').innerHTML = "The Computer Is Thinking " 
    setTimeout(()=>{
        document.getElementById('next').hidden = false
        document.getElementById('display').innerHTML = "The Computer Took " + marblesTaken + ' Marbles From Pile ' + pile 
        switch(pile){
            case 1: marbles1 -= marblesTaken
                break;
            case 2: marbles2 -= marblesTaken
                break;
            case 3: marbles3 -= marblesTaken
                break;
        }
        document.getElementById('m1').innerHTML = 'Marble Set 1: ' + marbles1 + ' Marbles'
        document.getElementById('m2').innerHTML = 'Marble Set 2: ' + marbles2 + ' Marbles'
        document.getElementById('m3').innerHTML = 'Marble Set 3: ' + marbles3 + ' Marbles'
        displayMarbles()

    },3000)
    
}

function submit(){
    let pile = document.getElementById('piles').value
    let marbles = document.getElementById('marbles').value
    switch(pile){
        case "1": marbles1 -= marbles
            break;
        case "2": marbles2 -= marbles
            break;
        case "3": marbles3 -= marbles
            break;
    }
    document.getElementById('m1').innerHTML = 'Marble Set 1: ' + marbles1 + ' Marbles'
    document.getElementById('m2').innerHTML = 'Marble Set 2: ' + marbles2 + ' Marbles'
    document.getElementById('m3').innerHTML = 'Marble Set 3: ' + marbles3 + ' Marbles'
    if(marbles1 == 0 || marbles2 == 0 || marbles3 == 0){
        gameOver = true;
        playerScore += 1;
        localStorage.setItem('playerScore',playerScore)
        document.getElementById('display').innerHTML = 'Player Won! Computer Lost.'
        document.getElementById('back').hidden = false
    }
    turn = 2;
    displayMarbles()
    game()
}

function next(){
    if(marbles1 == 0 || marbles2 == 0 || marbles3 == 0){
        gameOver = true;
        compScore += 1;
        localStorage.setItem('compScore',compScore)
        document.getElementById('display').innerHTML = 'Computer Won! Player Lost.'
        document.getElementById('back').hidden = false
    }
    turn = 1;
    game()
}


function displayMarbles(){
        for(var i = 0; i < 4; i++){
            switch(i){
                case 1:             
                e = document.getElementById('set1')
                while(e.firstChild){
                    e.removeChild(e.lastChild)
                }
                break;
                case 2: 
                e = document.getElementById('set2')
                while(e.firstChild){
                    e.removeChild(e.lastChild)
                }
                break;
                case 3: 
                e = document.getElementById('set3')
                while(e.firstChild){
                    e.removeChild(e.lastChild)
                }
                break;
            }

        }
        for(var i = 0; i < marbles1; i++){
            var image = new Image(width=60)
            image.src = './assets/marble1.jpeg'
            document.getElementById('set1').appendChild(image)
        }
        for(var i = 0; i < marbles2; i++){
            var image = new Image(width=60)
            image.src = './assets/marble1.jpeg'
            document.getElementById('set2').appendChild(image)
        }
        for(var i = 0; i < marbles3; i++){
            var image = new Image(width=60)
            image.src = './assets/marble1.jpeg'
            document.getElementById('set3').appendChild(image)
        }
}

function home(){
    window.location.href = 'index.html'
}
