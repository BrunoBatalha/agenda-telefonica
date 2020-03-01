require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const server = app.listen(process.env.PORT);;
const io = require('socket.io').listen(server);
const ContatoDao = require('./controllers/ContatoDao');

io.on('connection', async socket => {
    console.log(`Socket conectado: ${socket.id}`);

    try {
        const contatos = await ContatoDao.listar();
        socket.broadcast.emit('listarTela', contatos);
    } catch (err) { console.log(err); }

    socket.on('listarBanco', async () => {
        try {
            const contatos = await ContatoDao.listar();
            socket.broadcast.emit('listarTela', contatos);
        } catch (err) { console.log(err) }
    });

    socket.on('procurarBanco', async (nomeProcurado) => {
        try {
            if (nomeProcurado === '') {
                const contatos = await ContatoDao.listar();
                socket.broadcast.emit('listarTela', contatos);
            } else {
                const arr = await ContatoDao.procurar(nomeProcurado);
                socket.broadcast.emit('procurarTela', arr, nomeProcurado);
            }
        } catch (err) { console.log(err); }
    });

    socket.on('verContatoBanco', async (idContato) => {
        try {
            const contato = await ContatoDao.procurarId(idContato);
            socket.broadcast.emit('verContatoTela', contato);
        } catch (err) { console.log(err); }
    });

    socket.on('excluirDoBanco', async (idContato) => {
        try {
            await ContatoDao.excluir(idContato);
            const contatos = await ContatoDao.listar();
            socket.broadcast.emit('listarTela', contatos);
        } catch (err) { console.log(err); }
    });

    socket.on('atualizarBanco', async (contato) => {
        try {
            await ContatoDao.atualizar(contato);
            const contatos = await ContatoDao.listar();
            socket.broadcast.emit('listarTela', contatos);
        } catch (err) { console.log(err) }
    });

});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(require('./routes'));



