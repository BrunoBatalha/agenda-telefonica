import React from 'react';
import Tabela from './Tabela';
import io from 'socket.io-client';
const socket = io('http://localhost:9000/');
const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ'.split('');

class ListaContatos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaContatoPorLetra: [],
            procurando: false,
            nomeProcurado: ''
        };

        socket.on('listarTela', lista => {
            this.setState({
                listaContatoPorLetra: lista,
                procurando: false,
                nomeProcurado: ''
            });
        });

        socket.on('procurarTela', (lista, nomeProcurado) => {
            console.log('procurarTela');
            this.setState({
                listaContatoPorLetra: lista,
                procurando: true,
                nomeProcurado: nomeProcurado
            });
        });
    }

    render = () => {
        if (!this.state.procurando) {
            return (this.state.listaContatoPorLetra.map((lista, i) =>
                lista.length ? (<Tabela contatos={lista} key={i} letra={alfabeto[i]} />) : (null)
            ))
        } else return <Tabela contatos={this.state.listaContatoPorLetra} letra={`Procurando: "${this.state.nomeProcurado}" `} />
    }
}

export default ListaContatos;