const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const feedbackRouter = require('./feedbackRouter')
const manualRouter = require('./manualRouter')
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const deviceInfoRouter = require('./deviceInfoRouter')
const child_process = require('child_process')
const ApiError = require("../error/ApiError");
const fs = require("fs");
const path = require("path");


router.use('/device', deviceRouter)
router.use('/feedback', feedbackRouter)
router.use('/manual', manualRouter)
router.use('/order', orderRouter)
router.use('/user', userRouter)
router.use('/deviceInfo', deviceInfoRouter)


const dump = async (req, res, next) => {

    try{
        const credentials = {
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            dbname: process.env.DB_NAME,
        }
        const cd = `cd C:\\Program Files\\PostgreSQL\\14\\bin`

        const fileName = `${Date.now()}${credentials.dbname}.dump`

        const pathToDumps = path.resolve(__dirname, '..', 'dumps', fileName)

        const dumpCommand = `pg_dump -Fc -U ${credentials.username} ${credentials.dbname} > ${pathToDumps}`

        child_process.execSync(`${cd} & ${dumpCommand}`)


        return res.json('Резервная копия создана успешно')

    } catch (e) {

        next(ApiError.badRequest('При создании резервной копии произошла ошибка'))

    }


}

const restore = async (req, res, next) => {

    const credentials = {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dbname: process.env.DB_NAME,
    }

    try{
        const cd = `cd C:\\Program Files\\PostgreSQL\\14\\bin`
        const pathToDumps = path.resolve(__dirname, '..', 'dumps')
        const files = fs.readdirSync(pathToDumps);
        const lastDump = files[0]
        const restoringDbName = `forRestore${Date.now()}`
        const createDb = `createdb -U ${credentials.username} ${restoringDbName}`
        const restoreCommand = `pg_restore -U ${credentials.username} -d ${restoringDbName} ${pathToDumps + '\\' + lastDump}`
        child_process.execSync(`${cd} & ${createDb} & ${restoreCommand}`)

        return res.json('все хаващо')

    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }




}

router.get('/dumping', dump)
router.get('/restoring', restore)


module.exports = router