const Contato = require('../models/Contato');

module.exports.excluir = async (idContato) => {
    try {
        return await Contato.findByIdAndDelete(idContato);
    } catch (err) { return err }
}

module.exports.atualizar = async (contato) => {
    const { id, nome, telefone, descricao } = contato;
    try {
        return await Contato.findByIdAndUpdate(id,
            { nome: nome, telefone: telefone, descricao: descricao },
            { useFindAndModify: false });
    } catch (err) { return err; }
}

module.exports.adicionar = async (contato) => {
    const { nome, telefone, descricao } = contato;
    try {
        return await Contato.create({
            nome,
            telefone,
            descricao
        });
    } catch (err) { return err }
}

module.exports.listar = async () => {
    try {
        const arrContatos = await Contato.find();
        return ordenar_por_letras(arrContatos);
    } catch (err) {
        return err;
    }
}

ordenar_por_letras = (lista) => {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ'.split('');
    let ordem = [];
    for (let i = 0; i < alfabeto.length; i++) {
        ordem[i] = contatos_por_letra(lista, alfabeto[i]);
    }
    return ordem;
}

contatos_por_letra = (lista, letra) => {
    return lista.filter((item) =>
        item.nome.substring(0, 1).toUpperCase() === letra.toUpperCase()
    );
}

module.exports.procurar = async (nome) => {
    try {
        const arrContatos = await Contato.find({ nome: { $regex: '.*' + nome + '.*' } });
        return arrContatos;
    } catch (err) {
        return err
    }

}

module.exports.procurarId = async (idContato) => {
    try {
        return await Contato.findById(idContato);
    } catch (err) {
        return err
    }
}


return module.exports;

/**
 * const listas = listar();
    const listaTotal = []
    const procurado = new RegExp(nome);

    listas.forEach(lista => {
        const listaLetra = [];
        lista.forEach(item => {
            if (item.match(procurado)) {
                listaLetra.push(item);
            };
        });
        listaTotal.push(listaLetra);
    });
    return listaTotal
 *
 */