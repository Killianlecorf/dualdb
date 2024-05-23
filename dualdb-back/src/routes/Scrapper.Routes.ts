import express from 'express';
import { 
    scrapper,
    populate,
    populatePostgres
} from '../controllers/scrapper.controller';

const router = express.Router();

router.get('/', scrapper);
router.get('/populate', populate);
router.get('/postgres/populate', populatePostgres);

export default router;