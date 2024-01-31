const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("potter", "root", "", {host: 'localhost', dialect: 'mysql'});

try{
    sequelize.authenticate();

}catch(error){
    console.log("error: ", error);

}

module.exports = {sequelize};
