import * as React from 'react'

export default class MenuGetPowerUpHealth extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuPowerUpHealth && 
        <div>
            <button onClick={() => (
                this.props.getPowerUpHealth(),
                this.props.toggleMenuPowerUpHealthFalse(),
                this.props.toggleMenuFalse(),
                this.props.toggleMenuWithoutFireFalse(),
                this.props.setStateBack())}>
                Get HP power-up
            </button>
        </div>}
    </div>
)
}
}