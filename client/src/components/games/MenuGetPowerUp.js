import * as React from 'react'

export default class MenuGetPowerUp extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuWithoutFire && 
        <div>
            <button onClick={() => (
                this.props.toggleMenuWithoutFireFalse(),
                this.props.toggleMenuFalse(),
                this.props.setStateBack(),
                this.props.endTurn(this.props.gameId, this.props.board) 
                )}>
                Get power-up
            </button>
        </div>}
    </div>
)
}
}