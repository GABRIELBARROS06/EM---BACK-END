/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Veículo
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllVeiculos = async function(){

let sql = `select * from tbl_veiculo`

console.log(sql)

const rsVeiculo = await prisma.$queryRawUnsafe(sql)

if(rsVeiculo){
    return rsVeiculo
} else{
    return false
}

}

const selectAllVeiculoById = async function(id){

let sql = `select * from tbl_veiculo where id = ${id}`

console.log(sql)

const rsVeiculo = await prisma.$queryRawUnsafe(sql)

if(rsVeiculo){
    return rsVeiculo
} else{
    return false
}

}

const insertVeiculo = async function(dadosVeiculo){

let sql = `insert into tbl_veiculo(placa, modelo, id_marca, id_cor, id_tipo_veiculo)values
('${dadosVeiculo.placa}',
    '${dadosVeiculo.modelo}',
    '${dadosVeiculo.id_marca}',
    '${dadosVeiculo.id_cor}',
    '${dadosVeiculo.id_tipo_veiculo}'
)`

console.log(sql)

const rsVeiculo = await prisma.$executeRawUnsafe(sql)

if(rsVeiculo){
    return rsVeiculo
} else{
    return false
}


}

const deleteVeiculo = async function(dadosVeiculo){

let sql = `delete from tbl_veiculo where id = ${dadosVeiculo.id}`

console.log(sql);

const rsVeiculo = await prisma.$executeRawUnsafe(sql)

if(rsVeiculo){
    return rsVeiculo
} else{
    return false
}


}

const updateVeiculo = async function(dadosVeiculo){

let sql = `UPDATE tbl_marcas SET
placa = "${dadosVeiculo.placa}",
modelo = "${dadosVeiculo.modelo}",
id_marca = "${dadosVeiculo.id_marca}",
id_cor = "${dadosVeiculo.id_cor}",
id_tipo_veiculo = "${dadosVeiculo.id_tipo_veiculo}"
where id = ${dadosVeiculo.id}`
 
const rsVeiculo = await prisma.$executeRawUnsafe(sql)

if(rsVeiculo){
    return rsVeiculo
} else{
    return false
}

}

module.exports = {

selectAllVeiculos,
selectAllVeiculoById,
insertVeiculo, 
deleteVeiculo,
updateVeiculo

}