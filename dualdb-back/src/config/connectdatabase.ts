import { MikroORM } from '@mikro-orm/postgresql';
import { Recipes } from '../models/Recipes.model';

async function databaseConnection() {
    const orm = await MikroORM.init({
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [Recipes],
        host: 'localhost',
        port: parseInt(process.env.DB_PORT),
        debug: true,
    });
    
    console.log("Connexion à la base de données réussie !");

    return orm;
}

export default databaseConnection;