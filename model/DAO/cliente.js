/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Clientes
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectALLClientes = async function () {
    try {
        let sql = 'select * from tbl_clientes'

        let rsClientes = await prisma.$queryRawUnsafe(sql)

        if (rsClientes) {
            return rsClientes
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectEnderecoClientes = async function (idEndereco) {
    try {
        let sql = `select * from tbl_endereco_cliente where id = ${idEndereco}`

        let rsEndereco = await prisma.$queryRawUnsafe(sql)

        if (rsEndereco) {
            return rsEndereco
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdCliente = async function (id) {
    try {
        let sql = `select * from tbl_clientes where id = ${id}`

        let rsCliente = await prisma.$queryRawUnsafe(sql)

        if (rsCliente) {
            return rsCliente
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const insertCliente = async function (dadosCliente) {
    try {
        let sqlEnderecoCliente =
            `
        insert into tbl_endereco_cliente
                                       (
                                        logradouro,
                                        bairro,
                                        cidade,
                                        estado,
                                        pais
                                       )
                                       values
                                       (
                                        '${dadosCliente.logradouro}',
                                        '${dadosCliente.bairro}',
                                        '${dadosCliente.cidade}',
                                        '${dadosCliente.estado}',
                                        '${dadosCliente.pais}'
                                       )
        `
        let rsEndereco = await prisma.$executeRawUnsafe(sqlEnderecoCliente)
        if (rsEndereco) {

            let sqlUltimoEndereco = 'select last_insert_id() from tbl_endereco_cliente limit 1'
            let rsUltimoEndereco = await prisma.$queryRawUnsafe(sqlUltimoEndereco)

            if (rsUltimoEndereco) {
               let idFormat = Number(rsUltimoEndereco[0]['last_insert_id()'])

                if (rsEndereco && rsUltimoEndereco) {
                    let sqlCliente =
                        `insert into tbl_clientes
                              (
                                nome,
                                data_nascimento,
                                cpf,
                                email,
                                senha,
                                telefone,
                                id_endereco_cliente
                              )
                              values
                              (
                                '${dadosCliente.nome}',
                                '${dadosCliente.data_nascimento}',
                                '${dadosCliente.cpf}',
                                '${dadosCliente.email}',
                                '${dadosCliente.senha}',
                                '${dadosCliente.telefone}',
                                 ${idFormat}
                              )
            `
                    let rsCliente = await prisma.$executeRawUnsafe(sqlCliente)

                    if (rsCliente) {
                        return rsCliente
                    } else {
                        return false
                    }
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteCliente = async function(id){
    try {
        let sql = `delete from tbl_clientes where id = ${id}`

        let rsCliente = await prisma.$queryRawUnsafe(sql)

        if(rsCliente){
            return rsCliente
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
module.exports = {
    selectALLClientes,
    selectEnderecoClientes,
    selectByIdCliente,
    insertCliente,
    deleteCliente
}