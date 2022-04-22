import Sequelize from 'sequelize'
import connection from '../../../config/db_connection'
import Permission from './Permission'
import Role_Permission from './Role_Permission'

const Role = connection.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
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

Role.belongsToMany(Permission, {through: Role_Permission})
Permission.belongsToMany(Role, {through: Role_Permission})

export default Role