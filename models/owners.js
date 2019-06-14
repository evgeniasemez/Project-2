module.exports = function(sequelize, DataTypes) {
  var owners = sequelize.define(
    "owners",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    { timestamps: false }
  );

  owners.associate = function(models) {
    owners.hasMany(models.dogs, {
      onDelete: "cascade"
    });
  };
  return owners;
};
