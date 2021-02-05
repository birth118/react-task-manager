
/* 
Thid file is created to serve Task.test suites as that need a user first in the DB
 */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userId = new mongoose.Types.ObjectId()

const user1 = {
    _id: userId,
    name: "Mike",
    email: 'mike@email.com',
    password: 'MyPass777',
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }
    ]
}

const user2Id = new mongoose.Types.ObjectId()

const user2 = {
    _id: user2Id,
    name: "Jessy",
    email: 'jessy@email.com',
    password: 'MyPass777',
    tokens: [{
        token: jwt.sign({ _id: user2Id }, process.env.JWT_SECRET)
    }
    ]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task1',
    completed: false,
    owner: user1._id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task2',
    completed: true,
    owner: user1._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task3',
    completed: true,
    owner: user2._id
}

const setupDatabase = async () => {
    //initializeCityDatabase();
    // console.log('beforeEach')
    await Task.deleteMany()
    await User.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()


}

// const setupUserDatabase = async () => {
//     //initializeCityDatabase();
//     // console.log('beforeEach')
//     //  await Task.deleteMany()
//     await User.deleteMany()
//     await new User(user1).save()
//     await new User(user2).save()
//     //  await new Task(task1).save()
//     //   await new Task(task2).save()
//     //   await new Task(task3).save()


// }

// const setupTaskDatabase = async () => {
//     //initializeCityDatabase();
//     // console.log('beforeEach')
//     await Task.deleteMany()
//     //    await User.deleteMany()
//     //    await new User(user1).save()
//     //    await new User(user2).save()
//     await new Task(task1).save()
//     await new Task(task2).save()
//     await new Task(task3).save()


// }

module.exports = { userId, user1, setupDatabase, user2, task3 }
//module.exports = { userId, user1, setupUserDatabase, setupTaskDatabase }

