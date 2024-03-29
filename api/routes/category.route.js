import { Router } from 'express';
import categoryController from '../controllers/setting/categoryController.js'
const router = Router();
router.post('/', categoryController.create)
      .put('/', categoryController.update)
      .get('/', categoryController.list)
      .delete('/', categoryController.remove)
export default router