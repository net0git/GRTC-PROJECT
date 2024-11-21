"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg"); //importamos la libreria de postgres 
const key_1 = __importDefault(require("../database/key")); //importamos los registros de nuestra conexion
// Configura la conexión a la base de datos con los parametros establecidos en key
const dbConfig = key_1.default.databaseParameters;
const pool = new pg_1.Pool({
    user: 'neto',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'grtc_archivo'
});
pool.connect((error) => {
    if (error) {
        console.log('el error de conexion a la base de datos es: ' + error);
        return;
    }
    console.log('¡conexion con exito a la base de datos!');
});
exports.default = pool;
