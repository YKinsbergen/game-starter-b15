import * as React from 'react'

export default class MenuGetPowerUpDamage extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuPowerUpDamage && 
        <div>
            <button onClick={() => (
                this.props.toggleMenuPowerUpDamageFalse(),
                this.props.toggleMenuFalse(),
                this.props.setStateBack(),
                this.props.endTurn(this.props.gameId, this.props.board) 
                )}>
                Get damage power-up
            </button>
        </div>}
    </div>
)
}
}