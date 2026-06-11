var mysql=require('mysql2');
var pool= mysql.createPool({

    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"Bhumika@55",
    database:"flight",
    multipleStatements:true,

});
module.exports= pool;