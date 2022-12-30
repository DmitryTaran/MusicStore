const {Manual} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db')

class ManualController {

    async getAll (req, res) {

        const manual = await Manual.findAll()

        return res.json(manual)

    }

    async create (req, res, next) {



        const {name} = req.body
        const exist = await Manual.findOne({where: {name}})

        if (exist){

            return next(ApiError.badRequest('Характеристика с таким названием уже существует!'))

        }

        const manual = await Manual.create({name})

        return res.json(manual)


    }

    async update (req, res, next) {


            const {id, name} = req.body

            const exist = await Manual.findOne({where: {id}})

            if(!exist)
            {
               return next(ApiError.notFound('Указан неверный id'))
            }

            const manual = await Manual.update({name}, {where: {id}}) // Возвращает true или false

            return res.json(manual)

    }

    async delete (req, res, next) {

        try {
            const {id} = req.body

            const exist = await Manual.findOne({where: {id}})

            if(!exist)
            {
                return next(ApiError.notFound('Указан неверный id'))
            }

            const manual = await Manual.destroy({where: {id}})

            return res.json(manual)
        }
        catch (e){
            return res.json(e.message)
        }
    }

    async undoManuals(req, res, next){
        try{
            await sequelize.query('CALL undo_database()',[])
            return res.json({message: 'Отмена действия прошла успешно'})
        } catch (e) {
            return res.json(e.message)
        }
    }
}



module.exports = new ManualController()