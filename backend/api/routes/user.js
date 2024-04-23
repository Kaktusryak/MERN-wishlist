const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')//checks token

const checkToken = require('../middleware/check-token')

const UserController = require('../controllers/user')

router.get('/',UserController.userGetAll )

router.post('/signup', UserController.userSignUp)

router.post('/login', UserController.userLogIn)

router.get('/:userId', UserController.userGetOneById)

router.delete('/:userId',checkAuth, UserController.userDeleteOneById)

router.patch('/:userId',checkAuth, UserController.userPatchOneById)

router.patch('/addFollows/:userId', checkAuth,UserController.userAddFollow)

router.patch('/removeFollows/:userId', checkAuth,UserController.userRemoveFollow)

router.post('/find',UserController.userFindByName)

router.get('/friends/:userId',UserController.userGetFriends)

// router.get('/isActual',checkToken)

module.exports = router