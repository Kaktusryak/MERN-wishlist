const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')//checks token, now not included in process due to comfort

const WishesController = require('../controllers/wishes')

router.get('/', WishesController.wishesGetAll)

router.post('/',checkAuth,WishesController.wishesPostOne)



router.get('/:userId', WishesController.wishesOfUserByUserId)

router.delete('/:wishId',checkAuth, WishesController.wishesDeleteOneById)

router.patch('/:wishId',checkAuth, WishesController.wishesPatchOneById)

router.get('/:wishId', WishesController.wishesGetOneById)

module.exports = router