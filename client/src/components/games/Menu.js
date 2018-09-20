import * as React from 'react'
import {connect} from 'react-redux'

// This component renders the menu that shows up after a unit encounters an enemy
// The end turn function returns updateGame2 which updates the games board
// And ends the turn
class Menu extends React.Component {
    render() {
        // const fireEnemy = () => { 
        //     const props = this.props
        //     const unitFiring = [props.row, props.cell]
        //     const above = props.row-1
        //     const below = props.row+1
        //     const left = props.cell-1
        //     const right = props.cell+1
        //     let alreadyFired = false
        //     let ids = []
            
        //     props.board.map((row, rowIndex) => {    
        //         if(above == rowIndex) {
        //             if(row[props.cell] !== null && row[props.cell] !== undefined) {
        //                 ids.push(`${rowIndex}-${props.cell}`)
        //             }
        //         }
        //         if(below == rowIndex) {
        //             if(row[props.cell] !== null && row[props.cell] !== undefined) {
        //                 ids.push(`${rowIndex}-${props.cell}`)
        //             }
        //         }
        //         if(rowIndex == props.row) {
        //             row.map((cell, cellIndex) => {
        //                 if(left == cellIndex) {
        //                     if(cell !== null && cell !== undefined) {
        //                         ids.push(`${rowIndex}-${cellIndex}`)
        //                     }
        //                 }
        //                 if(right == cellIndex) {
        //                     if(cell !== null && cell !== undefined) {
        //                         ids.push(`${rowIndex}-${cellIndex}`)
        //                     }
        //                 }
        //             })
        //         }
        //     })

        //     ids.map(id => {
        //         const elem = document.getElementById(id)
        //         elem.addEventListener("click", function(){
        //             if(!alreadyFired) {
        //                 props.ohm(id, unitFiring)
        //                 alreadyFired = true
        //                 elem.style.backgroundColor = 'transparent'
        //             }
        //         })
        //         elem.style.backgroundColor = 'red'
        //     })
        //     console.log(ids)

        // }
        return (
            <div>
                <div id="sese"></div>
                {this.props.showMenu && 
                <div>
                    <button onClick={this.props.fireEnemy}>Fire</button>
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

export default connect(null)(Menu)