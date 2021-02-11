# Connecting to database

npm i sequelize mysql2

npm i sequelize-cli -g

## create file .sequelizerc

## Fill that file with: 

const path = require('path')

module.exports = {
    'config': path.resolve('./database/config', 'config.js'),
    'models-path': path.resolve('./database/models'),
    'migrations-path': path.resolve('./database/migrations'),
    'seeders-path': path.resolve('./database/seeders')
}

# Run 

sequelize init

## add module.exports in the database/config/config.js file

