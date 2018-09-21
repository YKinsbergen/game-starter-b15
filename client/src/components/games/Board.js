import React from 'react'
import './Board.css'

const renderCel = (selectUnit, rowIndex, cellIndex, symbol, hasTurn, theState, makeMove) => {
  if(symbol !== null) {
    return (
      <button
        className="board-tile"
        id={`${rowIndex}-${cellIndex}`}
        disabled={hasTurn}
        onClick={() => {
          if (theState.theRow < 0){
          return selectUnit(rowIndex, cellIndex) } 
          else if (theState.theRow >= 0 && theState.theRow < 69) {
          return makeMove(rowIndex, cellIndex) 
        }
          else if (theState.theRow >= 71) {
          return console.log('Can only move once')
          }
        }
        } 
        key={`${rowIndex}-${cellIndex}`}
      >{symbol.name}&nbsp;{symbol.health}</button>
    )
  } else {
    return (
      <button
        className="board-tile"
        id={`${rowIndex}-${cellIndex}`}
        disabled={hasTurn}
        onClick={() => {
          if (theState.theRow < 0){
          return selectUnit(rowIndex, cellIndex) } 
          else if (theState.theRow >= 0 && theState.theRow < 69) {
          return makeMove(rowIndex, cellIndex, theState.theRow, theState.theCell)
          }
          else if (theState.theRow >= 70) {
            return console.log('Can only move once')
          }
        }
        } 
        key={`${rowIndex}-${cellIndex}`}
      >{'-'}</button>
    )
  }
}

export default ({board, selectUnit, theState, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(selectUnit, rowIndex, cellIndex,symbol,false, theState, makeMove))}
  </div>
)
