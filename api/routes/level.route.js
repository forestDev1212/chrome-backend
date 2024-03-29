import { Router } from 'express';
import levelController from '../controllers/setting/levelController.js'
const router = Router();
router.post('/', levelController.create)
      .put('/', levelController.update)
      .get('/', levelController.list)
      .delete('/', levelController.remove)
export default router