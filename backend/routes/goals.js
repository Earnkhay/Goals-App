import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goals.js'
const router = express.Router()

router.route('/').get(getGoals).post(setGoal)
// router.get('/', getGoals)
// router.post('/', setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

export default router