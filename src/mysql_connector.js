//iportar mysql
// import mysql from 'mysql';
import mysql from 'mysql2';

// crear la conexión a la base de datos
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'localuser_1',
//     password: '123456',
//     database: 'agenda_contactos',
// }).promise();

// const connect = () => {
//     connection.connect( err => {
//         if(err) throw err
//         console.log('conectado');
//     });
// }

// const agregarContacto = (numero, nombre, correo) => {
//     const sql = `INSERT INTO contactos (numero_contacto, nombre_contacto, correo_contacto) VALUES (${numero}, "${nombre}", "${correo}")`;
//     const contactos = connection.query(sql, (err, result, field) => {
//         if(err) throw err;
//         return result;
//     });
//     return contactos;
// }

// const obtenerContactos = () => {
//     const sql = `SELECT * FROM contactos`;
//     connection.query(sql, async (err, result,field) => {
//         return result;
//     });
// }

const pool = mysql.createPool({
    host: 'localhost',
    user: 'localuser_1',
    password: '123456',
    database: 'agenda_contactos',
}).promise();

const connect = async () => {
    await pool.connect( err => {
        if(err) throw err
        console.log('conectado');
    });
}

const agregarContacto = async (numero, nombre, correo) => {
    const sql = `INSERT INTO contactos (numero_contacto, nombre_contacto, correo_contacto) VALUES (${numero}, "${nombre}", "${correo}")`;
    try {
        await pool.query(sql)
    } catch(err) {
        throw err;
    }
}

const obtenerContactos = async () => {
    const [contactos] = await pool.query(`SELECT * FROM contactos`);
    return contactos;
}

const borrarContacto = async (id) => {
    const sql = `DELETE FROM contactos WHERE id_contacto=${id}`;
    try {
        await pool.query(sql);
    } catch(err) {
        throw err;
    }
}

const editarContacto = async (id,numero,nombre,correo) => {
    const sql = `UPDATE contactos SET numero_contacto=${numero}, nombre_contacto="${nombre}", correo_contacto="${correo}"
     WHERE id_contacto=${id}`;
    try {
        await pool.query(sql);
    } catch(err) {
        throw err;
    }
}

export { connect, agregarContacto, obtenerContactos, borrarContacto, editarContacto }