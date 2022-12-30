const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.get('/dumping', adminController.dump)
router.get('/dumps', adminController.getAllDumps)
router.post('/restoring', adminController.restore)
router.post('/undo', adminController.undo)

module.exports = router