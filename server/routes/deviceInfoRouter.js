const Router = require('express')
const router = new Router()
const deviceInfoController = require('../controllers/deviceInfoController')

router.delete('/', deviceInfoController.delete)
router.get('/:deviceId', deviceInfoController.getAll)
router.get('/', deviceInfoController.getCategories)

module.exports = router