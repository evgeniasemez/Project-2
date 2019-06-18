module.exports = function(sequelize, DataTypes) {
  var events = sequelize.define("events", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //TODO: log / lat?
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return events;
};
