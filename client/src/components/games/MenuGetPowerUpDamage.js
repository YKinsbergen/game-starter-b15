import * as React from 'react'

export default class MenuGetPowerUpDamage extends React.Component {
    render() {

return (
    <div>
        <div id="sese"></div>
        {this.props.showMenuPowerUpDamage && 
        <div>
            <button onClick={() => (
                this.props.getPowerUpDamage(),
                this.props.toggleMenuPowerUpDamageFalse(),
                this.props.toggleMenuFalse(),
                this.props.setStateBack())}>
                Get damage power-up
            </button>
        </div>}
    </div>
)
}
}