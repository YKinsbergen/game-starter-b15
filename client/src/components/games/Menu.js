import * as React from 'react'

// This component renders the menu that shows up after a unit encounters an enemy
// The end turn function returns updateGame2 which updates the games board
// And ends the turn
export default class Menu extends React.Component {
    render() {
        const fireEnemy = () => { 
            const props = this.props
            const unitFiring = props.board[props.row][props.cell]
            const above = props.row-1
            const below = props.row+1
            const left = props.cell-1
            const right = props.cell+1

            let se = []
            
            props.board.map((row, rowIndex) => {    
                if(above == rowIndex) {
                    if(row[props.cell] !== null && row[props.cell] !== undefined) {
                        const elem = document.getElementById(`${rowIndex}-${props.cell}`)
                        elem.style.backgroundColor = 'red'
                        se.push(row[props.cell])
                    }
                }
                if(below == rowIndex) {
                    if(row[props.cell] !== null && row[props.cell] !== undefined) {
                        const elem = document.getElementById(`${rowIndex}-${props.cell}`)
                        elem.style.backgroundColor = 'red'
                        se.push(row[props.cell])
                    }
                }
                if(rowIndex == props.row) {
                    row.map((cell, cellIndex) => {
                        if(left == cellIndex) {
                            if(cell !== null && cell !== undefined) {
                                const elem = document.getElementById(`${rowIndex}-${cellIndex}`)
                                elem.style.backgroundColor = 'red'
                                se.push(cell)
                            }
                        }
                        if(right == cellIndex) {
                            if(cell !== null && cell !== undefined) {
                                const elem = document.getElementById(`${rowIndex}-${cellIndex}`)
                                elem.style.backgroundColor = 'red'
                                se.push(cell)
                            }
                        }
                    })
                }
            })
            const cellAbove = props.board[above][props.cell]
            const cellBelow = props.board[below][props.cell]
            const cellRight = props.board[props.row][right]
            const cellLeft = props.board[props.row][left]
            const ohm = [cellAbove,cellBelow,cellRight,cellLeft]
            console.log(se)
            console.log("break")
        }
        return (
            <div>
                {this.props.showMenu && 
                <div>
                    <button onClick={() => {fireEnemy()}}>Fire</button>
                    <button onClick={() => (
                        this.props.toggleMenu(),
                        this.props.endTurn(this.props.gameId, this.props.board) 
                        )}>
                        End turn
                    </button>
                </div>}
            </div>
        )
    }
}