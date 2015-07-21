'use strict';
module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define('Products', {
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Products;
};