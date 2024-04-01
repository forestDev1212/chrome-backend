import { Router } from 'express';
import skinController from '../controllers/setting/skinController.js'
const router = Router();
router.post('/', skinController.create)
      .put('/', skinController.update)
      .get('/', skinController.list)
      .delete('/', skinController.remove)
      .get('/apply_new_skin', skinController.applyNewSkin)
export default router