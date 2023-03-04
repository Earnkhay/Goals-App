import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goals.js'
import protect from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoal)
// router.get('/', getGoals)
// router.post('/', setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

export default router