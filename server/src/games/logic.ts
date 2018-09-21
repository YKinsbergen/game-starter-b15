// import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row} from './entities'

// @ValidatorConstraint()
// export class IsBoard implements ValidatorConstraintInterface {

//   validate(board: Board) {
//     const symbols = [ {name: 'john',team: 'red',health: 10,type: 'infantry'}, 
//                       {name: 'john',team: 'red',health: 10,type: 'infantry'}, 
//                       {name:'HQ', health:20, team:'blue'}, null ]
//     return board.length === 6 &&
//       board.every(row =>
//         row.length === 6 &&
//         row.every(symbol => symbols.includes(symbol))
//       )
//   }
// }

// export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
//   const changes = from
//     .map(
//       (row, rowIndex) => row.map((symbol, columnIndex) => ({
//         from: symbol, 
//         to: to[rowIndex][columnIndex]
//       }))
//     )
//     .reduce((a,b) => a.concat(b))
//     .filter(change => change.from !== change.to)

//   return changes.length === 1 && 
//     changes[0].to === playerSymbol && 
//     changes[0].from === null
// }

export const calculateWinner = (board: Board): any => {
  const unitsStillStanding:any[] = []
  const teams:string[] = []
  board.map(row => {
    row.map(cell => {
      if(cell !== null && cell.hasOwnProperty('health')) {
        unitsStillStanding.push(cell)
      }
    })
  })
  unitsStillStanding.map(unit => {
    if(unit !== undefined) {
      teams.push(unit.team)
    }
  })
  function isBelowThreshold(currentValue) {
    return currentValue === 'red';
  }
  return teams.every(isBelowThreshold)
}
  

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)
