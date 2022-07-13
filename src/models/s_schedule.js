'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_schedule extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      // User -> created, updated, deleted
      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "sche_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "sche_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "sche_deletedBy",
      });

      // ---------------------------------

    }
  }


  s_schedule.init({
    sche_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    sche_class_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.t_class,
        key: "class_id"
      }
    },
    sche_startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sche_endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sche_day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    sche_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Rate should not be empty." }
      }
    },
    sche_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sche_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    sche_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    sche_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 's_schedule',
    timestamps: true,
    createdAt: "sche_createdAt",
    updatedAt: "sche_updatedAt",
    paranoid: true,
    deletedAt: "sche_deletedAt"
  });
  return s_schedule;
};