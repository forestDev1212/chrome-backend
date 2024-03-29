import { Router } from 'express';
import quizTypeController from '../controllers/setting/quizTypeController.js'
const router = Router();
router.post('/', quizTypeController.create)
      .put('/', quizTypeController.update)
      .get('/', quizTypeController.list)
      .delete('/', quizTypeController.remove)
export default router