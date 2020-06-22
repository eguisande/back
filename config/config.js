// Config Puerto Automatico o Local

process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;


// URL de Datos

if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/service';

} else {
    process.env.URLDB = process.env.MONGO_URI;
}

// Caducidad token

process.env.CADTOKEN = 60 * 60 * 24 * 30;

// Seed token

process.env.SEEDTOKEN = process.env.SEED || 'seed';