const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', deviceController.create)
router.put('/', deviceController.update)
router.delete('/', deviceController.delete)

module.exports = router