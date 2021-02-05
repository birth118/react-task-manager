const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')

const { userId, user1, setupDatabase, user2, task3 } = require('./fixtures/db')
const User = require('../src/models/user')

// Jest setup and tear down for repeating test (Jest LifeCycles)

beforeEach(setupDatabase, 10000)    // To force to run 10 secs.

// test('Is user1 there?', async () => {
//     const user = User.findById(userId)
//     console.log(user1)
// })

test('Should create a task for user', async () => {

    const resp = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'task1'
        }).expect(201)

    const task = await Task.findById(resp.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Get tasks for user1', async () => {
    const resp = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    const tasks = resp.body
    // console.log(tasks)
    expect(tasks.length).toEqual(2)
})

test('Delete invalidate for other user tasks', async () => {

    await request(app)
        .delete(`/tasks/${task3._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(task3._id)
    expect(task).not.toBeNull()

})