/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Categoria de Vagas
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const vagaDAO = require('../model/DAO/categoriaVaga.js');

const getListarTipoVaga = async function () {

    const vagaJSON = {}

    let dadosVaga = await vagaDAO.selectAllTipoVaga()

    if (dadosVaga) {
        if (dadosVaga.length > 0) {
            vagaJSON.veiculo = dadosVaga
            vagaJSON.quantidade = dadosVaga.length
            vagaJSON.status_code = 200

            return vagaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarTipoVagaById = async function(id){
    const vagaJSON = {}

    let dadosVaga = await vagaDAO.selectTipoVagaById(id)

    if(dadosVaga){
       if(dadosVaga.length > 0){
           vagaJSON.veiculo = dadosVaga
           vagaJSON.quantidade = dadosVaga.length
           vagaJSON.status_code = 200

           return vagaJSON
       } else{
           return message.ERROR_INTERNAL_SERVER_DB //500
       }
    } else{
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }
}

const setInserirTipoVaga = async function(dadosVaga, contentType){
    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const vagaJSON = {}


            if (dadosVaga.categoria_vaga == '' || dadosVaga.categoria_vaga == null || dadosVaga.categoria_vaga == undefined || dadosVaga.categoria_vaga.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let vagaNova = await vagaDAO.insertTipoVaga(dadosMarca)

                  console.log(vagaNova);
                    if(vagaNova){
                        vagaJSON.file = dadosVaga
                        vagaJSON.quantidade = dadosVaga.length
                        vagaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        vagaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        vagaJSON.message = message.SUCCESS_CREATED_ITEM

                        return vagaJSON
                        
                    } else {
                       
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
           
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch {
         return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirTipoVaga = async function(id){

try{

    let idV = id

    if(idV == null || idV == undefined || idV == '') {
        return message.ERROR_REQUIRED_FIELDS //400
    } else {
        let dadosVaga = await vagaDAO.deleteTipoVaga(idV)


        if (dadosVaga) {
            return message.SUCCESS_DELETED_ITEM //201
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }



} catch(error){

    return message.ERROR_INTERNAL_SERVER_DB

}

}

module.exports = {
    getListarTipoVaga,
    getBuscarTipoVagaById,
    setInserirTipoVaga,
    setExcluirTipoVaga
}