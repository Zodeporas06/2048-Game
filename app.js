document.addEventListener(
    'DOMContentLoaded', () => {

        const gridDisplay = document.querySelector('.grid')
        const scoreDisplay = document.getElementById('score')
        const resultDisplay = document.getElementById('result')

        let squares = []

        //create a playing board
        function createBoard() {

            for(let i=0; i<16; i++) {

                let square = document.createElement('div')
                square.innerHTML = 0
                gridDisplay.appendChild(square)
                squares.push(square)
            }
            generateRandom()
            generateRandom()
        }

        createBoard();

        //create a random number generating function
        function generateRandom() {

            let randomNumber = Math.floor(Math.random()*squares.length)

            if(squares[randomNumber].innerHTML == 0) {

                squares[randomNumber].innerHTML = 2
            }
            else {

                generateRandom()
            }
        }
    }
)