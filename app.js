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
app.get('/v1/estacionaMais/tipoVeiculos', cors(), async function(request,response){

    let dadosVeiculo = await controllerTipoVeiculo.getListarTiposVeiculos()
    
    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
    
    
    })
    
    app.get('/v1/estacionaMais/tipoVeiculo', cors(), async function(request, response){
    
        let nomeVeiculo = request.query.tipo_veiculo
    
    let dadosVeiculo = await controllerTipoVeiculo.getBuscarNomeVeiculo(nomeVeiculo)
    
    response.status(dadosVeiculo.status_code)
    response.json(dadosVeiculo)
    
    })
    
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

//Ativação da porta 8080
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições!!!');
})