"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//importamos las rutas
const personaRoutes_1 = __importDefault(require("./routes/principal_routes/personaRoutes"));
const marcaRoutes_1 = __importDefault(require("./routes/principal_routes/marcaRoutes"));
const modeloRoutes_1 = __importDefault(require("./routes/principal_routes/modeloRoutes"));
const tucRoutes_1 = __importDefault(require("./routes/principal_routes/tucRoutes"));
const itinerarioRoutes_1 = __importDefault(require("./routes/principal_routes/itinerarioRoutes"));
const detalleRutaRoutres_1 = __importDefault(require("./routes/principal_routes/detalleRutaRoutres"));
const usuariosRoutes_1 = __importDefault(require("./routes/principal_routes/usuariosRoutes"));
const conductorRoutes_1 = __importDefault(require("./routes/principal_routes/conductorRoutes"));
const tipoServicioRoutes_1 = __importDefault(require("./routes/principal_routes/tipoServicioRoutes"));
const tipoInfraestructuraRoutes_1 = __importDefault(require("./routes/principal_routes/tipoInfraestructuraRoutes"));
const certificadoRoutes_1 = __importDefault(require("./routes/principal_routes/certificadoRoutes"));
const resolucionRoutes_1 = __importDefault(require("./routes/principal_routes/resolucionRoutes"));
const empresaServicioRoutes_1 = __importDefault(require("./routes/principal_routes/empresaServicioRoutes"));
const infraestructuraRoutes_1 = __importDefault(require("./routes/principal_routes/infraestructuraRoutes"));
const empresaRoutes_1 = __importDefault(require("./routes/principal_routes/empresaRoutes"));
const historialVehicularRoutes_1 = __importDefault(require("./routes/principal_routes/historialVehicularRoutes"));
const vehiculoRoutes_1 = __importDefault(require("./routes/principal_routes/vehiculoRoutes"));
const arrendamientoRutes_1 = __importDefault(require("./routes/principal_routes/arrendamientoRutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.ruotes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
        // Configura el límite de carga en 50MB (ajusta según tus necesidades)
        // this.app.use(bodyParser.json({ limit: '100mb' }));
        // this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes() {
        this.app.use('/', personaRoutes_1.default);
        this.app.use('/', marcaRoutes_1.default);
        this.app.use('/', modeloRoutes_1.default);
        this.app.use('/', arrendamientoRutes_1.default);
        this.app.use('/', tucRoutes_1.default);
        this.app.use('/', itinerarioRoutes_1.default);
        this.app.use('/', detalleRutaRoutres_1.default);
        this.app.use('/', usuariosRoutes_1.default);
        this.app.use('/', conductorRoutes_1.default);
        this.app.use('/', tipoServicioRoutes_1.default);
        this.app.use('/', tipoInfraestructuraRoutes_1.default);
        this.app.use('/', certificadoRoutes_1.default);
        this.app.use('/', resolucionRoutes_1.default);
        this.app.use('/', empresaServicioRoutes_1.default);
        this.app.use('/', infraestructuraRoutes_1.default);
        this.app.use('/', empresaRoutes_1.default);
        this.app.use('/', historialVehicularRoutes_1.default);
        this.app.use('/', vehiculoRoutes_1.default);
    }
    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening in port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.star();
