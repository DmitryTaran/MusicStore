const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const feedbackRouter = require('./feedbackRouter')
const manualRouter = require('./manualRouter')
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const deviceInfoRouter = require('./deviceInfoRouter')

router.use('/device', deviceRouter)
router.use('/feedback', feedbackRouter)
router.use('/manual', manualRouter)
router.use('/order', orderRouter)
router.use('/user', userRouter)
router.use('/deviceInfo', deviceInfoRouter)
router.use('/admin', adminRouter)

module.exports = router