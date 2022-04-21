import Sequelize from 'sequelize'
import connection from '../../config/db_connection'

const Vehicle = connection.define('vehicles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "available",
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    km: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    chassis: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sale_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    cost_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'updatedAt'
    }
})

export default Vehicle