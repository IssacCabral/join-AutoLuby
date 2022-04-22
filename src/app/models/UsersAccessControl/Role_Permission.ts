import Sequelize from 'sequelize'
import connection from '../../../config/db_connection'
import Permission from './Permission'
import Role from './Role'

const Role_Permission = connection.define('roles_permissions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Role,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    permissionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Permission,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

export default Role_Permission