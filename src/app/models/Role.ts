import Sequelize from 'sequelize'
import connection from '../../config/db_connection'
import Permission from './Permission'
import Permission_Role from './Permission_Role'

const Role = connection.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'createdAt'
    }
}, {updatedAt: false})


// Role.belongsToMany(Permission, {
//     through: {
//         model: Permission_Role
//     },
//     foreignKey: 'roleId'
// })

// Permission.belongsToMany(Role, {
//     through: {
//         model: Permission_Role
//     },
//     foreignKey: 'permissionId'
// })

Role.belongsToMany(Permission, {through: Permission_Role})
Permission.belongsToMany(Role, {through: Permission_Role})


export default Role