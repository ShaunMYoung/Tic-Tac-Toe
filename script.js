const container = document.querySelector('.container')
const boxes = Array.from(document.querySelectorAll('.box'))
const symbols = ['X','O']
const msg = document.querySelector('.msg')
let patternsX = []
let patternsO = []
const winningPatterns = [['012'], ['036'], ['048'], ['345'], ['246'], ['147'], ['258'], ['678']]
const reset = document.querySelector('.reset')
msg.innerText = "X's Turn"
const GameBoard = (() => {
    const start = () => {
        container.addEventListener('click', GameBoard.playBox)
        patternsX = []
        patternsO = []
        boxes.forEach((box) => {
            box.classList.remove('X', 'O', 'played')
        })
        msg.innerText = `${symbols[0]}'s Turn`
    }
    function playBox(b) {
        let box = b.target;
        if (!b.target.classList.contains('box')) {
            return
        }
        if (!b.target.classList.contains('played')) {
            box.classList.add('played')
            box.classList.add(symbols[0])
        
            switchPlayer = symbols.shift()
            symbols.push(switchPlayer)
            msg.innerText = `${symbols[0]}'s Turn`
            if (b.target.classList.contains('X')) {
                patternsX.push(parseInt(b.target.classList[1]))
                patternsX.sort()
                let xWins = winCheck.arrayMatch(patternsX);
                winCheck.tieGame()
                winCheck.findMatch(xWins, winningPatterns)

            }
            else {
                patternsO.push(parseInt(b.target.classList[1]))
                patternsO.sort()
                let oWins = winCheck.arrayMatch(patternsO)
                winCheck.tieGame()
                winCheck.findMatch(oWins, winningPatterns)

            }
        }
    }
    return {start, playBox}
})()

const winCheck = (() => {
    function findMatch(array1, array2) {
        for (i=0; i < array1.length; i++) {
            for (j=0; j < array2.length; j++) {
                if (array1[i] == array2[j]) {
                    gameOver(false);
                }
                

            }
        }
    }

    function tieGame () {
      if (boxes.filter(b => ! b.classList.contains('played')).length === 0) {
        gameOver(true);}
    }
    function arrayMatch (chars) {
        let result = []
        let f = function (prefix, chars) {
            for (let i=0; i < chars.length; i++) {
                result.push(prefix + chars[i])
                f(prefix + chars[i], chars.slice(i+1))
            }
        }
        f('', chars)
        filteredResult = result.filter (b => b.length === 3);
        return filteredResult
    }
    function gameOver (tie) {
        if (tie === true) {
            msg.innerText = 'Tie game!' 
            container.removeEventListener('click', GameBoard.playBox)
        }
        else {
            msg.innerText = `${symbols[1]} is the winner!`
            container.removeEventListener('click', GameBoard.playBox)
        }
    }
    return {findMatch, arrayMatch, tieGame, gameOver, reset}
})()
GameBoard.start
container.addEventListener('click', GameBoard.playBox)
reset.addEventListener('click', GameBoard.start)