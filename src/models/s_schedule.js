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

      this.belongsTo(models.t_class, {
        as: "classSchedule",
        foreignKey: {
          name: "sche_class_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }


  s_schedule.init({
    sche_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    sche_class_id: {
      type: DataTypes.UUID
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
      type: DataTypes.STRING,
      allowNull: true
    },
    sche_createdBy: {
      type: DataTypes.UUID
    },
    sche_updatedBy: {
      type: DataTypes.UUID
    },
    sche_deletedBy: {
      type: DataTypes.UUID
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