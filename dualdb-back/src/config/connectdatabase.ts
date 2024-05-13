import { MikroORM } from '@mikro-orm/postgresql';
import { UserAccount } from '../models/User.model';
import { Note } from '../models/Recipes.model';

async function databaseConnection() {
    const orm = await MikroORM.init({
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [UserAccount, Note],
        port: parseInt(process.env.DB_PORT),
        debug: true,
    });
    
    console.log("Connexion à la base de données réussie !");

    return orm;
}

export default databaseConnection;