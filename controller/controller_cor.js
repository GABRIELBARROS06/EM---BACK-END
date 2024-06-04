/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Cores
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de Cores
 * Data: 21/05
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/ 
const message = require('../config.js');

const coresDAO = require('../model/DAO/cor.js')

const getListarCores = async function () {

    const coresJSON = {}

    let dadosCores = await coresDAO.selectAllCores()

    if (dadosCores) {
        if (dadosCores.length > 0) {
            coresJSON.veiculo = dadosCores
            coresJSON.quantidade = dadosCores.length
            coresJSON.status_code = 200

            return coresJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getBuscarCor = async function(id) {
    const corJSON = {}

    let dadosCor = await coresDAO.selectByIdCor(id)

    if (dadosCor) {
        if (dadosCor.length > 0) {
            corJSON.veiculo = dadosCor
            corJSON.quantidade = dadosCor.length
            corJSON.status_code = 200

            return corJSON
        }
        else {
            return message.ERROR_NOT_FOUND//404
        }
    }
    else {
        return message.ERROR_INTERNAL_SERVER_DB//500     
    }
}


const setInserirCor = async function (cor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //objeto JSON de Ator
            const corJSON = {}

            if (cor == '' || cor == null || cor == undefined || cor.length > 20) {
                return message.ERROR_REQUIRED_FIELDS //400
            }
            else {
                let novaCor = await coresDAO.insertCor(cor)     
                let idCor = await coresDAO.selectLastIdCor()

                if (novaCor) {
                    corJSON.id = Number(idCor[0].id)
                    corJSON.cor = cor.cor
                    corJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    corJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return corJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

const setExcluirCor = async function (id) {
    try {
        //id das classificações
        let idCor = id

        if (idCor == null || idCor == undefined || idCor == '' || isNaN(idCor)) {
            return message.ERROR_REQUIRED_FIELDS //400
        }
        else {
            let validarId = await coresDAO.selectByIdCor(idCor)

            if(validarId){
                let dadosCor = await coresDAO.deleteCor(idCor)

                if (dadosCor) {
                    return message.SUCCESS_DELETED_ITEM //200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

const setAtualizarCor = async function (cor, contentType, id) {
    //Validação do content-Type da requisição  
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //Cria o objeto JSON para devolver 
            let novaCorJSON = {}
            //Validação de campos obrigatórios ou com digitação inválida 
            if (cor.cor == '' || cor.cor == undefined || cor.cor == null || cor.cor.length > 20) {
                return message.ERROR_REQUIRED_FIELDS; //400
            }
            else {
                let validarId = await coresDAO.selectByIdCor(id)

                if(validarId.length > 0){
                    //Validação para verificar se podemos encaminhar os dados para o DAO
                    cor.id = id

                    //encaminha os dados da classificação para o DAo inserir no BD
                    let corAtualizada = await coresDAO.updateCor(cor)
                    //Validação para verificar se o DAO inseriu os dados do BD
                    if (corAtualizada) {
                        //Cria o JSON de retorno dos dados(201)
                        novaCorJSON.id = cor.id
                        novaCorJSON.cor = cor.cor
                        novaCorJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                        novaCorJSON.status_code =  message.SUCCESS_UPDATED_ITEM.status_code;
                        novaCorJSON.message = message.SUCCESS_UPDATED_ITEM.message;

                        return novaCorJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
                else{
                    return message.ERROR_INVALID_ID //400
                }
            }
        }

    }

    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }


}


module.exports = {
    getListarCores,
    getBuscarCor,
    setInserirCor,
    setExcluirCor,
    setAtualizarCor
}