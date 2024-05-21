import express from 'express';
import { 
    scrapper, 
    read, 
    populate 
} from '../controllers/scrapper.controller';

const router = express.Router();

router.get('/', scrapper);
router.get('/read', read);
router.get('/populate', populate);

export default router;