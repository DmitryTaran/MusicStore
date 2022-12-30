const path = require("path");
const child_process = require("child_process");
const ApiError = require("../error/ApiError");
const fs = require("fs");




class AdminController {

    async dump(req, res, next){

        try{
            const credentials = {
                host: process.env.DB_HOST,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
                dbname: process.env.DB_NAME,
            }
            const cd = `cd C:\\Program Files\\PostgreSQL\\14\\bin`

            const date = new Date()

            const dumpId = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
            const fileName = `${credentials.dbname}${dumpId}.dump`

            const pathToDumps = path.resolve(__dirname, '..', 'dumps', fileName)

            const dumpCommand = `pg_dump -Fc -U ${credentials.username} ${credentials.dbname} > ${pathToDumps}`

            child_process.execSync(`${cd} & ${dumpCommand}`)


            return res.json(`Резервная копия создана успешно в файле ${fileName}`)

        } catch (e) {

           return next(ApiError.badRequest('При создании резервной копии произошла ошибка'))

        }


    }


     async getAllDumps(req, res, next){

        try {

            const pathToDumps = path.resolve(__dirname, '..', 'dumps')
            const files = fs.readdirSync(pathToDumps)

            return res.json(files)

        } catch (e){

            return next(ApiError.badRequest(e.message))

        }



    }

    async restore(req, res, next) {

        const credentials = {
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            dbname: process.env.DB_NAME,
        }

        try{
            const {fileName} = req.body
            const cd = `cd C:\\Program Files\\PostgreSQL\\14\\bin`
            const pathToDumps = path.resolve(__dirname, '..', 'dumps')
            const restoreCommand = `pg_restore -U ${credentials.username} -c -d ${credentials.dbname} ${pathToDumps + '\\' + fileName}`
            child_process.execSync(`${cd} & ${restoreCommand}`)

            return res.json('Все хорошо')

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }

    async undo(req, res, next) {

        try {



        } catch (e) {

            return next(ApiError.badRequest(e.message))

        }
    }

}



module.exports = new AdminController()