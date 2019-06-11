module.exports = function(sequelize, DataTypes) {
  var dogs = sequelize.define("dogs", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  dogs.associate = function(models) {
    dogs.belongsTo(models.owners, {
      foreignKey: {
        allowNull: false
      }
    });
    dogs.hasOne(models.events, {});
  };
  return dogs;
};
