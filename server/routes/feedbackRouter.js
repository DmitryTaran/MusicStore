const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.get('/', feedbackController.getAll)
router.post('/', authMiddleware, feedbackController.create)
router.put('/', feedbackController.update)
router.delete('/', feedbackController.delete)

module.exports = router