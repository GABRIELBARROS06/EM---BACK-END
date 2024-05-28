/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Veículo
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const veiculoDAO = require('../model/DAO/veiculo.js');

const getListarVeiculos = async function () {

    const veiculoJSON = {}

    let dadosVeiculo = await veiculoDAO.selectAllVeiculos()

    if (dadosVeiculo) {
        if (dadosVeiculo.length > 0) {
            veiculoJSON.veiculo = dadosVeiculo
            veiculoJSON.quantidade = dadosVeiculo.length
            veiculoJSON.status_code = 200

            return veiculoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarIdVeiculo = async function (id) {

    const veiculoJSON = {}

    let dadosVeiculo = await veiculoDAO.selectAllVeiculoById(id)

    if (dadosVeiculo) {
        if (dadosVeiculo.length > 0) {
            veiculoJSON.veiculo = dadosVeiculo
            veiculoJSON.quantidade = dadosVeiculo.length
            veiculoJSON.status_code = 200

            return veiculoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const setAtualizarVeiculo = async function(dadosVeiculo, contentType, id){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const veiculoJSON = {}


            if (dadosVeiculo.placa == '' || dadosVeiculo.placa == null || dadosVeiculo.placa == undefined || dadosVeiculo.placa.length > 20 || 
            dadosVeiculo.modelo == '' || dadosVeiculo.modelo == null || dadosVeiculo.modelo == undefined || dadosVeiculo.modelo.length > 50 ||
            dadosVeiculo.id_marca == '' || dadosVeiculo.id_marca == null || dadosVeiculo.id_marca == undefined || dadosVeiculo.id_marca.length > 5 ||
            dadosVeiculo.id_cor == '' || dadosVeiculo.id_cor == null || dadosVeiculo.id_cor == undefined || dadosVeiculo.id_cor.length > 5 ||
            dadosVeiculo.id_tipo_veiculo == '' || dadosVeiculo.id_tipo_veiculo == null || dadosVeiculo.id_tipo_veiculo == undefined || dadosVeiculo.id_tipo_veiculo.length > 5 
            ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let veiculoNovo = await veiculoDAO.updateVeiculo(dadosVeiculo)
                    console.log(veiculoNovo);
                    const idV = dadosVeiculo.id = id;

                    if(veiculoNovo & idV){
                        veiculoJSON.file = dadosVeiculo
                        veiculoJSON.quantidade = dadosVeiculo.length
                        veiculoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        veiculoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        veiculoJSON.message = message.SUCCESS_CREATED_ITEM

                        return veiculoJSON
                        
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

const setInserirVeiculo = async function(dadosVeiculo, contentType){

    try {


        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const veiculoJSON = {}


            if (dadosVeiculo.placa == '' || dadosVeiculo.placa == null || dadosVeiculo.placa == undefined || dadosVeiculo.placa.length > 20 || 
            dadosVeiculo.modelo == '' || dadosVeiculo.modelo == null || dadosVeiculo.modelo == undefined || dadosVeiculo.modelo.length > 50 ||
            dadosVeiculo.id_marca == '' || dadosVeiculo.id_marca == null || dadosVeiculo.id_marca == undefined || dadosVeiculo.id_marca.length > 5 ||
            dadosVeiculo.id_cor == '' || dadosVeiculo.id_cor == null || dadosVeiculo.id_cor == undefined || dadosVeiculo.id_cor.length > 5 ||
            dadosVeiculo.id_tipo_veiculo == '' || dadosVeiculo.id_tipo_veiculo == null || dadosVeiculo.id_tipo_veiculo == undefined || dadosVeiculo.id_tipo_veiculo.length > 5 
            ) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let veiculoNovo = await veiculoDAO.insertVeiculo(dadosVeiculo)
                    console.log(veiculoNovo);

                    if(veiculoNovo){
                        veiculoJSON.file = dadosVeiculo
                        veiculoJSON.quantidade = dadosVeiculo.length
                        veiculoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        veiculoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        veiculoJSON.message = message.SUCCESS_CREATED_ITEM

                        return veiculoJSON
                        
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

const setExcluirVeiculo = async function(id){

    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosVeiculo = await veiculoDAO.deleteVeiculo(idV)


            if (dadosVeiculo) {
                return message.SUCCESS_DELETED_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }


}

module.exports = {

getListarVeiculos,
getBuscarIdVeiculo,
setAtualizarVeiculo,
setInserirVeiculo,
setExcluirVeiculo

}