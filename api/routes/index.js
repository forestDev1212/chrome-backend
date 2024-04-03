import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import userRoute from './user.route.js';
import categoryRoute from './category.route.js'
import leveRoute from './level.route.js'
import quizTypeRoute from './quiz_type.route.js'
import skinRoute from './skin.route.js'
import quizRoute from './quiz.route.js'

const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/user', userRoute);
router.use('/setting/level', leveRoute);
router.use('/setting/quiz-type', quizTypeRoute);
router.use('/setting/category', categoryRoute);
router.use('/setting/skin', skinRoute);
router.use('/setting/quiz', quizRoute);

export default router;