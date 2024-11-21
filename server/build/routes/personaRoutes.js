"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = __importDefault(require("../controllers/personaController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas
        this.router.get('/api/persona', personaController_1.default.listarPersonas);
        this.router.get('/api/persona/:id', personaController_1.default.ObtenerPersona);
        this.router.post('/api/persona', personaController_1.default.CrearPersona);
        this.router.delete('/api/persona/:id', personaController_1.default.EliminarPersona);
        this.router.put('/api/persona/:id', personaController_1.default.ModificarPersona);
        this.router.get('/prueba', loginController_1.default.listarUsuarios);
    }
}
const personaRoutes = new PersonaRoutes;
exports.default = personaRoutes.router;
