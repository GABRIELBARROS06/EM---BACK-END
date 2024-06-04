/************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API no projeto
 * Data: 21/05
 * Autor: Vitor Paes Kolle 
 * Versão: 1.0 
 ***********************************************************************************************************/

//Import das Bibliotecas que serão usadas no projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


/***************************** Import das Controllers **********************************/
const controllerCategoriaVagas = require('./controller/controller_categoriaVaga.js')
const controllerCliente = require('./controller/controller_cliente.js')
const controllerCor = require('./controller/controller_cor.js')
const controllerFormaPagamento = require('./controller/controller_formaPagamento.js')
const controllerFuncionario = require('./controller/controller_funcionario.js')
const controllerPagamentos = require('./controller/controller_pagamento.js')
const controllerRecibo = require('./controller/controller_recibo.js')
const controllerReserva = require('./controller/controller_reserva.js')
const controllerTipoVeiculo = require('./controller/controller_tipoVeiculo.js')
const controllerVaga = require('./controller/controller_vaga.js')
const controllerVeiculo = require('./controller/controller_veiculo.js')
const controller_marca = require('./controller/controller_marca.js')
const controller_categoriaVaga = require('./controller/controller_categoriaVaga.js')
/**************************************************************************************/

//Criação do app
const app = express()

//Mostrar como usar o App
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON =  bodyParser.json()

/************************************Endpoints de Clientes*************************************/
//Get de Todos os Clientes
app.get('/v1/estacionaMais/clientes', cors(), async function(request, response){
    
    let dadosClientes = await controllerCliente.getAllClientes()

    response.status(dadosClientes.status_code)
    response.json(dadosClientes)
})

//Get de cliente filtrando pelo id
app.get('/v1/estacionaMais/cliente/:id', cors(), async function(request, response){
    let id = request.params.id
    
    let dadosCliente = await controllerCliente.getByIdCliente(id)

    response.status(dadosCliente.status_code)
    response.json(dadosCliente)
})
//Post de Clientes
app.post('/v1/estacionaMais/cliente', cors(), bodyParserJSON, async function(request, response){
    const contentType = request.header('content-type')

    let dadosCliente = request.body

    let resultDadosCliente = await controllerCliente.setInserirCliente(dadosCliente, contentType)

    response.status(resultDadosCliente.status_code)
    response.json(resultDadosCliente)
})


/****************************Endpoint de Tipo de Veiculos**************** */
//Funcionando
app.get('/v1/estacionaMais/tipoVeiculos', cors(), async function(request,response){

    let dadosVeiculo = await controllerTipoVeiculo.getListarTiposVeiculos()
    
    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
    
    
    })
    
    //Funcionando
    app.get('/v1/estacionaMais/tipoVeiculo', cors(), async function(request, response){
    
        let nomeVeiculo = request.query.tipo_veiculo
    
    let dadosVeiculo = await controllerTipoVeiculo.getBuscarNomeVeiculo(nomeVeiculo)
    
    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
    
    })
    //Funcinonando
    app.post('/v1/estacionaMais/novoTipoVeiculo', cors(), bodyParserJSON, async function(request, response){
    
        const contentType = request.header('content-type');
        console.log(contentType);
    
        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body
    
        let resultDadosNovoTipoVeiculo = await controllerTipoVeiculo.setInserirTipoVeiculo(dadosBody, contentType);
    
        console.log(resultDadosNovoTipoVeiculo)
        response.status(resultDadosNovoTipoVeiculo.status_code)
        response.json(resultDadosNovoTipoVeiculo)
    
    
    })
    
    app.put('/v1/estacionaMais/updateTipoVeiculo/:id', cors(), bodyParserJSON, async function(request, response){
    
        const contentType = request.header('content-type');
        console.log(contentType);
    
        let idV = request.params.id
    
        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body
    
        let resultDadosNovoTipo = await controllerTipoVeiculo.setAtualizarVeiculo(dadosBody, contentType, idV);
    
        console.log(resultDadosNovoTipo)
        response.status(resultDadosNovoTipo.status_code)
        response.json(resultDadosNovoTipo)
    
    })
    
    app.delete('/v1/estacionaMais/deleteTipoVeiculo/:id', cors(), async function(request, response){
    
    
        let idV = request.params.id
    
        let dadosVeiculo= await controllerTipoVeiculo.setExcluirTipoVeiculo(idV)
    
        response.status(dadosVeiculo.status)
        response.json(dadosVeiculo)
    
    
    })

/**************************************CRUD DE MARCAS******************************************/    
app.get('/v1/estacionaMais/listarMarcas', cors(), async function(request, response){

let resultDadosMarcas = await controller_marca.getListarMarca()

response.status(resultDadosMarcas.status_code)
response.json(resultDadosMarcas)



})

app.get('/v1/estacionaMais/marca/:id', cors(), async function(request, response){

let idMarca = request.params.id

let resultDadosMarcas = await controller_marca.getListarMarcaById(idMarca)

response.status(resultDadosMarcas.status_code)
response.json(resultDadosMarcas)


})

app.post('/v1/estacionaMais/novaMarca', cors(), bodyParserJSON, async function(request, response){

    const contentType = request.header('content-type');
    console.log(contentType);

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaMarca= await controller_marca.setInserirMarca(dadosBody, contentType);

    console.log(resultDadosNovaMarca)
    response.status(resultDadosNovaMarca.status_code)
    response.json(resultDadosNovaMarca)



})
app.delete('/v1/estacionaMais/deleteMarca/:id', cors(), async function(request, response){

let id = request.params.id

let resultDadosMarcas = await controller_marca.setExcluirMarca(id)

response.status(resultDadosMarcas.status_code)
response.json(resultDadosMarcas)

})
app.put('/v1/estacionaMais/novaMarca/:id', cors(), bodyParserJSON, async function(request, response){

    let idV = request.params.id

    const contentType = request.header('content-type');
    console.log(contentType);

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaMarca= await controller_marca.setInserirMarca(dadosBody, contentType, idV);

    console.log(resultDadosNovaMarca)
    response.status(resultDadosNovaMarca.status_code)
    response.json(resultDadosNovaMarca)



})

/******************************************ENDPOINTS DE VEICULO*************************/

app.get('/v1/estacionaMais/listarVeiculos', cors(), async function(request, response){

let resultDadosNovoVeiculo = await controllerVeiculo.getListarVeiculos()

response.status(resultDadosNovoVeiculo.status_code)
response.json(resultDadosNovoVeiculo)

})
app.get('/v1/estacionaMais/buscarIdVeiculo/:id', cors(), async function(request, response){

let idV = request.params.id

let resultDadosVeiculos = await controllerVeiculo.getBuscarIdVeiculo(idV)

response.status(resultDadosVeiculos.status_code)
response.json(resultDadosVeiculos)

})

app.post('/v1/estacioMais/novoVeiculo', cors(), bodyParserJSON, async function(request, response){

    const contentType = request.header('content-type');
    console.log(contentType);

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovoVeiculo= await controllerVeiculo.setInserirVeiculo(dadosBody, contentType);

    console.log(resultDadosNovoVeiculo)
    response.status(resultDadosNovoVeiculo.status_code)
    response.json(resultDadosNovoVeiculo)


})

app.put('/v1/estacionaMais/updateVeiculo/:id', cors(), bodyParserJSON, async function(request, response){

    let idV = request.params.id

const contentType = request.header('content-type');
console.log(contentType);

// Recebe todos os dados encaminhados na requisição pelo body        
let dadosBody = request.body

let resultDadosNovoVeiculo= await controllerVeiculo.setAtualizarVeiculo(dadosBody, contentType, idV);

console.log(resultDadosNovoVeiculo)
response.status(resultDadosNovoVeiculo.status_code)
response.json(resultDadosNovoVeiculo)

})

app.delete('/v1/estacionaMais/excluirVeiculo/:id', cors(), async function(request, response){

let idV = request.params.id

let resultDadosVeiculos = await controllerVeiculo.setExcluirVeiculo(idV)

console.log(resultDadosVeiculos);
response.status(resultDadosVeiculos.status_code)
response.json(resultDadosVeiculos)


})
//get de cores
app.get('/v1/estacionaMais/cores', cors(), async function (request, response) {

    let dadosCores = await controllerCor.getListarCores()

    response.status(dadosCores.status_code)
    response.json(dadosCores)
})

//get de cores filtrando pelo id
app.get('/v1/estacionaMais/cor/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosCores = await controllerCor.getBuscarCor(id)

    response.status(dadosCores.status_code)
    response.json(dadosCores)
})


//post de cor
app.post('/v1/estacionaMais/cor', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaCor = await controllerCor.setInserirCor(dadosBody, contentType)

    response.status(resultDadosNovaCor.status_code)
    response.json(resultDadosNovaCor)
})


//delete de core
app.delete('/v1/estacionaMais/cor/:id', cors(), async function (request, response) {
    let idCor = request.params.id

    let dadosCor = await controllerCor.setExcluirCor(idCor)

    response.status(dadosCor.status_code)
    response.json(dadosCor)
})


//put de cor
app.put('/v1/estacionaMais/cor/:id', cors(), bodyParserJSON, async function (request, response) {

    const contentType = request.header('content-type')

    let idCor = request.params.id

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovaCor = await controllerCor.setAtualizarCor(dadosBody, contentType, idCor);

    response.status(resultDadosNovaCor.status_code)
    response.json(resultDadosNovaCor)
})


/**********************************CRUD DE CATEGORIAS DE VAGAS*****************************************/
app.get('/v1/estacionaMais/listarTipoVaga', cors(), async function(request, response){
    let resultDadosTipoVagas = await controller_categoriaVaga.getListarTipoVaga()

    console.log(resultDadosTipoVagas);
    response.status(resultDadosTipoVagas.status_code)
    response.json(resultDadosTipoVagas)    
})

app.get('/v1/estacionaMais/buscarTipoVeiculo/:id', cors(), async function(request, response){
    let idV = request.params.id

    let resultDadosTipoVagas = await controllerCategoriaVagas.getBuscarTipoVagaById(idV)

    console.log(resultDadosTipoVagas)
    response.status(resultDadosTipoVagas.status_code)
    response.json(resultDadosTipoVagas)
})
//Problema de endpoint não encontrado
app.post('/v1/estacionaMais/novoTipoVaga', cors(), bodyParserJSON, async function(request, response){

    const contentType = request.headers['content-type'];
    console.log(contentType);

    // Recebe todos os dados encaminhados na requisição pelo body        
    let dadosBody = request.body

    let resultDadosNovoTipoVaga = await controllerCategoriaVagas.setInserirTipoVaga(dadosBody, contentType);

    console.log(resultDadosNovoTipoVaga)
    response.status(resultDadosNovoTipoVaga.status_code)
    response.json(resultDadosNovoTipoVaga)


})
//Problema de endpoint não encontrado
app.delete('/v1/estacionaMais/excluirTipoVaga/:id', cors(), async function(request, response){

    let idV = request.params.id
    
    let resultDadosVagas = await controllerCategoriaVagas.setExcluirTipoVaga(idV)
    
    console.log(resultDadosVagas);
    response.status(resultDadosVagas.status_code)
    response.json(resultDadosVagas)
    
    
    })
//Ativação da porta 8080
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições!!!');
})