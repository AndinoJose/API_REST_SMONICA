const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

/*controller.list = (req, res) => {
    res.send('Hola Mundo')
    }*/

//controlador para mostrar tabla producto 

// Mostrar Tabla Reportes
router.get('/showproduct', (req, res) =>{
    mysqlConnection.query('OBTENER_PRODUCTO()', (err, rows, fields)=>{
        if(!err){
           res.status(200).json(rows[0]);
           //res.json(rows);
        } else{
            console.log(err);
         }
      });
    });

module.exports = router;
