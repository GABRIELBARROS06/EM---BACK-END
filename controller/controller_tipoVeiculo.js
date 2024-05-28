/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Tipo de veículo
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../config.js');

const tipoVeiculoDAO = require('../model/DAO/tipoVeiculo.js');

const getListarTiposVeiculos = async function () {

    const veiculoJSON = {}

    let dadosVeiculo = await tipoVeiculoDAO.selectAllTipoVeiculo()

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

const getBuscarNomeVeiculo = async function (tipo_veiculo) {

    const veiculoJSON = {}

    let dadosVeiculo = await tipoVeiculoDAO.selectByNomeVeiculo(tipo_veiculo)

    if (dadosVeiculo) {
        if (dadosVeiculo.length > 0) {
            veiculoJSON.veiculo = dadosVeiculo
            veiculoJSON.quantidade = dadosVeiculo.length
            veiculoJSON.status_code = 200

            return veiculoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
    else {
        return message.ERROR_INTERNAL_SERVER  //500     
    }



}

const setInserirTipoVeiculo = async function (dadosVeiculo, contentType) {

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const veiculoJSON = {}


            if (dadosVeiculo.tipo_veiculo == '' || dadosVeiculo.tipo_veiculo == null || dadosVeiculo.tipo_veiculo == undefined || dadosVeiculo.tipo_veiculo.length > 20) {

                    return message.ERROR_REQUIRED_FIELDS //400

            } else{
                let validadeStatus = true

                if(validadeStatus){
                    let tipoVeiculoNovo = await tipoVeiculoDAO.insertTipoVeiculo(dadosVeiculo)

                  console.log(tipoVeiculoNovo);
                    if(tipoVeiculoNovo){
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

const setAtualizarVeiculo = async function(dadosVeiculo, contentType, id){
    
    //Validação do content-Type da requisição  
    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            //Cria o objeto JSON para devolver 
            let novoTipoVeiculoJSON = {}



            //Validação de campos obrigatórios ou com digitação inválida 
            if (dadosVeiculo.tipo_veiculo == '' || dadosVeiculo.tipo_veiculo == undefined || dadosVeiculo.tipo_veiculo == null || dadosVeiculo.tipo_veiculo.length > 20 
                
            ) {

                return message.ERROR_REQUIRED_FIELDS; //400

            }
            else {



                let validateStatus = true;


                //Validação para verificar se podemos encaminhar os dados para o DAO
                if (validateStatus) {
                    const idV = dadosVeiculo.id = id;
                    //encaminha os dados da classificação para o DAo inserir no BD
                    let tipoAtualizado = await tipoVeiculoDAO.updateTipoVeiculo(dadosVeiculo)

                    //Validação para verificar se o DAO inseriu os dados do BD
                    if (tipoAtualizado & idV) {
                        //Cria o JSON de retorno dos dados(201)
                        novoTipoVeiculoJSON.file = dadosVeiculo;
                        novoTipoVeiculoJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoTipoVeiculoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoTipoVeiculoJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoTipoVeiculoJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }

                }
                else {
                    return message.ERROR_NOT_FOUND //404
                }

            }
        }

    }

    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }


}

const setExcluirTipoVeiculo = async function(id){
    try {
        //id das classificações
        let idV = id


        if (idV == null || idV == undefined || idV == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosVeiculo = await tipoVeiculoDAO.deleteTipoVeiculo(idV)


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
    getListarTiposVeiculos,
    getBuscarNomeVeiculo,
    setInserirTipoVeiculo,
    setAtualizarVeiculo,
    setExcluirTipoVeiculo
}