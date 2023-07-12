import  express  from "express";    //importar express
import { connect, agregarContacto, obtenerContactos, borrarContacto, editarContacto } from "./src/mysql_connector.js";

const app = express();  //iniciar express

//iniciar servidor
const port = '8000';
app.listen(port, () => {
    console.log(`aplicación en el puerto ${port}`);
});

app.set('views', './view');
app.set('view engine', 'pug');

//configuración de archivos estáticos
app.use(express.static('./view'));
app.use(express.static('./src'));

app.get('/', async (req, res) => {
    // connect();
    const contactos = await obtenerContactos();
    res.render('index', {titulo: 'Agenda de contactos', contactos: contactos});
});

app.get('/agregar/:nombre/:numero/:correo', (req, res) => {
    let nombre = req.params.nombre;
    let numero = req.params.numero;
    let correo = req.params.correo;
    agregarContacto(numero, nombre, correo);
    res.redirect('/');
});

app.get('/borrar/:id', (req, res) => {
    const id = req.params.id;
    borrarContacto(id);
    res.redirect('/');
});

app.get('/editar/:id/:nombre/:numero/:correo', (req, res) => {
    const id = req.params.id;
    const numero = req.params.numero;
    const nombre = req.params.nombre;
    const correo = req.params.correo;
    editarContacto(id,numero, nombre, correo);
    res.redirect('/');
});


