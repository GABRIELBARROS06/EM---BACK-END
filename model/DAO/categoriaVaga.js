/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Categoria de Vagas
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/
//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllTipoVaga = async function(){

let sql = `SELECT * from tbl_categoria_vagas`

console.log(sql);


const rsVaga = await prisma.$queryRawUnsafe(sql)

if(rsVaga){
    return rsVaga
} else{
    return false
}

}

const selectTipoVagaById = async function(id){

let sql = `SELECT * from tbl_categoria_vagas WHERE id = ${id}`

console.log(sql);

const rsVaga = await prisma.$queryRawUnsafe(sql)

if(rsVaga){
    return rsVaga
} else{
    return false
}

}

const insertTipoVaga = async function(dadosVaga){

let sql = `insert into tbl_categoria_vagas(categoria_vaga) values
('${dadosVaga.categoria_vaga}')`

console.log(sql);

const rsVaga = await prisma.$executeRawUnsafe(sql)

if(rsVaga){
    return rsVaga
} else{
    return false
}

}

const deleteTipoVaga = async function(id){
    let sql = `delete from tbl_categoria_vagas WHERE id = ${id}`

    console.log(sql);

    const rsVaga = await prisma.$executeRawUnsafe(sql)

    if(rsVaga){
        return rsVaga
    } else{
        return false
    }
    
}

const updateTipoVaga = async function(dadosVaga){
    let sql = `UPDATE tbl_categoria_vagas 
               SET categoria_vaga = '${dadosVaga.categoria_vaga}'
               WHERE id = ${dadosVaga.id}`

    console.log(sql);

    const rsVaga = await prisma.$executeRawUnsafe(sql)

    if(rsVaga){
        return rsVaga
    } else{
        return false
    }
               
}

module.exports = {
    selectAllTipoVaga,
    selectTipoVagaById,
    insertTipoVaga,
    deleteTipoVaga,
    updateTipoVaga
}