const Router = require('express')
const router = new Router()
const manualController = require('../controllers/manualController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.get('/', manualController.getAll)
router.post('/', checkRoleMiddleware('MODERATOR') ,manualController.create)
router.put('/', manualController.update)
router.delete('/', manualController.delete)

module.exports = router