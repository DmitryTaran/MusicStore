const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/', orderController.getAll)
router.get('/current/:userId', orderController.getCurrentOne)
router.get('/:id', orderController.getOne)
router.get('/devices/:orderId', orderController.getAllDevicesInOrder)
router.put('/devices', orderController.updateCount)
router.post('/', orderController.create)
router.post('/add', orderController.addProduct)
router.delete('/delete', orderController.deleteProduct)


module.exports = router