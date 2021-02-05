const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')
const { inspect } = require('util')
const { report } = require('../src/app')
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants')
const inpect = require('util').inspect

const { userId, user1, setupDatabase } = require('./fixtures/db')

// Jest setup and tear down for repeating test (Jest LifeCycles)

beforeEach(setupDatabase, 10000)


// afterEach(() => {
//   //clearCityDatabase()
//   console.log('afterEach')
// })

test('Should sign up a user', async () => {
    const resp = await request(app) //Now returning http body to 'resp' variable 
        .post('/users')
        .send({
            name: 'Andy',
            email: 'andy@test.com',
            password: 'MyPass7777',
        })
        .expect(201)

    // To assert that the database changed
    const user = await User.findById(resp.body.user._id)
    expect(user).not.toBeNull()

    //To asser the resp(onse)
    // expect(resp.body.user.name).toBe('Andy')
    expect(resp.body).toMatchObject({
        user: {
            name: 'Andy',
            email: 'andy@test.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass7777')




})

test('Should login with existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)

    //  console.log(inpect(response.body))
    const user = await User.findById(response.body.user._id)

    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should NOT login with stranger', async () => {
    await request(app).post('/users/login').send({
        email: 'tell@email.com',
        password: 'MyPass777'
    }).expect(400)
})

test('Should get profile a user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should Not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should close account for authorized user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .expect(200)

    //    console.log(inspect(response.body))
    expect(await User.findById(response.body._id)).toBeNull()

})

test('Shoud NOT close account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile.jpg')

    const user = await User.findById(userId)

    expect(user.avatar).toEqual(expect.any(Buffer))  // ToBe() works like exact ===
    // ToEqaul() works in algorithm
    // expect.any(constuctor) matches anything that was created with the given constructor. 
    // If avatar is created with Buffer constructor
    // You can use it inside toEqual()


})

test('Should update valid user fieild', async () => {
    const resp = await request(app)
        .patch('/users/me')
        .set('authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            name: 'Tommy'
        }).expect(200)
    //   console.log(inspect(resp.body))

    const user = await User.findById(userId)
    expect(user.name).toEqual('Tommy')

})

test('Shoud Not update invalid user field', async () => {

    const resp = await request(app)
        .patch('/users/me')
        .set('authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            location: 'Sydney'
        }).expect(400)

})