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
    }, 300) 
  } 
}

  ohm = (ids, unitFiring) => {
    const idsArr = ids.split('-')
    const row = idsArr[0]
    const cell = idsArr[1]
    const row2 = unitFiring[0]
    const cell2 = unitFiring[1]
    const unitToHit = this.props.game.board[row][cell]
    unitToHit.health = unitToHit.health - 5
    if(unitToHit.health < 1) {
      this.props.game.board[row][cell] = null
    }
    this.props.updateGame2(this.props.game.id, this.props.game.board)
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
      <Menu showMenu={this.state.showMenu} ohm={this.ohm} board={this.state.board} cell={this.state.cellCanFire} row={this.state.rowCanFire} gameId={this.state.gameId} endTurn={this.props.updateGame2} toggleMenu={this.toggleMenu}/>

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


