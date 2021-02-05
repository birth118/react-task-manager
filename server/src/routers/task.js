const express = require('express')
const { body, validationResult } = require('express-validator')
const router = new express.Router()

const Task = require('../models/task')

const {
    auth,
    requestValidate
} = require('../middleware')

const {
    NotFoundError404
} = require('../errors')


// @route    POST tasks/
// @desc     Create task
// @access   Private  -  auth


router.post('/tasks', auth,
    [body('description')
        .not()
        .isEmpty()
        .withMessage('Description must be provided')],
    requestValidate,
    async (req, res) => {          // Creat a task. Same as above but using async/await 


        const task = new Task({
            ...req.body,
            owner: req.user._id
        })

        await task.save()
        res.status(201).send(task)


    })



// @route    GET tasks/
// @desc     Retrieve all tasks. Same as above but using async/await
// @access   Private  -  auth

router.get('/tasks', auth, async (req, res) => {


    // const tasks = await Task.find({owner:req.user._id})
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        console.log(sort)
    }

    await req.user.populate({
        path: 'tasks',              // 'path' property is treated a column named 'tasks' ref to Task model
        match: match,               // 'match' property is treated as condition 
        options: {                  //  'options' property mongoose built-in options   
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort: sort
        }
    }).execPopulate()

    const tasks = req.user.tasks

    if (tasks.length < 1) {
        // return res.status(404).send()    // 404 Not Found
        throw new NotFoundError404('Task not found')
    }
    res.send(tasks)

})


// @route    GET tasks/:id
// @desc     Retrieve a task. Same as above but using asyn/await
// @access   Private  -  auth

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    const task = await Task.findOne({ _id, owner: req.user._id })   //To use findOne() by task._id and task.owner

    if (!task) {
        // return res.status(404).send()    // 404 Not Found
        throw new NotFoundError404('Task not found')

    }
    res.send(task)

})

// @route    PATCH tasks/:id
// @desc     Update a task by ID
// @access   Private  -  auth

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowed = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowed.includes(update))
    if (!isValid) {
        return res.status(404).send({ Error: 'Invalid updates!' }) // 400 Bad Request such as unknown field update 
    }


    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
        // return res.status(404).send()    // 404 Not Found
        throw new NotFoundError404('Task not found')

    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)                            // OK

})

// @route    DELETE tasks/:id
// @desc     Delete a task by ID
// @access   Private  -  auth


router.delete('/tasks/:id', auth, async (req, res) => {

    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!task) {
        //return res.status(404).send()       //404 Not Found
        throw new NotFoundError404('No task to delete')
    }
    res.send(task)

})



module.exports = router