const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')//checks token

const UserController = require('../controllers/user')

router.get('/',UserController.userGetAll )

router.post('/signup', UserController.userSignUp)

router.post('/login', UserController.userLogIn)

router.get('/:userId', UserController.userGetOneById)

router.delete('/:userId', UserController.userDeleteOneById)

router.patch('/:userId', UserController.userPatchOneById)

router.patch('/:userId')

router.patch('/:userId')

module.exports = router