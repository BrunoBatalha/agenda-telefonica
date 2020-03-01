const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    nome: String,
    telefone: String,
    descricao: String
});

module.exports = mongoose.model('Contato', ContatoSchema);