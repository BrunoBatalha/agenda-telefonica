import React from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:9000/');

class Tabela extends React.Component {

    constructor(props) {
        super(props);
        this.clique_botao = this.clique_botao.bind(this);
    }

    clique_botao = (event) => {
        socket.emit('verContatoBanco', event.target.dataset.id);
    }

    render = () => {
        return (
            <table className='table'>
                <tbody>
                    <tr className='bg-success text-white'>
                        <th className='text-center'>{this.props.letra}</th>
                    </tr>
                    {this.props.contatos.map((item, i) =>
                        <tr className='row px-2 bg-secondary text-white' key={i}>
                            <td className='col-1 col-sm-1'>
                                {i + 1}
                            </td>
                            <td className='col-5 col-sm-9'>
                                {item.nome}
                            </td>
                            <td className='col-5 col-sm-2'>
                                <button className='btn btn-block btn-primary m-0' onClick={this.clique_botao} data-id={item._id}>Ver</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default Tabela;