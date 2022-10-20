const {DeviceInfo, Manual} = require('../models/models')
const ApiError = require("../error/ApiError")
const {Sequelize} = require("sequelize");

class DeviceInfoController {

    async delete(req, res, next) {

        try{

            const {id} = req.body

            const deviceInfo = await DeviceInfo.destroy({where: {id}})

            res.json(deviceInfo)

        } catch (e) {
            next(ApiError.badRequest(e))
        }

    }

    async getAll(req, res, next) {

        try {

            const {deviceId} = req.params

            const deviceInfo = await DeviceInfo.findAll(
                {
                    include: {model: Manual},
                    where: {deviceId}
                }
            )

            return res.json(deviceInfo)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }

    async getCategories(req, res, next) {

        try {

            const category = await DeviceInfo.findAll(
                {
                    attributes: [[Sequelize.literal('DISTINCT description'), 'description'], 'manualId'],
                    where: {manualId: 1}
                }
            )
            res.json(category)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}



module.exports = new DeviceInfoController()