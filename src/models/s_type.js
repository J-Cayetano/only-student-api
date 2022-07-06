'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_type extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "type_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "type_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "type_deletedBy",
      });
    }
  }


  s_type.init({
    type_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Type name should not be empty." }
      }
    },
    type_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type_createdBy: {
      type: DataTypes.UUID
    },
    type_updatedBy: {
      type: DataTypes.UUID
    },
    type_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 's_type',
    timestamps: true,
    createdAt: "type_createdAt",
    updatedAt: "type_updatedAt",
    paranoid: true,
    deletedAt: "type_deletedAt"
  });
  return s_type;
};