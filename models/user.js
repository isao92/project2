module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    email: DataTypes.TEXT,
    field: DataTypes.STRING,
  });
  return Users;
};
