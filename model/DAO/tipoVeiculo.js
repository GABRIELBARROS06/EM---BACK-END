/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Tipo de Veículo
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllTipoVeiculo = async function () {


    let sql = `select * from tbl_tipo_veiculo`

    let rsVeiculo = await prisma.$queryRawUnsafe(sql)
    console.log(sql);

    if (rsVeiculo.length > 0) {

        return rsVeiculo
    } else {
        return false
    }


}

const selectByNomeVeiculo = async function(tipo_veiculo){
try{

let sql = `select * from tbl_tipo_veiculo where tbl_tipo_veiculo.tipo_veiculo LIKE "%${tipo_veiculo}%"`
console.log(sql);

let rsVeiculo = await prisma.$queryRawUnsafe(sql)
 
if(rsVeiculo.length > 0){
    return rsVeiculo
} else {
    return false
}
}catch(error){
     return false
}

}

const insertTipoVeiculo = async function(dadosVeiculo){

try{    
let sql = `insert into tbl_tipo_veiculo(tipo_veiculo) values (
                                                               '${dadosVeiculo.tipo_veiculo}'
                                                                                              )`;
console.log(sql)

let rsVeiculo = await prisma.$executeRawUnsafe(sql)

if(rsVeiculo){
   
    return rsVeiculo
} else{
    return false
}
} catch{
    return false
}


}

const updateTipoVeiculo = async function(dadosVeiculo){
    try {

        let sql;

        sql = `update tbl_tipo_veiculo
        set 
        tipo_veiculo = '${dadosVeiculo.tipo_veiculo}'
        where id = ${dadosVeiculo.id}`

        console.log(sql)
       
        let result = await prisma.$executeRawUnsafe(sql)
       
        return result

    } catch (error) {
        return false
    }
}

const deleteTipoVeiculo = async function(id){

try{

   

        let sql;

        sql = `delete from tbl_tipo_veiculo where id = ${id}`

        console.log(sql)

        let result = await prisma.$queryRawUnsafe(sql)

        return result

    } catch (error) {
        return false
    }

}

module.exports = {
    selectAllTipoVeiculo,
    selectByNomeVeiculo,
    insertTipoVeiculo,
    updateTipoVeiculo, 
    deleteTipoVeiculo
}