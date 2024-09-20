const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const { dbConfig } = require('../config.js');
const { DataTypes } = require('sequelize');

// Initialize Sequelize with the dbConfig, including the dialect
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Transaction = require('./transaction')(sequelize, DataTypes);


db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

module.exports = db;
