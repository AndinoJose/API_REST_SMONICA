const express = require ('express');
const app = express();
const morgan = require('morgan');



//settigns 
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//exportando las rutas de los metodos de producto y proveedores desde la carpeta producto.route
app.use(require('./routes/Proveedores_Producto/producto.route'));
app.use(require('./routes/Proveedores_Producto/Proveedores.route'));


//Iniciando servidor 
app.listen(app.get('port'), ()=>{
console.log('Serve on port 3000')
});









    




  

