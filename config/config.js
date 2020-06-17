// Config Puerto Automatico o Local

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/service';

} else {
    process.env.URLDB = 'mongodb+srv://emguisande:bH1hsgKXNFKFiOTx@cluster0-ebxyq.gcp.mongodb.net/';
}