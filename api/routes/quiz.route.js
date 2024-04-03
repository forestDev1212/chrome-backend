import { Router } from 'express';
import quizController from '../controllers/setting/quizController.js'
const router = Router();
router.post('/', quizController.create)
      .put('/', quizController.update)
      .get('/', quizController.list)
      .delete('/', quizController.remove)
      .get('/listForQuizType', quizController.listForQuizType)
export default router