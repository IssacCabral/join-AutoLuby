import Sequelize from 'sequelize'
import connection from '../../config/db_connection'
import User from './User'
import Vehicle from './Vehicle'

const Sale = connection.define('sales', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }, 
      saleDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'saleDate',
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
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
}, {timestamps: false})

// 1 venda é feita por um usuário 1 x 1 --> belongsTo()
Sale.belongsTo(User, {foreignKey: 'userId'}) // adds userId to Sale
// 1 usuário realiza várias vendas 1 x n --> hasMany()
User.hasMany(Sale, {foreignKey: 'employeeId'})

// 1 venda contém 1 veículo 1 x 1 --> belongsTo()
Sale.belongsTo(Vehicle, {foreignKey: 'vehicleId'}) // adds vehicleId to Sale

export default Sale