import Sequelize from 'sequelize'
import connection from '../../config/db_connection'
import Role from './UsersAccessControl/Role'

const User = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    biography: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
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

// relacionamento entre users e roles tabela users_roles
// User.belongsToMany(Role, {through: UserRole})
// Role.belongsToMany(User, {through: UserRole})

// // relacionamento entre users e permissions tabela users_permissions
// User.belongsToMany(Permission, {through: UserPermition})
// Permission.belongsToMany(User, {through: UserPermition})

// 1 usuário tem uma role 1 x 1 --> belongsTo()
User.belongsTo(Role, {foreignKey: 'roleId'}) // adds roleId to User
// 1 role está em vários usuários 1 x n --> hasMany()
Role.hasMany(User, {foreignKey: 'roleId'})


export default User