const {Router} = require('express');
const router = Router();

const mysqlConnection = require('../../database')

//Metodo para actualizar un proveedor  
router.put('/updateprovider', (req, res) =>{
    const {COD_PERSONA, COD_PROVEEDOR} = req.body;
    const query = ` CALL UPDATE_PROVEEDOR (?, ?); `;

    mysqlConnection.query(query, [COD_PERSONA, COD_PROVEEDOR], (err, rows, fields) => {
     if(!err){
        res.json({Status: 'Proveedor Actualizado'})
     }else{
        console.log(err);
    }
    });
});

//Metodo para insertar un nuevo proveedor 
router.post('/insertprovider', (req, res) =>{
    const {COD_PERSONA} = req.body;
    const query = ` CALL INSERT_PROVEEDOR (?);  `;

    mysqlConnection.query(query, [COD_PERSONA], (err, rows, fields) => {
     if(!err){
        res.json({Status: 'Proveedor Agregado'})
     }else{
        console.log(err);
    }
    });
});

//GET
//Metodo para seleccionar Proveedor por nombre
router.get("/lookprovider", (req, res) => {
    try {
     const { COD_PROVEEDOR } = req.body;
     const consulta = `CALL SELECT_PROVEEDOR('${COD_PROVEEDOR}')`;
     mysqlConnection.query(consulta, (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
             res.status(200).json(results[0]);
         } else {
             res.send(error)
         }
     })
    } catch (error) {
     res.send(error)
    }
 });

module.exports = router;