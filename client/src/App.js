import React from 'react';
import FormNovoContato from './FormNovoContato';
import FormPesquisa from './FormPesquisa';
import ListaContatos from './ListaContatos';

class App extends React.Component {
   render() {
      return (
         <div className='container py-2 h-100'>
            <div className='row'>
               {/**Formulário Novo Contato */}
               <div className='col-md-12 col-lg-5'>
                  <h4>Novo contato</h4>
                  <FormNovoContato />
               </div>

               {/**Linha vertical */}
               <div className='col-md-1 d-none d-sm-none d-lg-block'>
                  <hr className='linha-vertical bg-primary'></hr>
               </div>

               {/**Linha horizontal */}
               <div className='col-12 d-lg-none d-block'>
                  <hr className='linha-horizontal bg-primary'></hr>
               </div>

               <div className='col-md-12 col-lg-6 h-100'>
                  {/**Formulário Pesquisa*/}
                  <div className='col-12'>
                     <h4>Contatos</h4>
                     <FormPesquisa />
                  </div>

                  {/**Linha horizontal */}
                  <div className='col-12'>
                     <hr className='linha-horizontal bg-primary'></hr>
                  </div>

                  {/**Tabela */}
                  <div className='col-12 overflow-auto scroll'>
                     <ListaContatos />
                  </div>
               </div>

            </div>
         </div>
      );
   }
}

export default App;
