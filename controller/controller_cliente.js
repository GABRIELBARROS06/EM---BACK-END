/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Clientes
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
const message = require('../config.js')
const clienteDAO = require('../model/DAO/cliente.js')

const getAllClientes = async function(){
    const clientesJSON = {}

    let dadosClientes = await clienteDAO.selectALLClientes()

    if(dadosClientes){
        if(dadosClientes.length > 0){
            let enderecoClientes

            for (let index = 0; index < dadosClientes.length; index++) { 
                const element = dadosClientes[index]

                enderecoClientes = await clienteDAO.selectEnderecoClientes(element.id_endereco_cliente)
            }

            clientesJSON.clientes = dadosClientes
            clientesJSON.endereco = enderecoClientes
            clientesJSON.quantidade = dadosClientes.length
            clientesJSON.status_code = 200

            return clientesJSON
        }
        else{
            return message.ERROR_NOT_FOUND //404
        }
    }
    else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getByIdCliente = async function(id){

    let idCliente = id

    if(idCliente == '' || idCliente == undefined || isNaN(idCliente)){
        return message.ERROR_INVALID_ID //400
    }
    else{
    const clienteJSON = {}

    let dadosCliente = await clienteDAO.selectByIdCliente(id)

    if(dadosCliente){
        if(dadosCliente.length > 0){
            let enderecoCliente = await clienteDAO.selectEnderecoClientes(dadosCliente[0].id_endereco_cliente)

            clienteJSON.cliente = dadosCliente
            clienteJSON.endereco = enderecoCliente
            clienteJSON.status_code = 200

            return clienteJSON

        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}
}

const setInserirCliente = async function(dadosCliente, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            let novoClienteJSON = {}

            if(
                dadosCliente.nome  ==  ''            || dadosCliente.nome == null            || dadosCliente.nome == undefined            || dadosCliente.nome.length > 80            ||
                dadosCliente.data_nascimento  ==  '' || dadosCliente.data_nascimento == null || dadosCliente.data_nascimento == undefined || dadosCliente.data_nascimento.length > 10 ||
                dadosCliente.cpf  ==  ''             || dadosCliente.cpf == null             || dadosCliente.cpf == undefined             || dadosCliente.cpf.length > 14             ||
                dadosCliente.email  ==  ''           || dadosCliente.email == null           || dadosCliente.email == undefined           || dadosCliente.email.length > 100          ||
                dadosCliente.senha  ==  ''           || dadosCliente.senha == null           || dadosCliente.senha == undefined           || dadosCliente.senha.length > 20           ||
                dadosCliente.telefone  ==  ''        || dadosCliente.telefone == null        || dadosCliente.telefone == undefined        || dadosCliente.telefone.length > 15        ||
                dadosCliente.logradouro  ==  ''      || dadosCliente.logradouro == null      || dadosCliente.logradouro == undefined      || dadosCliente.logradouro.length > 100     ||
                dadosCliente.bairro  ==  ''          || dadosCliente.bairro == null          || dadosCliente.bairro == undefined          || dadosCliente.bairro.length > 50          ||
                dadosCliente.cidade  ==  ''          || dadosCliente.cidade == null          || dadosCliente.cidade == undefined          || dadosCliente.cidade.length > 100         ||
                dadosCliente.estado  ==  ''          || dadosCliente.estado == null          || dadosCliente.estado == undefined          || dadosCliente.estado.length > 40          ||
                dadosCliente.pais  ==  ''            || dadosCliente.pais == null            || dadosCliente.pais == undefined            || dadosCliente.pais.length > 40            

            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }
            else{
                let novoCliente = await clienteDAO.insertCliente(dadosCliente)
                
                let enderecoJSON = {}
                enderecoJSON.logradouro = dadosCliente.logradouro
                enderecoJSON.bairro = dadosCliente.bairro
                enderecoJSON.cidade = dadosCliente.cidade
                enderecoJSON.estado = dadosCliente.estado
                enderecoJSON.pais = dadosCliente.pais

                if(novoCliente){
                    novoClienteJSON.cliente = dadosCliente
                    novoClienteJSON.endereco = enderecoJSON
                    novoClienteJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code //200
                    novoClienteJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoClienteJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 na controller
    }
}

const setDeletarClientes = async function(id){
    let idClientes = id

    let validarID = getByIdCliente(idClientes)

    if(validarID){

    }else{
        
    }
}


module.exports = {
    getAllClientes,
    getByIdCliente,
    setInserirCliente
}