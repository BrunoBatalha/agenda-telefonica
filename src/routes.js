const routes = require('express').Router();
const ContatoDao = require('./controllers/ContatoDao');
const Contato = require('./models/Contato');

routes.get('/', (req, res) => {
    return res.send('Servidor rodando...');
});

routes.post('/novoContato', async (req, res) => {
    try {
        await ContatoDao.adicionar(req.body)
        const contatos = ContatoDao.listar();
        return res.json(contatos);
    } catch (error) {
        return res.json(error);
    }
});

routes.post('/procurar', async (req, res) => {
    const {procurar:procurado} = req.body;
    res.send(procurado);
});

routes.get('/deletaTodos', async (req, res) => {
    const contatos = await Contato.deleteMany();
    return res.json(contatos);
});

module.exports = routes;