document.addEventListener(
    'DOMContentLoaded', () => {

        const gridDisplay = document.querySelector('.grid')
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

                checkLose()
            }
            else {

                generateRandom()
            }
        }

        //swipe right 
        function moveRight() {

            for(let i=0; i<16; i++) {

                if(i%4 == 0) {

                    let totalOne = parseInt(squares[i].innerHTML)
                    let totalTwo = parseInt(squares[i+1].innerHTML)
                    let totalThree = parseInt(squares[i+2].innerHTML)
                    let totalFour = parseInt(squares[i+3].innerHTML)

                    let row = [totalOne, totalTwo, totalThree, totalFour]
                    //console.log(row)

                    let filteredRow = row.filter(num => num)
                    //console.log(filteredRow)

                    let missing = 4 - filteredRow.length
                    let zeroes = Array(missing).fill(0)
                    //console.log(zeroes)

                    let newRow = zeroes.concat(filteredRow)
                    //console.log(newRow)

                    squares[i].innerHTML = newRow[0]
                    squares[i+1].innerHTML = newRow[1]
                    squares[i+2].innerHTML = newRow[2]
                    squares[i+3].innerHTML = newRow[3]
                }
            }
        }

        //swipe left
        function moveLeft() {

            for(let i=0; i<16; i++) {

                if(i%4 == 0) {

                    let totalOne = parseInt(squares[i].innerHTML)
                    let totalTwo = parseInt(squares[i+1].innerHTML)
                    let totalThree = parseInt(squares[i+2].innerHTML)
                    let totalFour = parseInt(squares[i+3].innerHTML)

                    let row = [totalOne, totalTwo, totalThree, totalFour]
                    //console.log(row)

                    let filteredRow = row.filter(num => num)
                    //console.log(filteredRow)

                    let missing = 4 - filteredRow.length
                    let zeroes = Array(missing).fill(0)
                    //console.log(zeroes)

                    let newRow = filteredRow.concat(zeroes)
                    //console.log(newRow)

                    squares[i].innerHTML = newRow[0]
                    squares[i+1].innerHTML = newRow[1]
                    squares[i+2].innerHTML = newRow[2]
                    squares[i+3].innerHTML = newRow[3]
                }
            }
        }

        //create function to add similar adjacent row elements
        function addRow() {

            for(let i=0; i<15; i++) {

                if(squares[i].innerHTML == squares[i+1].innerHTML) {

                    let sum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                    squares[i].innerHTML = sum
                    squares[i+1].innerHTML = 0
                }
            }
            checkWin()
        }

        //swipe down
        function moveDown() {

            for(let i=0; i<4; i++) {

                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+4].innerHTML)
                let totalThree = parseInt(squares[i+8].innerHTML)
                let totalFour = parseInt(squares[i+12].innerHTML)

                let column = [totalOne, totalTwo, totalThree, totalFour]

                let filteredColumn = column.filter(num => num)

                let missing = 4 - filteredColumn.length
                let zeroes = Array(missing).fill(0)

                let newColumn = zeroes.concat(filteredColumn)

                squares[i].innerHTML = newColumn[0]
                squares[i+4].innerHTML = newColumn[1]
                squares[i+8].innerHTML = newColumn[2]
                squares[i+12].innerHTML = newColumn[3]
            }
        }

        //swipe up
        function moveUp() {

            for(let i=0; i<4; i++) {

                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+4].innerHTML)
                let totalThree = parseInt(squares[i+8].innerHTML)
                let totalFour = parseInt(squares[i+12].innerHTML)

                let column = [totalOne, totalTwo, totalThree, totalFour]

                let filteredColumn = column.filter(num => num)

                let missing = 4 - filteredColumn.length
                let zeroes = Array(missing).fill(0)

                let newColumn = filteredColumn.concat(zeroes)

                squares[i].innerHTML = newColumn[0]
                squares[i+4].innerHTML = newColumn[1]
                squares[i+8].innerHTML = newColumn[2]
                squares[i+12].innerHTML = newColumn[3]
            }
        }

        //create function to add similar adjacent column elements
        function addColumn() {

            for(let i=0; i<12; i++) {

                if(squares[i].innerHTML == squares[i+4].innerHTML) {

                    let sum = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML)
                    squares[i].innerHTML = sum
                    squares[i+4].innerHTML = 0
                }
            }
            checkWin()
        }

        //assign keys
        function control(event) {

            if(event.keyCode == 39)
                keyRight()
            else if(event.keyCode == 37)
                keyLeft()
            else if(event.keyCode == 40)
                keyDown()
            else if(event.keyCode == 38)
                keyUp()        
        }
        document.addEventListener('keyup', control)

        function keyRight() {

            moveRight()
            addRow()
            moveRight()
            generateRandom()
        }

        function keyLeft() {

            moveLeft()
            addRow()
            moveLeft()
            generateRandom()
        }

        function keyDown() {

            moveDown()
            addColumn()
            moveDown()
            generateRandom()
        }

        function keyUp() {

            moveUp()
            addColumn()
            moveUp()
            generateRandom()
        }

        //check for win
        function checkWin() {

            for(let i=0; i<16; i++) {

                if(squares[i].innerHTML == 2048) {

                    resultDisplay.innerHTML = 'YOU WON!!!'
                    document.removeEventListener('keyup', control)
                }
            }
        }

        //check for lose
        function checkLose() {

            let numZero = 0
            for(let i=0; i<16; i++) {

                if(squares[i].innerHTML == 0)
                    numZero++
            }
            if(numZero == 0) {

                resultDisplay.innerHTML = 'YOU LOST!!!'
                document.removeEventListener('keyup', control)
            }
        }
    }
)