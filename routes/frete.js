const express = require('express')
const router = express.Router()
const frete = require('frete');

router.post('/sedex', (req, res) => {
    frete.cepOrigem('2910641').servico(frete.servicos.sedex);
    frete({
        cepDestino: req.body.cepDestino,
        peso: 1,
        formato: frete.formatos.caixaPacote,
        comprimento: 16,
        altura: 2,
        largura: 11,
        diametro: 1,
        maoPropria: frete.maoPropria.nao,
        valorDeclarado: 0,
        avisoRecebimento: frete.avisoRecebimento.nao
    }).precoPrazo(function (err, result) {
        return res.json(result)
        console.log(result);
    });

})

router.post('/pac', (req, res) => {
    frete.cepOrigem('2910641').servico(frete.servicos.pac);
    frete({
        cepDestino: req.body.cepDestino,
        peso: 1,
        formato: frete.formatos.caixaPacote,
        comprimento: 16,
        altura: 2,
        largura: 11,
        diametro: 1,
        maoPropria: frete.maoPropria.nao,
        valorDeclarado: 0,
        avisoRecebimento: frete.avisoRecebimento.nao
    }).precoPrazo(function (err, result) {
        console.log(err);
        return res.json(result)
    });

})

module.exports = router