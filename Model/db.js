const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:`${__dirname}/base/nbo.sqlite`
});

sequelize.authenticate()
.then( function(){
    console.log("Base Ok")
})
.catch(function(err){
    console.log(`Error: ${err}`)
})
  
module.exports = sequelize;