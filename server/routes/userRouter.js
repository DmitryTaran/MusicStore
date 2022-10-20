const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', [
    check('email', 'Некорректный Email').notEmpty().isEmail(),
    check('password', 'Длина пароля должна быть минимум 5 символов').isLength({min: 5})
    ],
    userController.registration)

router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.check)

module.exports = router