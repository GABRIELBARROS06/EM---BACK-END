/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Cores
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllCores = async function () {
    let sql = `select * from tbl_cores`

    let rsCores = await prisma.$queryRawUnsafe(sql)

    if (rsCores) {
        return rsCores
    } else {
        return false
    }
}


const selectByIdCor = async function (id) {
    try {
        let sql = `select * from tbl_cores where id = ${id}`

        let rsCores = await prisma.$queryRawUnsafe(sql)

        if (rsCores) {
            return rsCores
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const insertCor = async function(cor) {
    try {
        let sql = `insert into tbl_cores(cor) values (
                                                 '${cor.cor}'
                                                     )`


        let rsCor = await prisma.$executeRawUnsafe(sql)

        if (rsCor) {
            return rsCor
        } else {
            return false
        }
    } catch {
        return false
    }


}

const selectLastIdCor = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_cores limit 1'

        let rsCor = await prisma.$queryRawUnsafe(sql)

        if (rsCor) {
            return rsCor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const deleteCor = async function (id) {
    try {
        let sql;

        sql = `delete from tbl_cores where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

const updateCor = async function(cor) {
    try {

        let sql;

        sql = `update tbl_cores
        set 
        cor = '${cor.cor}'
        where id = ${cor.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllCores,
    selectByIdCor,
    insertCor,
    selectLastIdCor,
    deleteCor,
    updateCor
}