module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meterCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
};
