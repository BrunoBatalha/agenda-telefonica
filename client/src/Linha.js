import React from 'react';

class Linha extends React.Component {

    render = () => {
        return (
            <tr className='row bg-secondary text-white'>
                <th className='col-1'>{this.props.chave + 1}</th>
                <td className='col-11'>{this.props.item.nome}</td>
            </tr>
        );


    }
}

export default Linha;