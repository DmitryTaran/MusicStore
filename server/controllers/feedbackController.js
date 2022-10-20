const {Feedback} = require("../models/models");
const ApiError = require("../error/ApiError");

class FeedbackController {

    async getAll (req, res, next) {

        try {

            const {deviceId} = req.body

            const feedback = await Feedback.findAll({where: {deviceId}})

            return res.json(feedback)

        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }


    }

    async create (req, res, next) {
        try {

            const {userId, title, description, rate, deviceId} = req.body

            const feedback = await Feedback.create({userId, title, description, rate, deviceId})

            return res.json(feedback)

        } catch (e){

            return next(ApiError.badRequest(e.message))

        }
    }

    async update (req, res, next) {

        try {

            const {feedbackId, ...updated} = req.body

            const feedback = await Feedback.update({...updated}, {where: {id: feedbackId}})

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