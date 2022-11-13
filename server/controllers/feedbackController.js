const {Feedback, User} = require("../models/models");
const ApiError = require("../error/ApiError");

class FeedbackController {

    async getAll (req, res, next) {

        try {

            const {deviceId} = req.params

            const feedback = await Feedback.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: {
                    model: User,
                    attributes: ['email', 'id']
                },
                where: {deviceId},

            })
            return res.json(feedback)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }


    }

    async create (req, res, next) {
        try {

            const {userId, title, description, rate, deviceId} = req.body

            const checkFeedback = await Feedback.findAll({
                where: {userId, deviceId}
            })

            if (checkFeedback.length !== 0)
                return res.status(400).json({message: 'Вы уже поделились мнением о данном устройстве'})

            const feedback = await Feedback.create({userId, title, description, rate, deviceId})


            return res.json(feedback)

        } catch (e){

            return next(ApiError.badRequest(e.message))

        }
    }

    async update (req, res, next) {

        try {

            const {deviceId, userId, ...updated} = req.body

            await Feedback.update({...updated}, {where: {deviceId, userId}})

            const feedback = await Feedback.findOne({where: {deviceId, userId}})

            return res.json(feedback)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }

    async delete (req, res, next) {

        try {

            const {feedbackId} = req.body

            const feedback = await Feedback.destroy({where: {id: feedbackId}})

            return res.json(feedback)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }

    }
}

module.exports = new FeedbackController()