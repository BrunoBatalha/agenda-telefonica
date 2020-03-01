import React from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import api from './api';
import io from 'socket.io-client';
const socket = io('http://localhost:9000/');

class FormNovoContato extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         contatoAtual: {},
         id: 'Este campo será preenchido automaticamente',
         nome: '',
         telefone: '',
         descricao: '',
         btnAdicionarOff: false,
         btnAtualizarOff: true,
         btnExcluirOff: true,
         btnCriarNovoOff: true
      }
      this.controla_submit = this.controla_submit.bind(this);
      this.controla_input = this.controla_input.bind(this);
      this.excluir = this.excluir.bind(this);
      this.atualizar = this.atualizar.bind(this);

      socket.on('verContatoTela', (contato) => {
         window.scrollTo(0, 0);
         this.setState({
            id: contato._id,
            contatoAtual: contato,
            nome: contato.nome,
            telefone: contato.telefone,
            descricao: contato.descricao,
            btnAdicionarOff: true,
            btnAtualizarOff: false,
            btnExcluirOff: false,
            btnCriarNovoOff: false
         });
      });
   }

   controla_submit = event => {
      event.preventDefault();
      api.post('novoContato', this.state).then((response) => {
         socket.emit('listarBanco');
      }).catch(err => {
         alert(err.message);
      });
   }

   controla_input = event => {
      const { value, name } = event.target
      this.setState({
         [name]: value
      });
   }

   limpa_inputs = () => {
      this.setState({
         id: 'Este campo será preenchido automaticamente',
         nome: '',
         telefone: '',
         descricao: '',
         btnAdicionarOff: false,
         btnAtualizarOff: true,
         btnExcluirOff: true,
         btnCriarNovoOff: true
      });
   }

   excluir = () => {
      socket.emit('excluirDoBanco', this.state.id);
      this.limpa_inputs();
   }

   atualizar = () => {
      const contato = {
         id: this.state.id,
         nome: this.state.nome,
         telefone: this.state.telefone,
         descricao: this.state.descricao
      }
      socket.emit('atualizarBanco', contato);
      this.limpa_inputs();
   }

   render() {
      return (
         <form onSubmit={this.controla_submit}>
            <Input
               type='text'
               label='Id'
               value={this.state.id}
               name='id'
               apenasLeitura={true} />
            <Input
               type='text'
               label='Nome'
               placeholder='Informe o nome do contato'
               name='nome'
               value={this.state.nome}
               controla_input={this.controla_input} />
            <Input
               type='text'
               label='Telefone'
               placeholder='Informe o número de telefone'
               name='telefone'
               value={this.state.telefone}
               controla_input={this.controla_input} />
            <TextArea
               type='number'
               label='Descrição'
               placeholder='Faça uma breve descrição sobre este contato'
               name='descricao'
               value={this.state.descricao}
               controla_input={this.controla_input} />
            <div className='row'>
               <div className='col-3 text-center'>
                  <Button
                     classButton='btn btn-primary btn-block'
                     type='submit'
                     value='Adicionar'
                     ativo={this.state.btnAdicionarOff} />
               </div>
               <div className='col-3 text-center'>
                  <Button
                     classButton='btn btn-primary btn-block'
                     type='button'
                     cliqueBotao={this.atualizar}
                     value='Atualizar'
                     ativo={this.state.btnAtualizarOff} />
               </div>
               <div className='col-3 text-center'>
                  <Button
                     classButton='btn btn-primary btn-block'
                     type='button'
                     value='Excluir'
                     cliqueBotao={this.excluir}
                     ativo={this.state.btnExcluirOff} />
               </div>
               <div className='col-3 text-center'>
                  <Button
                     classButton='btn btn-primary btn-block'
                     type='button'
                     cliqueBotao={this.limpa_inputs}
                     value='Criar novo'
                     ativo={this.state.btnCriarNovoOff} />
               </div>
            </div>
         </form>
      );
   }
}

export default FormNovoContato;
