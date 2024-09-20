module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        returnCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        returnMessage: {
            type: DataTypes.STRING,
        },
    });

    return Transaction;
};
