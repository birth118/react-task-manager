const express = require('express')
const router = new express.Router() // You can add middleware and HTTP method routes (such as get, put, post, and so on) to router just like an application.


const multer = require('multer')
const sharp = require('sharp')
const { body } = require('express-validator')


const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendByeEmail } = require('../emails/account')

const { NotFoundError404, BadRequest400 } = require('../errors')
const { requestValidate } = require('../middleware')



// @route    POST users
// @desc     Register user
// @access   Public  - no auth

router.post('/users',
    [
        body('name')
            .not()
            .isEmpty()
            .withMessage('name must be provided'),
        body('email')
            .isEmail()
            .withMessage('email must be provided'),
        body('password').
            isLength({ min: 7 })
            .withMessage('password must 7 length')
    ],
    requestValidate,
    async (req, res) => {        // Create a user. Same as above, but with async/awai



        if (await User.findOne({ email: req.body.email })) {
            throw new BadRequest400('User already exists')
        }

        const user = new User(req.body)
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        token = await user.generateAuthToken()
        res.status(201).send({ user, token })            // auth token goes to browser client

    })


//Error test

router.get('/users/error', function (req, res, next) {
    Promise.resolve().then(function () {
        throw new NotFoundError404('Error router')

        // throw new Error('BROKEN')
    }).catch(next) // Errors will be passed to Express.
})

// @route    POST users/login
// @desc     Login user
// @access   Public  - no auth

router.post('/users/login',
    [
        body('email')
            .isEmail()
            .withMessage('email must be provided'),
        body('password').
            isLength({ min: 7 })
            .withMessage('password must be provided')
    ],
    requestValidate,
    async (req, res, next) => {          // find credential by email and passwd
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()    //as a uer instance method

            res.send({ user, token })

        } catch (err) { next(err) }

    })

// @route    POST users/logout
// @desc     Logout the user from single login
// @access   Private  -  auth

router.post('/users/logout', auth, async (req, res) => {

    req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token)
    await req.user.save()
    res.send()

    //  res.status(500).send(e)                       // 500 Internal Server Error

})

// @route    POST users/logoutAll
// @desc     Logout the user from all login (pc, mobile, ...)
// @access   Public  - no auth

router.post('/users/logoutAll', auth, async (req, res, next) => {

    req.user.tokens = []
    await req.user.save()
    res.send()


})


// @route    GET users/me
// @desc     Get my profile
// @access   Private  - auth

router.get('/users/me', auth, async (req, res) => {
    // Retrieve my profile by sending my auth token from browser client.
    // auth: middleware callback function. midddle auth.next() runs, then async (req, res)=>{..} runs
    // async (req,res=>{..} :  router handler. this runs after auth functiin
    res.status(200).send(req.user)
})






// *Why doesn't my 404 error work ?*
// Hi Michael,
// It's just a fluke that Andrew did not get 500. The findById method will throw an error 
// if the id you pass it is improperly formatted so you should see a 500 error most of the time. 
// However, if you pass in an id that is validly formatted, but does not exist 
// in the database then you will get the 404 sent back



// *No need this as noone else will delete me but I will delete myself --> need diffrent router
// router.patch('/user/:id', async (req,res)=>{                   // Update a user by ID
//     const updates  = Object.keys(req.body)
//     const allowed = [ 'name','age', 'email', 'password']
//     const isValidOperation = updates.every((update)=>{      // req.body should include all fields to be updated.
//         return allowed.includes(update)
//     })

//     if(!isValidOperation){
//         return res.status(400).send({Error: 'Invalid updates!'})
//     }

//     try{
//         //const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})

//         const user = await User.findByIdAndUpdate(req.params.id)
//         if(!user){
//             return res.status(404).send()   // Not found
//         }

//         updates.forEach((update)=>{
//              user[update] = req.body[update]     // Wow!. user['name'] will return value of 'name' property in user object
//         })
//         await user.save()       
//         res.send(user)          // OK
//     }catch(e){
//         res.status(400).send(e)    // Validation failed such as validation error
//     }
// })

// @route    PATCH users/me
// @desc     Update a user profile: me
// @access   Private  -  auth

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'age', 'email', 'password']


    const isValidOperation = updates.every((update) => {      // req.body should include all fields to be updated.
        return allowed.includes(update)
    })

    if (!isValidOperation) {
        // return res.status(400).send({ Error: 'Invalid updates!' })
        throw new BadRequest400('Invalid updates!')
    }


    const user = req.user
    updates.forEach((update) => {
        user[update] = req.body[update]     // Wow!. user['name'] will return value of 'name' property in user object
    })
    await user.save()
    res.send(user)          // OK

})


// @route    DELETE users/me
// @desc      Delete a user: me
// @access   Private  -  auth

router.delete('/users/me', auth, async (req, res) => {

    await req.user.remove()
    res.send(req.user)
    sendByeEmail(req.user.email, req.user.name)


})



// @route    POST users/me/avatar
// @desc     upload my avatar
// @access   Private  -  auth


const upload = multer({
    //dest: 'images/',                     //To store in the OS filesystm /images
    storage: multer.memoryStorage(),       // To store in memory
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return cb(new BadRequest400('File must be an image'))
        }
        cb(null, true)
    }
})


router.post('/users/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    res.send()
})

router.post('/users/me/avatar', auth,
    upload.single('avatar'),
    async (req, res) => {

        // multer added the uploaded file to 'req.file.buffer' as  binary buffer data
        // over http form-data body
        req.user.avatar = req.file.buffer

        const buffer = await sharp(req.file.buffer).
            resize({ width: 250, height: 250 }).
            png().toBuffer()   // To resize  and reformat to png

        req.user.avatar = buffer

        await req.user.save()
        res.send()
    }, (error, req, res) => {
        // ** To handle the uncaught Error in Express
        //res.status(400).send({ error: error.message })
        throw new BadRequest400(error.message)
    })

// @route    DELETE users/me/avatar
// @desc     delete my avatar
// @access   Private  -  auth


router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    //The 'avatar' field will be wiped rather than being set by NULL    
    await req.user.save()
    res.send()

})

// @route    GET users/:id/avatar
// @desc     Get my avatar
// @access   Private  -  auth


router.get('/users/:id/avatar', async (req, res) => {


    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
        throw new NotFoundError404('Avatar not found')
    }
    res.set('Content-Type', 'image/png')             // To set REPSONSE header
    res.send(user.avatar)

})

module.exports = router