const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, default: 'Client'},
    phone: {type: DataTypes.STRING}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    delivery: {type: DataTypes.STRING},
    status:{type: DataTypes.STRING},
    total_cost:{type: DataTypes.INTEGER},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.DECIMAL, defaultValue: 0}
})

const Feedback = sequelize.define('feedback', {
    rate: {type: DataTypes.INTEGER, allowNull:false},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Manual = sequelize.define( 'manual', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
} )

const DeviceInfo = sequelize.define('deviceInfo', {
    description: {type: DataTypes.STRING, allowNull: false},
})

const DeviceInOrder = sequelize.define('deviceInOrder', {})

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Device.hasMany(Feedback)
Feedback.belongsTo(Device)

Order.belongsToMany(Device, {through: DeviceInOrder})
Device.belongsToMany(Order, {through: DeviceInOrder})

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

Manual.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Manual)

module.exports = {
    Device,
    Manual,
    DeviceInfo,
    User,
    Order,
    Feedback,
    DeviceInOrder
}