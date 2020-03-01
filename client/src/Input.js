import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input className='form-control'
                    id={this.props.name}
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    placeholder={this.props.placeholder} 
                    onChange={this.props.controla_input}
                    readOnly={this.props.apenasLeitura}
                    />
            </div>
        );
    }
}

export default Input;