import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'red' | 'blue'
export type Base = {name:'TankR' | 'TankB', health:20, team:'red' | 'blue', baseDmg: 60}
export type damageUp = {name: 'Damage+', value: 40}
export type healthUp = {name: 'Health+', value: 5}

// export type Team = 'red' | 'blue'
export type Unit = {
  name: 'John',
  team: 'red',
  health: 10,
  type: 'infantry' | 'vehicle' | 'bazooka',
  baseDmg: 60
} | {
  name: 'Jane',
  team: 'blue',
  health: 10,
  type: 'infantry' | 'vehicle' | 'bazooka',
  baseDmg: 60
}

// const baseUnit: Unit = {
//   name: 'x',
//   team: 'r',
//   Health: 10,
//   type: 'infantry'
// }
export type Units = [Unit, Unit, Unit]
export type UnitsRedBlue = {red:Units, blue:Units}

export type Row = [ Unit | Base | damageUp | healthUp | null,
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null, 
  Unit | Base | damageUp | healthUp | null ]

export type Board = [ Row, Row, Row, Row, Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null, null, null, null, null, null, null, null, null, null, null]

const rowTop: Row = [null, null, null, null, null, null, null, null, {name: 'Damage+', value: 40}, null, null, null, null]
const rowBottom: Row = [null, null, null, null, {name: 'Damage+', value: 40}, null, null, null, null, null, null, null, null]

const rowWithHpTop: Row = [{name: 'John',team: 'red',health: 10,type: 'infantry', baseDmg: 60}, null, null, null, null, {name: 'Health+', value: 5}, null, null, null, null, null, null, {name: 'Jane',team: 'blue',health: 10,type: 'infantry', baseDmg: 60}]
const rowWithHpBottom: Row = [{name: 'John',team: 'red',health: 10,type: 'infantry', baseDmg: 60}, null, null, null, null, null, null, {name: 'Health+', value: 5}, null, null, null, null, {name: 'Jane',team: 'blue',health: 10,type: 'infantry', baseDmg: 60}]

const rowMiddle: Row = [{name:'TankR', health:20, team:'red', baseDmg: 60}, {name: 'John',team: 'red',health: 10,type: 'infantry', baseDmg: 60}, null, null, null, null, null, null, null, null, null, {name: 'Jane',team: 'blue',health: 10,type: 'infantry', baseDmg: 60}, {name:'TankB', health:20, team:'blue', baseDmg: 60}]

const emptyBoard: Board = [ emptyRow, rowTop, rowWithHpTop, rowMiddle, rowWithHpBottom, rowBottom, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('text', {default: 'red'})
  turn: Symbol

  @Column('char', {nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('text')
  symbol: Symbol
}
