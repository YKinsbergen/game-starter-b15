import * as React from 'react'

export default class MenuWithoutFire extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuWithoutFire && 
        <div>
            <button onClick={() => (
                this.props.toggleMenuWithoutFireFalse(),
                this.props.toggleMenuFalse(),
                this.props.endTurn(this.props.gameId, this.props.board) 
                )}>
                End turn
            </button>
        </div>}
    </div>
)
}
}