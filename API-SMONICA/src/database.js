const mysql = require('mysql'); 
//Coneccion Base de Datos 
const mysqlConnection =  mysql.createConnection({
    host: '142.44.161.115',
    database: 'SMONICA',
    user: 'SMONICA',
    password:'Smonica#770a'  
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is coneccted');
    }
    })

module.exports = mysqlConnection;
