const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/', orderController.getAll)
router.get('/:id', orderController.getOne)
router.post('/', orderController.create)
router.post('/add', orderController.addProduct)
router.delete('/delete/:id', orderController.deleteProduct)

module.exports = router