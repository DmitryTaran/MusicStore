const {DeviceInOrder, Order, Device} = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {

    async getAll(req, res, next) {

        try{

            const {userId} = req.query

            let orders

            if (userId){

                 orders = await Order.findAll({where: {userId}})

            } else {

                 orders = await Order.findAll()

            }


            return res.json(orders)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async getOne(req, res, next) {

        try {


        } catch (e) {

          return next(ApiError.badRequest(e.message))

        }

    }

    async getAllDevicesInOrder(req, res, next){

        try{
            const {orderId} = req.params

            const devices = await Device.findAll({
                include: {
                    model: DeviceInOrder,
                    where: {orderId}
                },

            })

            return res.json(devices)

        } catch (e){

          return next(ApiError.badRequest(e.message))

        }
    }

    async getCurrentOne(req, res, next) {

        try {

            const {userId} = req.params

            const order = await Order.findOne(
                {
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    where: {userId},
                }
            )



            return res.json(order)

        } catch (e) {

           return next(ApiError.badRequest(e.message))

        }

    }

    async create(req, res, next) {

        try {

            const {userId, orderId, delivery, status, totalCost} = req.body

            const date = new Date()

            const createdOrder = await Order.update(
                {delivery, status, totalCost, date},
                {where: {userId, id: orderId}}
                )

            const newOrder = await Order.create({userId})

            return res.json(newOrder)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
    }

    async addProduct(req, res, next) {

        try {

            const {deviceId, orderId} = req.body

            const deviceInOrder = await DeviceInOrder.create({
                orderId,
                deviceId
            })


            return res.json(deviceInOrder)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }
    }

    async deleteProduct(req, res, next) {

        try {

            const {deviceId, orderId} = req.body
            const deletedDevice = await DeviceInOrder.destroy({
                where: {deviceId, orderId}
            })

            return res.json(deletedDevice)

        } catch (e) {

           return next(ApiError.badRequest(e.message))

        }

    }

    async updateCount(req, res, next) {

        try{

            const {count, deviceId, orderId} = req.body

            const updatedDevice = DeviceInOrder.update(
                {count},
                {where: {deviceId, orderId}}
                )

            return res.json(count)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

}

module.exports = new OrderController()