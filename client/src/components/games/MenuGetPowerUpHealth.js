import * as React from 'react'

export default class MenuGetPowerUpHealth extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuPowerUpHealth && 
        <div>
            <button onClick={() => (
                this.props.toggleMenuPowerUpHealthFalse(),
                this.props.toggleMenuFalse(),
                this.props.setStateBack(),
                this.props.endTurn(this.props.gameId, this.props.board) 
                )}>
                Get HP power-up
            </button>
        </div>}
    </div>
)
}
}