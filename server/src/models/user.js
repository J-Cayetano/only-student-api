'use strict';

// Import Packages
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");


// Environment Variable
dotenv.config();
var SALT = parseInt(process.env.SALT_ROUNDS);

// Protected Attributes
const PROTECTED_ATTR = ["user_password"];

// -----------------------------------------------

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(user, {
        as: "createdBy",
        foreignKey: "user_createdBy",
      });

      this.belongsTo(user, {
        as: "updatedBy",
        foreignKey: "user_updatedBy",
      });

      this.belongsTo(user, {
        as: "deletedBy",
        foreignKey: "user_deletedBy",
      });

    }

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }
  }

  user.init({
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_leve_id: {
      type: DataTypes.UUID,
      allowNull: true,

    },
    user_type_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    user_access: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['evaluator', 'student', 'tutor', 'admin']],
          msg: "Must be evaluator, student, tutor"
        },
        notEmpty: true
      }
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    user_isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    },
    user_firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name should not be null." },
        notEmpty: { msg: "First Name should not be empty." },
      }
    },
    user_middleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name should not be null." },
        notEmpty: { msg: "Last Name should not be empty." },
      }
    },
    user_fullName: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("user_fullName", this.user_firstName + " " + this.user_middleName + " " + this.user_lastName);
      }
    },
    user_contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [11, 11]
      }
    },
    user_bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_isGraduated: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_evaluateStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    },
    user_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    },
    user_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: "user_createdAt",
    updatedAt: "user_updatedAt",
    paranoid: true,
    deletedAt: "user_deletedAt",
    hooks: {
      beforeCreate: async (user) => {
        if (user.user_password) {
          const salt = await bcrypt.genSaltSync(SALT);
          user.user_password = bcrypt.hashSync(user.user_password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.user_password) {
          const salt = await bcrypt.genSaltSync(SALT);
          user.user_password = bcrypt.hashSync(user.user_password, salt);
        }
      }
    }
  });
  return user;
};