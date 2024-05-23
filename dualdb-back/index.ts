import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from './src/config/connectdatabase';
import RecipePostgresRoute from "./src/routes/Recipes.Routes";
import ScrapperRoute from "./src/routes/Scrapper.Routes";
import RecipeMongoRoute from "./src/routes/mongoDB/Recipes.Routes";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDatabaseMongo from './src/config/connectMongoDB';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


    
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['src/routes/mongodb/Recipes.Routes.ts', 'src/routes/User.Routes.ts'],
  };
  
  const swaggerDocs = swaggerJsdoc(options);


const initializeServer = async () => {

    const app = express();

    app.use(cookieParser());
    app.use(cors({
        origin: [
            'http://localhost:3000'
        ],
        credentials: true
    }));

    app.use(bodyParser.json())
    dotenv.config();
    
    const orm = await databaseConnection()
    connectDatabaseMongo()

    const port = process.env.PORT || 3000;
    
    app.use(express.json());
    
    app.use('/postgres/recipes', RecipePostgresRoute)
    app.use('/scrapper', ScrapperRoute)
    app.use('/mongodb/recipes', RecipeMongoRoute)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
    
    return orm 
}

const orm = initializeServer()

export { orm }