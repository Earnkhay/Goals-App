// const asyncHandler = require('express-async-handler')
import asyncHandler from "express-async-handler"
//get all goals. GET /api/goals
export const getGoals = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'Get goals'})
    // res.status(200).send('Get goals')
})
//Add a goal. POST /api/goals
export const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        // res.status(400).send('Please add text field')
        res.status(400)
        //using express error handler
        throw new Error('Please add a text field')
    }
    res.status(200).send('Set goals')
})
//update a goal. PUT /api/goals/:id
export const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).send(`update goal ${req.params.id}`)
})
//Delete a goal. DELETE /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).send(`Delete goal ${req.params.id}`)
})