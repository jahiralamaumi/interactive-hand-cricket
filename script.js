const moves = document.querySelectorAll('[data-choice]'); // returns array
const yourScore = document.querySelector('[data-yourScore]');
const botScore = document.querySelector('[data-botScore]');
const resetBtn = document.getElementById('reset');
const scores = document.querySelectorAll('.result-score');
const youOut = document.getElementById('youOut');
const botOut = document.getElementById('botOut');
const yourTotalScore = document.querySelector('#yourTotalScore')
const botTotalScore = document.querySelector('#botTotalScore')
const doReset =() => {
    const divs = document.querySelectorAll('.choice-selected');
    divs.forEach( div => div.remove());
}
let yourState = 1;
let botState = 0;
const MOVE_LIST = [
    {
        title: 'Rock',
        emoji: '✊',
        beats: 'Scissor',
        value: 6
    },
    {
        title: 'Paper',
        emoji: '✋',
        beats: 'Rock',
        value: 4
    },
    {
        title: 'Scissor',
        emoji: '✌️',
        beats: 'Paper',
        value: 2
    }
];

moves.forEach(move => {
    move.addEventListener('click', (e) => {
        console.log(youOut);
        const yourMove = move.dataset.choice;  //returns value of data-choice
        const yourMoveSet = MOVE_LIST.find(move => move.title === yourMove);
        const botMoveSet = MOVE_LIST[Math.floor(Math.random() * MOVE_LIST.length)];
        const youWon = isWinner(yourMoveSet, botMoveSet);
        const botWon = isWinner(botMoveSet, yourMoveSet);
        appendResult(botMoveSet, botWon);
        appendResult(yourMoveSet, youWon);

        if(yourState) {
            // handleScoreAndOut(yourMoveSet, botMoveSet, youOut, yourScore, yourTotalScore);
            if(yourMoveSet.title !== botMoveSet.title) {
                yourScore.innerText = parseInt(yourScore.innerText) + parseInt(yourMoveSet.value);
            }
            if (yourMoveSet.title === botMoveSet.title) {
                youOut.style.display='inline';
                yourScore.style.display = 'none';
                yourTotalScore.innerText = yourScore.innerText;
                yourState = 0;
            }
        }
        if(botState) {
            if(botMoveSet.title !== yourMoveSet.title) {
                botScore.innerText = parseInt(botScore.innerText) + parseInt(botMoveSet.value);
            }
            if (botMoveSet.title === yourMoveSet.title) {
                botOut.style.display='inline';
                botScore.style.display = 'none';
                botTotalScore.innerText = botScore.innerText;
                parseInt(botTotalScore.innerText) > parseInt(yourTotalScore.innerText)? console.log('Bot Won') : console.log('You Won');
            }
            // handleScoreAndOut(botMoveSet, yourMoveSet, botOut, botScore, botTotalScore);
        }
    })
})

const isWinner = (winnerMove, loserMove) => {
    return winnerMove.beats === loserMove.title;
}

const appendResult = (move, isWinner) => {
    const div = document.createElement('div');
    const finalColumn = document.querySelector('[data-final-column]');
    div.innerText = move.emoji;
    div.classList.add('choice-selected');
    if(isWinner) div.classList.add('winner');
    finalColumn.after(div);
}


const handleScoreAndOut = (move1, move2, outSpan, scoreSpan, totalScoreSpan) => {
    if (move1.title !== move2.title) {
        scoreSpan.innerText = parseInt(scoreSpan.innerText) + parseInt(move1.value);
    }
    if (move1.title === move2.title) {
        outSpan.style.display='inline';
        scoreSpan.style.display = 'none';
        totalScoreSpan.innerText = scoreSpan.innerText;
        yourState = 0;
    }
}

const handleYourStateScoreAndOut = () => {
    if(yourMoveSet.title !== botMoveSet.title) {
        yourScore.innerText = parseInt(yourScore.innerText) + parseInt(yourMoveSet.value);
    }
    if (yourMoveSet.title === botMoveSet.title) {
        youOut.style.display='inline';
        yourScore.style.display = 'none';
        yourTotalScore.innerText = yourScore.innerText;
        yourState = 0;
    }
}

const changeBatting = () => {
    botState = 1;
}