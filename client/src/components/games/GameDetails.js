import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame1, updateGame2} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import Menu from './Menu'
import MenuWithoutFire from './MenuWithoutFire'
import MenuGetPowerUpDamage from './MenuGetPowerUpDamage';
import './GameDetails.css'
import MenuGetPowerUpHealth from './MenuGetPowerUpHealth';


class GameDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      theRow: -1,
      theCell: -1,
      prevRow: -1,
      prevCell: -1,
      gameId: 0,
      board: '',
      showMenu: false,
      showMenuWithoutFire: false,
      showMenuPowerUpDamage: false,
      showMenuPowerUpHealth: false,
      rowCanFire: -1,
      cellCanFire: -1,
      rowToGetPowerUp: -1,
      cellToGetPowerUp: -1,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleMenuFalse = this.toggleMenuFalse.bind(this)
    this.toggleMenuWithoutFire = this.toggleMenuWithoutFire.bind(this)
    this.toggleMenuWithoutFireFalse = this.toggleMenuWithoutFireFalse.bind(this)
    this.toggleMenuPowerUpDamage = this.toggleMenuPowerUpDamage.bind(this)
    this.toggleMenuPowerUpDamageFalse = this.toggleMenuPowerUpDamageFalse.bind(this)
    this.toggleMenuPowerUpHealth = this.toggleMenuPowerUpHealth.bind(this)
    this.toggleMenuPowerUpHealthFalse = this.toggleMenuPowerUpHealthFalse.bind(this)
    this.setStateBack = this.setStateBack.bind(this)
  }

  setStateBack = () => {
    this.setState({
      theRow: -1,
      theCell: -1
    })
  }
  toggleMenu = () => {
    this.setState({ showMenu: true });
  }
  toggleMenuFalse = () => {
    this.setState({ showMenu: false });
  }

  toggleMenuWithoutFire = () => {
    this.setState({ showMenuWithoutFire: true })
  }
  toggleMenuWithoutFireFalse = () => {
    this.setState({ showMenuWithoutFire: false })
  }

  toggleMenuPowerUpDamage = () => {
    this.setState({ showMenuPowerUpDamage: true })
    console.log('Menu damage toggled')
  }
  toggleMenuPowerUpDamageFalse = () => {
    this.setState({ showMenuPowerUpDamage: false })
  }

  toggleMenuPowerUpHealth = () => {
    this.setState({ showMenuPowerUpHealth: true })
    console.log('Menu health toggled')
  }
  toggleMenuPowerUpHealthFalse = () => {
    this.setState({ showMenuPowerUpHealth: false })
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
    const {game, userId} = this.props
    const player = game.players.find(p => p.userId === userId)
    if (game.board[toRow][toCell] === null) {
      return 
    } else if (game.board[toRow][toCell].team !== game.turn || player.symbol !== game.board[toRow][toCell].team) {
      return
    } else if (game.board[toRow][toCell].team === game.turn && player.symbol === game.board[toRow][toCell].team) {
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
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        else if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
        this.toggleMenuWithoutFire()
        this.setState({
          gameId: game.id,
          board: game.board
        })
        console.log('No unit below you')
      } 
    }
    // If top right corner
    else if (toRow === 0 && toCell === 12) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
        this.toggleMenuWithoutFire()
        this.setState({
          gameId: game.id,
          board: game.board
        })
        console.log('No unit below you')
      }
    }
    // If bottom left corner
    else if (toRow === 6 && toCell === 0) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
        this.toggleMenuWithoutFire()
        this.setState({
          gameId: game.id,
          board: game.board
        })
        console.log('No unit above you')
      }
    }
    // If bottom right corner
    else if (toRow === 6 && toCell === 12) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
        this.toggleMenuWithoutFire()
        this.setState({
          gameId: game.id,
          board: game.board
        })
        console.log('No unit above you')
      } 
    }
    // If top row, but not in a corner 
    else if (toRow === 0 && (toCell !== 0 && toCell !== 12)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
        this.setState({
          gameId: game.id,
          board: game.board
        })
        console.log('No unit to your left')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit below you')
      }
    }
    // If bottom row, but not in a corner
    else if (toRow === 6 && (toCell !== 0 && toCell !== 12)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit above you')
      }
    } 
    // If left column, but not in corner
    else if (toCell === 0 && (toRow !== 0 && toRow !== 6)) {
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit below you')
      }
    }
    // If right column, but not in corner
    else if (toCell === 12 && (toRow !== 0 && toRow !== 6)) {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit below you')
      }
    } 
    // If in the middle of the board
    else {
      // Check left
      if (game.board[toRow][toCell-1] !== null && game.board[toRow][toCell-1] !== undefined) {
        if (game.board[toRow][toCell-1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell-1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell-1].team !== game.board[toRow][toCell].team) {
          this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy left of you')
        } 
        else {
          this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit left of you')
        }
      } 
      else {
        this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your left')
      }
      // Check right
      if (game.board[toRow][toCell+1] !== null && game.board[toRow][toCell+1] !== undefined) {
        if (game.board[toRow][toCell+1].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow][toCell+1].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow][toCell+1].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy right of you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit right of you')
        }
      } 
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit to your right')
      }
      // Check up
      if (game.board[toRow-1][toCell] !== null && game.board[toRow-1][toCell] !== undefined) {
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow-1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow-1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy above you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit above you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit above you')
      }
      // Check down
      if (game.board[toRow+1][toCell] !== null && game.board[toRow+1][toCell] !== undefined) {
        if (game.board[toRow+1][toCell].name.includes('Damage')) {
          this.toggleMenuPowerUpDamage()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell
          })
        }
        else if (game.board[toRow+1][toCell].name.includes('Health')) {
          this.toggleMenuPowerUpHealth()
          this.setState({
            gameId: game.id,
            board: game.board,
            rowToGetPowerUp: toRow,
            cellToGetPowerUp: toCell,
          })
        }
        if (game.board[toRow+1][toCell].team !== game.board[toRow][toCell].team) {
           this.toggleMenu()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Enemy below you')
        } 
        else {
           this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
          console.log('Friendly unit below you')
        }
      }
      else {
         this.toggleMenuWithoutFire()
          this.setState({
            gameId: game.id,
            board: game.board
          })
        console.log('No unit below you')
      }
  }
}

  // Make a move with the indexes from 'selectUnit()'
  makeMove = (toRow, toCell, prevRow, prevCell) => {
    const {game, updateGame1, userId} = this.props;
    console.log(toRow,toCell)
    const player = game.players.find(p => p.userId === userId)
    if (game.board[toRow][toCell] === null && game.turn === player.symbol) {
      if(toRow - prevRow < -3 || toRow - prevRow > 3) {
        console.log('cant move that far')
      }
      if(toCell - prevCell < -3 || toCell - prevCell > 3) {
        console.log('cant move that far')
      } else {

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
          theRow: 70, 
          theCell: 70,
          rowCanFire: toRow,
          cellCanFire: toCell
        }), setTimeout(() => {
          this.check(toRow, toCell)
        }, 500)
      } 
  } 
}

updateWithHealth = (id, game) => {
  this.props.updateGame2(id, game)
}

fire = (ids, unitFiring) => {
  const idsArr = ids.split('-')
  const row = idsArr[0]
  const cell = idsArr[1]
  const unitToHit = this.props.game.board[row][cell]
  const unitFiringHealth = this.props.game.board[unitFiring[0]][unitFiring[1]].health
  const unitFiringBaseDamage = this.props.game.board[unitFiring[0]][unitFiring[1]].baseDmg
  const luckFactor = () => {
    return Math.floor((Math.random() * (3)) + 9)
    }
  const calculateHpGain = (health) => {
      if ( (health/9 ) > 0.5) {
        return health
      } 
      else {
        return (health + 1)
      }
    }
    const calculateDamage = (health) => {
      return (Math.round( (unitFiringBaseDamage * luckFactor()) /100 ) * ( calculateHpGain(health) ) )
    }
    // Damage logic
    const calculateHP = (health) => {
    const damage = calculateDamage(health)
    if (damage >= 155) {
      return (unitToHit.health = unitToHit.health - 20)
    }
    else if (damage >= 145 && damage <= 154) {
      return (unitToHit.health = unitToHit.health - 15)
    }
    else if (damage >= 135 && damage <= 144) {
      return (unitToHit.health = unitToHit.health - 14)
    }
    else if (damage >= 125 && damage <= 134) {
      return (unitToHit.health = unitToHit.health - 13)
    }
    else if (damage >= 115 && damage <= 124) {
      return (unitToHit.health = unitToHit.health - 12)
    }
    else if (damage >= 105 && damage <= 114) {
      return (unitToHit.health = unitToHit.health - 11)
    }
    else if (damage >= 95 && damage <= 104) {
      return (unitToHit.health = unitToHit.health - 10)
    }
    else if (damage >= 85 && damage <= 94) {
      return (unitToHit.health = unitToHit.health - 9)
    }
    else if (damage >= 75 && damage <= 84) {
      return (unitToHit.health = unitToHit.health - 8)
    }
    else if (damage >= 65 && damage <= 74) {
      return (unitToHit.health = unitToHit.health - 7)
    }
    else if (damage >= 55 && damage <= 64) {
      return (unitToHit.health = unitToHit.health - 6)
    }
    else if (damage >= 45 && damage <= 54) {
      return (unitToHit.health = unitToHit.health - 5)
    }
    else if (damage >= 35 && damage <= 44) {
      return (unitToHit.health = unitToHit.health - 4)
    }
    else if (damage >= 25 && damage <= 34) {
      return (unitToHit.health = unitToHit.health - 3)
    }
    else if (damage >= 15 && damage <= 24) {
      return (unitToHit.health = unitToHit.health - 2)
    }
    else if (damage >= 5 && damage <= 14) {
      return (unitToHit.health = unitToHit.health - 1)
    }
    else {
      calculateHP(unitFiringHealth)
    }
  }
  calculateHP(unitFiringHealth)
  if(unitToHit.health < 1) {
    this.props.game.board[row][cell] = null
  }
  this.updateWithHealth(this.props.game.id, this.props.game.board)
}

fireEnemy = () => { 
  // console.log(this.props.game)
  // console.log(this.state)
  const props = this.props.game
  const rowToFire = this.state.rowCanFire
  const cellToFire = this.state.cellCanFire
  const unitFiring = [rowToFire, cellToFire]
  const unitFiringObject = this.props.game.board[rowToFire][cellToFire]
  const above = rowToFire-1
  const below = rowToFire+1
  const left = cellToFire-1
  const right = cellToFire+1
  let alreadyFired = false
  let ids = []
  
  props.board.map((row, rowIndex) => {
      if(above == rowIndex) {
          if(row[cellToFire] !== null && row[cellToFire] !== undefined) {
            if(unitFiringObject.team != row[cellToFire].team) {
              ids.push(`${rowIndex}-${cellToFire}`)
            }
          }
      }
      if(below == rowIndex) {
          if(row[cellToFire] !== null && row[cellToFire] !== undefined) {
            if(unitFiringObject.team != row[cellToFire].team) {
              ids.push(`${rowIndex}-${cellToFire}`)
            }
          }
      }
      if(rowIndex == rowToFire) {
          row.map((cell, cellIndex) => {
              if(left == cellIndex) {
                  if(cell !== null && cell !== undefined) {
                    if(unitFiringObject.team != cell.team) {
                      ids.push(`${rowIndex}-${cellIndex}`)
                    }
                  }
              }
              if(right == cellIndex) {
                  if(cell !== null && cell !== undefined) {
                    if(unitFiringObject.team != cell.team) {
                      ids.push(`${rowIndex}-${cellIndex}`)
                    }
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
            const elemsWithClass = document.getElementsByClassName('fireEnemyHover')
            const elems = [...elemsWithClass]
            elems.map(elem => {
              elem.classList.remove('fireEnemyHover')
            })
        }
    })
    elem.classList.add('fireEnemyHover')
  })
  this.toggleMenuFalse()
  this.toggleMenuWithoutFireFalse()
  this.setStateBack()
}

getPowerUpHealth = () => {
  const row = this.state.rowToGetPowerUp
  const cell = this.state.cellToGetPowerUp
  const increaseHealth = () => {
    this.props.game.board[row][cell].health = this.props.game.board[row][cell].health + 5
  }
  this.setState({
    rowToGetPowerUp: -1,
    cellToGetPowerUp: -1
  })
  increaseHealth(),
  console.log('row:' + row, 'cell:' + cell, this.props.game.board[row][cell])
  this.updateWithHealth(this.props.game.id, this.props.game.board)
}

getPowerUpDamage = () => {
  const row = this.state.rowToGetPowerUp
  const cell = this.state.cellToGetPowerUp
  const increaseBaseDamage = () => {
    this.props.game.board[row][cell].baseDmg = this.props.game.board[row][cell].baseDmg + 40
  }
  this.setState({
    rowToGetPowerUp: -1,
    cellToGetPowerUp: -1
  })
  increaseBaseDamage(),
  console.log('row:' + row, 'cell:' + cell, this.props.game.board[row][cell])
  this.updateWithHealth(this.props.game.id, this.props.game.board)
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
      <Menu showMenu={this.state.showMenu} fireEnemy={this.fireEnemy} board={this.state.board} cell={this.state.cellCanFire} row={this.state.rowCanFire} gameId={this.state.gameId} endTurn={this.props.updateGame2} toggleMenu={this.toggleMenu} toggleMenuFalse={this.toggleMenuFalse}/>
      <MenuWithoutFire setStateBack={this.setStateBack} showMenuWithoutFire={this.state.showMenuWithoutFire} toggleMenuWithoutFire={this.toggleMenuWithoutFire} endTurn={this.props.updateGame2} board={this.state.board} gameId={this.state.gameId} toggleMenuWithoutFireFalse={this.toggleMenuWithoutFireFalse} toggleMenuFalse={this.toggleMenuFalse}/>
      <MenuGetPowerUpDamage getPowerUpDamage={this.getPowerUpDamage} setStateBack={this.setStateBack} endTurn={this.props.updateGame2} showMenuPowerUpDamage={this.state.showMenuPowerUpDamage} toggleMenuPowerUpDamage={this.toggleMenuPowerUpDamage} toggleMenuPowerUpDamageFalse={this.toggleMenuPowerUpDamageFalse} board={this.state.board} gameId={this.state.gameId} toggleMenuFalse={this.toggleMenuFalse}/>
      <MenuGetPowerUpHealth getPowerUpHealth={this.getPowerUpHealth} setStateBack={this.setStateBack} endTurn={this.props.updateGame2} showMenuPowerUpHealth={this.state.showMenuPowerUpHealth} toggleMenuPowerUpHealth={this.toggleMenuPowerUpHealth} toggleMenuPowerUpHealthFalse={this.toggleMenuPowerUpHealthFalse} board={this.state.board} gameId={this.state.gameId} toggleMenuFalse={this.toggleMenuFalse}/>
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


