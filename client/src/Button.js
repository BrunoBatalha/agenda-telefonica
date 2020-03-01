import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button
                className={this.props.classButton}
                type={this.props.type}
                disabled={this.props.ativo}
                onClick={this.props.cliqueBotao}>
                {this.props.value}
            </button>
        );
    }
}

export default Button;