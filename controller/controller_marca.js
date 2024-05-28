/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Marca
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const marcaDAO = require('../model/DAO/marca.js');

const getListarMarca = async function () {

    const marcaJSON = {}

    let dadosMarca = await marcaDAO.selectAllMarca()

    if (dadosMarca) {
        if (dadosMarca.length > 0) {
            marcaJSON.veiculo = dadosMarca
            marcaJSON.quantidade = dadosMarca.length
            marcaJSON.status_code = 200

            return marcaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getListarMarcaById = async function (id) {

    const marcaJSON = {}

    let dadosMarca = await marcaDAO.selectAllMarca(id)

    if (dadosMarca) {
        if (dadosMarca.length > 0) {
            marcaJSON.veiculo = dadosMarca
            marcaJSON.quantidade = dadosMarca.length
            marcaJSON.status_code = 200

            return marcaJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setInserirMarca = async function(dadosMarca, contentType){

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const marcaJSON = {}


            if (dadosMarca.marca == '' || dadosMarca.marca == null || dadosMarca.marca == undefined || dadosMarca.marca.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let marcaNova = await marcaDAO.insertMarca(dadosMarca)

                  console.log(marcaNova);
                    if(marcaNova){
                        marcaJSON.file = dadosMarca
                        marcaJSON.quantidade = dadosMarca.length
                        marcaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        marcaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        marcaJSON.message = message.SUCCESS_CREATED_ITEM

                        return marcaJSON
                        
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

const setExcluirMarca = async function(id){

    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosMarca = await marcaDAO.deleteMarca(idV)


            if (dadosMarca) {
                return message.SUCCESS_DELETED_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }



}

const setAtualizarMarca = async function(dadosMarca, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const marcaJSON = {}


            if (dadosMarca.marca == '' || dadosMarca.marca == null || dadosMarca.marca == undefined || dadosMarca.marca.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let marcaNova = await marcaDAO.updateMarca(dadosMarca)
                    console.log(marcaNova);
                    const idV = dadosVeiculo.id = id;

                    if(marcaNova & idV){
                        marcaJSON.file = dadosMarca
                        marcaJSON.quantidade = dadosMarca.length
                        marcaJSON.status = message.SUCCESS_CREATED_ITEM.status
                        marcaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        marcaJSON.message = message.SUCCESS_CREATED_ITEM

                        return marcaJSON
                        
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


module.exports = {

getListarMarca,
getListarMarcaById,
setInserirMarca,
setExcluirMarca,
setAtualizarMarca

}