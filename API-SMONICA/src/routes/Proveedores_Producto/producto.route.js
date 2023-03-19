const {Router} = require('express');
const router = Router();

const mysqlConnection = require('../../database')

router.get('/', (req, res)=>{
    res.send('Hola Mundo')
    });

//Metodo para mostrar los productos: 
    router.get('/Showproducts', (req, res) => {
        mysqlConnection.query('CALL SELECT_PRODUCTO', (err, rows) => {
            if(!err){
                res.status(200).json(rows[0]);
                //res.json(rows);
             } else{    
                 console.log(err);
              }
        });
    });

//Metodo para insertar un nuevo producto
router.post('/insertproduct', (req, res) =>{
    const {COD_PROVEEDOR, NOM_PRODUCTO, TIPO_PRODUCTO, DESC_PRODUCTO, UN_COMPRA, UN_VENTA} = req.body;
    const query = ` CALL INSERT_PRODUCTO (?, ?, ?, ?, ?, ?);  `;

    mysqlConnection.query(query, [COD_PROVEEDOR, NOM_PRODUCTO, TIPO_PRODUCTO, DESC_PRODUCTO, UN_COMPRA, UN_VENTA], (err, rows, fields) => {
     if(!err){
        res.json({Status: 'Producto Agregado'})
     }else{
        console.log(err);
    }
    });
});

//Metodo para actualizar un producto  
router.put('/updateproduct', (req, res) =>{
    const {COD_PRODUCTO, COD_PROVEEDOR, NOM_PRODUCTO, TIPO_PRODUCTO, DESC_PRODUCTO, UN_COMPRA, UN_VENTA} = req.body;
    const query = ` CALL UPDATE_PRODUCTO (?, ?, ?, ?, ?, ?, ?); `;

    mysqlConnection.query(query, [COD_PRODUCTO, COD_PROVEEDOR, NOM_PRODUCTO, TIPO_PRODUCTO, DESC_PRODUCTO, UN_COMPRA, UN_VENTA], (err, rows, fields) => {
     if(!err){
        res.json({Status: 'Producto Actualizado'})
     }else{
        console.log(err);
    }
    });
});

//Metodo para buscar un producto por el nombre
router.get('/lookproduct', (req, res)=>{
  try{
    const {NOM_PRODUCTO} = req.body;
         const consulta = `CALL OBTENER_PRODUCTO ('${NOM_PRODUCTO}')`;
             mysqlConnection.query(consulta, (error, results) => {
                if (error) throw error;
                if (results.length > 0 ){
                    res.status(200).json(results[0]);
                } else {
                    res.send(error)
                }
            })
            }catch (error){
                res.send(error)
      }

 });

 


module.exports = router;