module.exports = {
        dbConfig: {
            "username": process.env.DB_USERNAME || 'abdulbasitalabi',
            "password": process.env.DB_PASSWORD || '',
            "database": process.env.DB_NAME || 'meter_vending' ,
            "host": process.env.DB_HOST || "localhost",
            "dialect": "postgres"
        }
    }

