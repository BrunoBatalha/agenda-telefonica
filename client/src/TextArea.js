import React from 'react';

class TextArea extends React.Component {
   render() {
      return (
         <div className='form-group'>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <textarea className='form-control'
               id={this.props.name}
               name={this.props.name}
               value={this.props.value}
               placeholder={this.props.placeholder}
               onChange={this.props.controla_input}
               style={{resize: 'none'}}
         />

         </div>
      );
   }
}

export default TextArea;