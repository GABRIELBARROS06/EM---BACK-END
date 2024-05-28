/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de Marca
 * Data: 21/05
 * Versão: 1.0 
 *********************************************************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllMarca = async function () {

    let sql = `select * from tbl_marcas`
    console.log(sql)

    let result = await prisma.$queryRawUnsafe(sql)
    

    if (result) {
        return result
    } else {

        return false

    }



}

const selectMarcaById = async function (id) {

    let sql = `select * from tbl_marcas where id = ${id}`

    const rsMarca = await prisma.$queryRawUnsafe(sql)

    console.log(sql)

    if (rsMarca) {

        return rsMarca

    } else {
        return false
    }


}

const insertMarca = async function(dadosMarca){

let sql = `insert into tbl_marcas(marca) values
('${dadosMarca.marca}')`

console.log(sql);

let rsMarca = await prisma.$executeRawUnsafe(sql)

if(rsMarca){
    return rsMarca
} else{
    return false
}



}

const deleteMarca = async function(id){

let sql = `delete from tbl_marcas where id = ${id}`
console.log(sql);

let rsMarca = await prisma.$executeRawUnsafe(sql)



if(rsMarca){
    return rsMarca
} else{
    return false
}

}

const updateMarca = async function(dadosMarca){

let sql = `UPDATE tbl_marcas SET
valor = "${dadosMarca.marca}"
where id = ${dadosMarca.id}`

console.log(sql);


let rsMarca = await prisma.$executeRawUnsafe(sql)

if(rsMarca){
    return rsMarca
} else{
    return false
}

}

module.exports = {

 selectAllMarca,
 selectMarcaById,
 insertMarca,
 deleteMarca,
 updateMarca

}