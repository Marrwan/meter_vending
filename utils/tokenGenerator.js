const { v4: uuidv4 } = require('uuid');

function generateToken() {
    return uuidv4();
}

function calculateUnit(amount) {
    return (parseFloat(amount) * 0.00444).toFixed(2);
}

module.exports = {
    generateToken,
    calculateUnit,
};

