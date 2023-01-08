import asyncHandler from "express-async-handler"
// const Goal = require('../models/goalModel')
import Goal from '../models/goalModel.js'

//get all goals. GET /api/goals
export const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
    // res.status(200).send(goals)
})

//Add a goal. POST /api/goals
export const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        //using express error handler
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//update a goal. PUT /api/goals/:id
export const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})

//Delete a goal. DELETE /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    await Goal.remove()
    res.status(200).json({ id: req.params.id })
})