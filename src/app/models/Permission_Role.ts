import Sequelize from 'sequelize'
import connection from '../../config/db_connection'

import Role from "./Role"
import Permission from "./Permission"

const Permission_Role = connection.define('permissions_roles', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    roleId: {
        type: Sequelize.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    permissionId: {
        type: Sequelize.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    }
}, {timestamps: false})

export default Permission_Role