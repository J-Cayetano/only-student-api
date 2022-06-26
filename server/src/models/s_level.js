'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_level extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

    }
  }


  s_level.init({
    leve_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    leve_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Level name should not be empty." }
      }
    },
    leve_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    leve_createdBy: {
      type: DataTypes.UUID
    },
    leve_updatedBy: {
      type: DataTypes.UUID
    },
    leve_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 's_level',
    timestamps: true,
    createdAt: "leve_createdAt",
    updatedAt: "leve_updatedAt",
    paranoid: true,
    deletedAt: "leve_deletedAt"
  });
  return s_level;
};