const ApiError = require('../error/ApiError')
const {User, Order} = require("../models/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}

    )
}

class UserController {

    async registration (req, res, next) {

        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации!', errors})
            }

            const {email, password, role} = req.body

            const candidate = await User.findOne({where: {email}})

            if(candidate) {
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }

            const salt = parseInt(process.env.HASH_SALT)

            const hashPassword = bcrypt.hashSync(password, salt)

            const user = await User.create({email, role, password: hashPassword})

            const order = await Order.create({userId: user.id})

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})

        } catch (e){

           return next(ApiError.badRequest(e.message))

        }

    }


    async login (req, res, next) {
        try {

            const {email, password} = req.body
            console.log(email)
            const user = await User.findOne({where: {email}})

            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким Email не найден'))
            }

            const comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword){
                return next(ApiError.badRequest('Неверный пароль'))
            }

            const token = generateJwt(user.id, user.email, user.role)

            return res.json({token})

        } catch (e){

           return next(ApiError.badRequest(e.message))

        }
    }

    async check (req, res, next) {

        try {

            const token = generateJwt(req.user.id, req.user.email, req.user.role)

            return res.json({token})

        } catch (e) {
            return next(ApiError.badRequest("ошибка тут"))
        }

    }
}

module.exports = new UserController()