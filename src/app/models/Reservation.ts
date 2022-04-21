import Sequelize from 'sequelize'
import connection from '../../config/db_connection'
import User from './User'
import Vehicle from './Vehicle'

const Reservation = connection.define('reservations', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    reservationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'reservationDate',
        allowNull: false
    },
    vehicleStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reservationValue: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
}, {timestamps: false})

// 1 reserva é feita por uma usuário 1 x 1 --> belongsTo()
Reservation.belongsTo(User, {foreignKey: 'userId'}) // adds userId to Reservation
// 1 usuário realiza várias reservas 1 x n --> hasMany()
User.hasMany(Reservation, {foreignKey: 'userId'})

// 1 reserva contém 1 veículo 1 x 1 --> belongsTo()
Reservation.belongsTo(Vehicle, {foreignKey: 'vehicleId'}) // adds vehicleId to Reservation

export default Reservation