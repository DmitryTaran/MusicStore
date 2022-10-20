const {Device, DeviceInfo, Manual} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require("../error/ApiError");

class DeviceController {

    async getAll (req, res, next) {

        try{

            let {page, limit, condition} = req.query

            page = page || 1

            limit = limit || 8

            let offset = page * limit - limit

            let devices

            if(condition !== 'Все товары' && condition)
            {
                devices = await Device.findAndCountAll({include: {
                    model: DeviceInfo,
                    where: {
                        description: condition
                    },
                },
                    limit,
                    offset
            })
            }
            else devices = await Device.findAndCountAll({limit, offset})

            return res.json(devices)

        } catch (e){
            next(ApiError.badRequest(e.message))
        }


    }

    async getOne (req, res, next) {

        try {
            const {id} = req.params

            const device = await Device.findOne(
                {
                    where: {id},
                }
            )

            return res.json(device)

        }   catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async create (req, res, next) {

        try {
            let {name, price, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            const device = await Device.create({name, price, img: fileName})
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(info){
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        deviceId: device.id,
                        manualId: i.manualId,
                        description: i.description
                    })
                })
            }

            return res.json(device)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }
    }

    async update (req, res, next) {

        try {

            let {id, info,...data} = req.body

            const device = await Device.update({...data}, {where: {id}})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.update(
                        {description: i.description},
                        {where: {id: i.id}}
                    )
                })
            }

            return res.json(device)

        } catch (e){
            return next(ApiError.badRequest(e.message))
        }

    }

    async delete (req, res, next) {

        try{

            const {id} = req.body

            const device = await Device.destroy({where: {id}})

            return res.json(device)

        } catch(e){

            return next(ApiError.badRequest(e.message))
            
        }

    }
}

module.exports = new DeviceController()