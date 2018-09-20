import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame1, updateGame2} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import Menu from './Menu'
import './GameDetails.css'

class GameDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      theRow: -1,
      theCell: -1,
      gameId: 0,
      board: '',
      showMenu: false,
      rowCanFire: -1,
      cellCanFire: -1
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu = function() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)
  
  // Select a unit
  selectUnit = (toRow, toCell) => {
    const {game} = this.props
    if (game.board[toRow][toCell] === null) {
      return 
    } else if (game.board[toRow][toCell].team !== game.turn) {
      return
    } else if (game.board[toRow][toCell].team === game.turn) {
      return this.setState({
        theRow: toRow, 
        theCell: toCell
      })
    }
  }

  // Check the vicinity of the moved unit
  check = (toRow, toCell) => {
    const {game} = this.props
    // If top left corner
    if (toRow === 0 && toCell === 0) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      } 
    }
    // If top right corner
    else if (toRow === 0 && toCell === 5) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      }
    }
    // If bottom left corner
    else if (toRow === 5 && toCell === 0) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      }
    }
    // If bottom right corner
    else if (toRow === 5 && toCell === 5) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      } 
    }
    // If top row, but not in a corner 
    else if (toRow === 0 && (toCell !== 0 && toCell !== 5)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          console.log('Enemy left of you')
        } 
        else {
          console.log('Friendly unit left of you')
        }
      } 
      else {
        console.log('No unit to your left')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      }
    }
    // If bottom row, but not in a corner
    else if (toRow === 5 && (toCell !== 0 && toCell !== 5)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          console.log('Enemy left of you')
        } 
        else {
          console.log('Friendly unit left of you')
        }
      } 
      else {
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      }
    } 
    // If left column, but not in corner
    else if (toCell === 0 && (toRow !== 0 && toRow !== 5)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      }
    }
    // If left column, but not in corner
    else if (toCell === 5 && (toRow !== 0 && toRow !== 5)) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      }
    } 
    // If in the middle of the board
    else {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          console.log('Enemy right of you')
        } 
        else {
          console.log('Friendly unit right of you')
        }
      } 
      else {
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy above you')
        } 
        else {
          console.log('Friendly unit above you')
        }
      }
      else {
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          console.log('Enemy below you')
        } 
        else {
          console.log('Friendly unit below you')
        }
      }
      else {
        console.log('No unit below you')
      }
  }
}

  // Make a move with the indexes from 'selectUnit()'
  makeMove = (toRow, toCell) => {
    const {game, updateGame1} = this.props

    if (game.board[toRow][toCell] === null) {
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.board[this.state.theRow][this.state.theCell]
        else if (rowIndex === this.state.theRow 
          && cellIndex === this.state.theCell) return null
        else return cell
      })
      )
      // Do a 'soft' update of the game, not ending the turn
    updateGame1(game.id, board)
    this.setState({
      theRow: -1, 
      theCell: -1,
      rowCanFire: toRow,
      cellCanFire: toCell
    }), setTimeout(() => {
      this.check(toRow, toCell)
    }, 400) 
  } 
}


fire = (ids, unitFiring) => {
  const idsArr = ids.split('-')
  const row = idsArr[0]
  const cell = idsArr[1]
  const unitToHit = this.props.game.board[row][cell]
  const unitFiringHealth = this.props.game.board[unitFiring[0]][unitFiring[1]].health
  const luckFactor = () => {
    console.log('random number' + Math.floor(Math.random() * (12 - 9) + 9))
    return Math.floor(Math.random() * (12 - 9) + 9)
    }
  const calculateHpGain = (health) => {
      if ( (health/9 ) > 0.5) {
        return health
      } 
      else {
        return health + 1
      }
    }
    const calculateDamage = (health) => {
      console.log('Calculate damage' + ( (60 * luckFactor())/100) * (calculateHpGain(health) ))
      return ((60 * luckFactor())/100) * (calculateHpGain(health))
    }
    // Damage logic
    const calculateHP = () => {
    if (calculateDamage(unitFiringHealth) >= 85) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 9
    }
    else if (calculateDamage(unitFiringHealth) >= 75) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 8
    }
    else if (calculateDamage(unitFiringHealth) >= 65 && calculateDamage(unitFiringHealth) < 74) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 7
    }
    else if (calculateDamage(unitFiringHealth) >= 55 && calculateDamage(unitFiringHealth) < 64) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 6
    }
    else if (calculateDamage(unitFiringHealth) >= 45 && calculateDamage(unitFiringHealth) < 54) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 5
    }
    else if (calculateDamage(unitFiringHealth) >= 35 && calculateDamage(unitFiringHealth) < 44) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 4
    }
    else if (calculateDamage(unitFiringHealth) >= 25 && calculateDamage(unitFiringHealth) < 34) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 3
    }
    else if (calculateDamage(unitFiringHealth) >= 15 && calculateDamage(unitFiringHealth) < 24) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 2
    }
    else if (calculateDamage(unitFiringHealth) >= 5 && calculateDamage(unitFiringHealth) < 14) {
      console.log(unitToHit.health)
      unitToHit.health = unitToHit.health - 1
    }
  }
  calculateHP()
  if(unitToHit.health < 1) {
    this.props.game.board[row][cell] = null
  }
  this.props.updateGame2(this.props.game.id, this.props.game.board)
}

fireEnemy = () => { 
  // console.log(this.props.game)
  // console.log(this.state)
  const props = this.props.game
  const rowToFire = this.state.rowCanFire
  const cellToFire = this.state.cellCanFire
  const unitFiring = [rowToFire, cellToFire]
  const above = rowToFire-1
  const below = rowToFire+1
  const left = cellToFire-1
  const right = cellToFire+1
  let alreadyFired = false
  let ids = []
  
  props.board.map((row, rowIndex) => {
      if(above == rowIndex) {
          if(row[cellToFire] !== null && row[cellToFire] !== undefined) {
              ids.push(`${rowIndex}-${cellToFire}`)
          }
      }
      if(below == rowIndex) {
          if(row[cellToFire] !== null && row[cellToFire] !== undefined) {
              ids.push(`${rowIndex}-${cellToFire}`)
          }
      }
      if(rowIndex == rowToFire) {
          row.map((cell, cellIndex) => {
              if(left == cellIndex) {
                  if(cell !== null && cell !== undefined) {
                      ids.push(`${rowIndex}-${cellIndex}`)
                  }
              }
              if(right == cellIndex) {
                  if(cell !== null && cell !== undefined) {
                      ids.push(`${rowIndex}-${cellIndex}`)
                  }
              }
          })
      }
  })
  ids.map(id => {
      const elem = document.getElementById(id)
      const fire = this.fire
      elem.addEventListener("click", function(){
          if(!alreadyFired) {
              fire(id, unitFiring)
              alreadyFired = true
              elem.style.backgroundColor = 'transparent'
          }
      })
      elem.style.backgroundColor = 'red'
  })
}


  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>
      <Menu showMenu={this.state.showMenu} fireEnemy={this.fireEnemy} board={this.state.board} cell={this.state.cellCanFire} row={this.state.rowCanFire} gameId={this.state.gameId} endTurn={this.props.updateGame2} toggleMenu={this.toggleMenu}/>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>
          It's your turn!
        </div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} selectUnit={this.selectUnit} theState={this.state} makeMove={this.makeMove}/>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame1, updateGame2
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)


